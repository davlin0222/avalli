import { v4 } from '../../node_modules/uuid/dist/esm-browser/index.js';

/* --------------------------------- OnLoad --------------------------------- */

// HTML node in which all entries are put
const m_entries = document.querySelector('.m_entries');

// HTML node of current date
const a_date = document.querySelector('.a_date');
a_date.value = formatDate(new Date());


// State object containing semantics of an empty entry
let entryTemplate;

// Setting the entry template to semantics recieved from server
entryTemplate_set().then(() => {
	m_entries.appendChild(new_entry_withCurrentTime(v4(), entryTemplate));
});

/* ------------------------------- Procedures ------------------------------- */

async function entryTemplate_set() {
	// Fetching entry template view from server
	let req = await fetch(
		'https://creatorise.com/avalli/public/src/views.php?getView=entry'
		);
	let entryHtml = await req.text();

	entryTemplate = createNodeFromString(entryHtml);
}

function new_entry_withCurrentTime(id, entryTemplate) {
	let newEntry = new_entry(id, entryTemplate);
	newEntry.time.value = formatTime(new Date());
	return newEntry;
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
		a_date.value + 'T' + a_entry_data.get('time')
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

function createNodeFromString(html) {
	const temp = document.createElement('template');
	html = html.trim();
	temp.innerHTML = html;
	return temp.content.firstChild;
}

/* Date formatting functions */

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