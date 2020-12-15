import { v4 } from '../../node_modules/uuid/dist/esm-browser/index.js';

/* --------------------------------- OnLoad --------------------------------- */

a_datePicker_set(new Date());
a_datePicker_addEventListener();

renderEntriesOfSelectedDate();

addEventListenersToMenu();

/* ------------------------------- Procedures ------------------------------- */

function a_datePicker_set(date) {
	const a_datePicker = document.querySelector('.a_datePicker--picker');
	a_datePicker.value = formatDate(date);
}
function a_datePicker_get() {
	const a_datePicker = document.querySelector('.a_datePicker--picker');
	return a_datePicker.value;
}
function a_datePicker_addEventListener() {
	const a_datePicker = document.querySelector('.a_datePicker');
	a_datePicker.addEventListener('change', renderEntriesOfSelectedDate);
}
function addEventListenersToMenu() {
	document.querySelector('.a_datePicker--shifter._-1').addEventListener('click', () => selectedDate_shift(-1));
	document.querySelector('.a_datePicker--shifter._1').addEventListener('click', () => selectedDate_shift(+1));
	document.querySelector('.m_menu--export').addEventListener('click', export_clipboard);
}

async function renderEntriesOfSelectedDate() {
	const m_entries = document.querySelector('.m_entries');
	m_entries.innerHTML = "";

	let selectedDate_startOfDay = new Date(Date.parse(a_datePicker_get() + "T00:00"));
	let selectedDate_startOfNextDay = 
		startOfNextDay(new Date(selectedDate_startOfDay));

	let entryTemplateNode = await fetchEntryTemplateNode();
	await setEntriesFromDb(m_entries, entryTemplateNode, selectedDate_startOfDay, selectedDate_startOfNextDay);
	await m_entries.appendChild(new_entry_withPresentTime(v4(), entryTemplateNode));
}

async function fetchEntryTemplateNode() {
	// Fetching entry template view from server
	let res = await fetch('public/src/views.php?getView=entry');
	let entry_outerHtml = await res.text();
	let entryTemplateNode = createNodeFromOuterHtml(entry_outerHtml);
	return entryTemplateNode
}

async function setEntriesFromDb(m_entries, entryTemplateNode, selectedDate_startOfDay, selectedDate_startOfNextDay) {
	let res = await fetch('public/src/entries.php?getEntries=true&start-datetime=' + selectedDate_startOfDay.getTime() + '&end-datetime=' + selectedDate_startOfNextDay.getTime());
	let entries_data = await res.json();
	entries_data.forEach((entryObj) => {
		m_entries.appendChild(new_entry_withData(entryObj, entryTemplateNode));
	});
}

function entriesDatabase_putOrUpdate(id, a_entry_rawFormData) {
	let a_entry_data = a_entry_rawFormData;
	let datetime = Date.parse(
		a_datePicker_get() + 'T' + a_entry_data.get('time')
	);
	a_entry_data.append('datetime', datetime);
	a_entry_data.delete('time');
	a_entry_data.append('id', id);
	
	fetch('public/src/entries.php?putorupdate=true', 
		{
			method: 'POST',
			body: a_entry_data
		}
	);
}

function entriesDatabase_delete(id) {
	fetch('public/src/entries.php?delete=' + id);
}


/* --------------------------------- Events --------------------------------- */

function selectedDate_shift(factor) {
	let datetime = Date.parse(a_datePicker_get() + "T00:00");
	let newDate = new Date();
	newDate.setTime(datetime);
	newDate.setDate(newDate.getDate() + factor);
	a_datePicker_set(newDate);
	renderEntriesOfSelectedDate();
}

function a_entry_enterKeyup(e, entryTemplate) {
	if (e.keyCode === 13) {
		const newEntry = new_entry(v4(), entryTemplate);
		
		e.target.parentElement.after(newEntry);
		newEntry.firstElementChild.select();
		
		// If newEntry is the last one of the entries
		if (newEntry.nextElementSibling !== null) {
			// Set time to same as target entry
			newEntry.time.value = e.target.parentElement.time.value;
		}
		else {
			// Set time to present
			newEntry.time.value = formatTime(new Date());
		}
		// Remove node
		if (!e.target.parentNode.food.value) {
			e.target.parentNode.parentNode.removeChild(e.target.parentNode)
		}
	}
}

