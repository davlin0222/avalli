/* --------------------------------- OnLoad --------------------------------- */

// State object containing semantics of an empty entry
let entryTemplate;
// Setting the entry template to semantics recieved from server
entryTemplate_set().then(() => {
	m_entries.appendChild(new_entry_withCurrentTime(entryTemplate));
});

// HTML node in which all entries are put
const m_entries = document.querySelector(
	'.m_entries'
);


/* ------------------------------- Procedures ------------------------------- */

async function entryTemplate_set() {
	entryTemplate = await getNodeFromFetchedView('entry');
}

function new_entry_withCurrentTime(entryTemplate) {
	let newEntry = new_entry(entryTemplate);
	newEntry.time.value = formatTime(new Date());
	return newEntry;
}

/* --------------------------------- Events --------------------------------- */

function a_entry_enterKeyup(e, entryTemplate) {
	if (e.keyCode === 13) {
		let targetTime = e.target.parentElement.time.value;
		const newEntry = new_entry_withSetTime(entryTemplate, targetTime);
		e.target.parentElement.after(newEntry);
		newEntry.firstElementChild.select();
	}
}

/* ----------------------------- Pure functions ----------------------------- */

// Fetching selected view from templates on server
async function getNodeFromFetchedView(templateName) {
	let req = await fetch(
		'https://creatorise.com/avalli/public/src/templating.php?getView='
		 + templateName
	);
	let innerHtml = await req.text();

	// Set node from text respons
	const temp = document.createElement('template');
	innerHtml = innerHtml.trim();
	temp.innerHTML = innerHtml;
	return temp.content.firstChild;
}

function new_entry_withSetTime(entryTemplate, formattedTime) {
	let newEntry = new_entry(entryTemplate);
	newEntry.time.value = formattedTime;
	return newEntry;
}

function new_entry(entryTemplate) {
	let newEntry = entryTemplate.cloneNode(true);
	newEntry = addingEntryEventListeners(newEntry, entryTemplate);
	return newEntry;
}

function addingEntryEventListeners(
	newEntry,
	entryTemplate
) {
	newEntry.addEventListener('submit', preventDefault);
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

/* Date formatting functions */

function formatTime(date) {
	let hour =
		(date.getHours() < 10 ? '0' : '') +
		date.getHours();
	let minute =
		(date.getMinutes() < 10 ? '0' : '') +
		date.getMinutes();
	//let second = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

	return hour + ':' + minute; // + ":" + second;
}

function formatDate(date) {
	return (
		date.getFullYear() +
		'-' +
		(date.getMonth() + 1 < 10 ? '0' : '') +
		(date.getMonth() + 1) +
		'-' +
		(date.getDate() < 10 ? '0' : '') +
		date.getDate()
	);
}