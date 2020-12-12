import { v4 } from '../../node_modules/uuid/dist/esm-browser/index.js';

/* --------------------------------- OnLoad --------------------------------- */

a_datePicker_set(new Date());

renderEntriesOfSelectedDate();

/* ------------------------------- Procedures ------------------------------- */

function a_datePicker_set(date) {
	const a_datePicker = document.querySelector('.a_datePicker');
	a_datePicker.value = formatDate(date);
}
function a_datePicker_get() {
	const a_datePicker = document.querySelector('.a_datePicker');
	return a_datePicker.value;
}

async function renderEntriesOfSelectedDate() {
	const m_entries = document.querySelector('.m_entries');

	let selectedDate_startOfDay = Date.parse(a_datePicker_get() + "T00:00");
	let selectedDate_startOfNextDay = 
		startOfNextDay(new Date(selectedDate_startOfDay));

	let entryTemplateNode = await fetchEntryTemplateNode();
	await setEntriesFromDb(m_entries, entryTemplateNode);
	await m_entries.appendChild(new_entry_withPresentTime(v4(), entryTemplateNode));
}

async function fetchEntryTemplateNode() {
	// Fetching entry template view from server
	let res = await fetch('https://creatorise.com/avalli/public/src/views.php?getView=entry');
	let entry_outerHtml = await res.text();
	let entryTemplateNode = createNodeFromOuterHtml(entry_outerHtml);
	return entryTemplateNode
}

async function setEntriesFromDb(m_entries, entryTemplateNode) {
	let res = await fetch('https://creatorise.com/avalli/public/src/entries.php?getEntries=true');
	let entries_data = await res.json();
    console.log('setEntriesFromDb ~ entries_data', ...entries_data);
	entries_data.forEach((entryObj) => {
		console.log('entry: ', entryObj);
		m_entries.appendChild(new_entry_withData(entryObj, entryTemplateNode));
	});
}

/* --------------------------------- Events --------------------------------- */

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
	}
}

function a_entry_onchange(e, id) {
	let a_entry_data = new FormData(e.target.parentElement);
	let datetime = Date.parse(
		a_datePicker_get() + 'T' + a_entry_data.get('time')
	);
	a_entry_data.append('datetime', datetime);
	a_entry_data.delete('time');
	a_entry_data.append('id', id);
	
	fetch('https://creatorise.com/avalli/public/src/entries.php?update=true', 
		{
			method: 'POST',
			body: a_entry_data
		})
		.then((req) => req.text())
		.then((res) => console.log('res:', res)
	);
}

/* ----------------------------- Pure functions ----------------------------- */

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
	newEntry.addEventListener('change', (e) => a_entry_onchange(e, id));
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