function a_entry_update(e, id) {
	let a_entry_rawFormData = new FormData(e.target.parentElement);
	
	if (a_entry_rawFormData.get('food')) {
		// If entry has food, put or update database
		entriesDatabase_putOrUpdate(id, a_entry_rawFormData);
	}
	else if (e.target.attributes.name.value) {
		// If entry's food is empty
		entriesDatabase_delete(id);
		// Remove node
		e.target.parentElement.parentElement.removeChild(e.target.parentElement)
	}
}

// Export as formatted string to clipboard
async function export_clipboard() {
	let selectedDate_startOfDay = new Date(Date.parse(a_datePicker_get() + "T00:00"));
	let selectedDate_startOfNextDay = 
		startOfNextDay(new Date(selectedDate_startOfDay));

	let res = await fetch('public/src/entries.php?getEntries=true&start-datetime=' + selectedDate_startOfDay.getTime() + '&end-datetime=' + selectedDate_startOfNextDay.getTime());
	let entries_data = await res.json();
	let formattedString = entries_data_ofDay_toFormattedString(entries_data);
    console.log('export_clipboard ~ formattedString', formattedString);
	navigator.clipboard.writeText(formattedString);
}

/* ----------------------------- Pure functions ----------------------------- */

function entries_data_ofDay_toFormattedString(entries_data) {
		let formattedString = '';
	entries_data.forEach((entry) => {
		let date = new Date();
		date.setTime(entry.datetime);
		let formattedTime = formatTime(date);
		formattedString += '\n' + formattedTime + ' - ' + entry.food + '\n';
	})
	return formattedString;
}

function new_entry_withData(entryObj, entryTemplate) {
	let newEntry = new_entry(entryObj.id, entryTemplate);
	newEntry.food.value = entryObj.food;
	let date = new Date();
	date.setTime(entryObj.datetime);
	newEntry.time.value = formatTime(date);
	return newEntry;
}

function new_entry_withPresentTime(id, entryTemplate) {
	let newEntry = new_entry(id, entryTemplate);
	newEntry.time.value = formatTime(new Date());
	return newEntry;
}

function new_entry(id, entryTemplate) {
	let newEntry = entryTemplate.cloneNode(true);
	newEntry = addingEntryEventListeners(newEntry, id, entryTemplate);
	return newEntry;
}

function addingEntryEventListeners(newEntry, id, entryTemplate) {
	newEntry.addEventListener('submit', preventDefault);
	//newEntry.addEventListener('focusout', (e) => a_entry_update(e, id));
	newEntry.addEventListener('change', (e) => a_entry_update(e, id));
	for (let child of newEntry.children) {
		child.addEventListener(
			'keyup',
			(e) => a_entry_enterKeyup(e, entryTemplate)
		);
	}
	return newEntry;
}

function preventDefault(e) {
	e.preventDefault();
}

function createNodeFromOuterHtml(html) {
	const temp = document.createElement('template');
	html = html.trim();
	temp.innerHTML = html;
	return temp.content.firstChild;
}

/* --------------------- Pure date formatting functions --------------------- */

function formatTime(date) {
	let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
	let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	//let second = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

	return hour + ':' + minute; // + ":" + second;
}

function formatDate(date) {
	return (
		date.getFullYear() +
		'-' +
		(date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) +
		'-' +
		(date.getDate() < 10 ? '0' : '') + date.getDate()
	);
}

function startOfNextDay(date) {
	let date_nextDay = date;
	date_nextDay.setDate(date_nextDay.getDate() + 1);
	let date_startOfNextDay = dateOfBeginningOfDay(date_nextDay);
	return date_startOfNextDay;
}

/* not in use */
function datetime_range_get(datetime) {
	let {date_range_start, date_range_end} = 
		date_range_get(new Date(datetime));
	let datetime_range_start = date_range_start.getTime();
	let datetime_range_end = date_range_end.getTime();
	return {datetime_range_start, datetime_range_end};
}
function date_range_get(date) {
	let date_range_start = dateOfBeginningOfDay(date);
	let date_nextDay = new Date(date);
	date_nextDay.setDate(date_nextDay.getDate() + 1);
	let date_range_end = dateOfBeginningOfDay(date_nextDay);
	return {date_range_start, date_range_end};
}
function dateOfBeginningOfDay(date) {
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
}