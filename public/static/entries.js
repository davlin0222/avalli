/* --------------------------------- OnLoad --------------------------------- */

// State object containing semantics of an empty entry
let entryTemplate;
// Setting the entry template to semantics recieved from server
entryTemplate_set().then(() => {
	m_entries.appendChild(new_entry(entryTemplate));
});

// HTML node in which all entries are put
const m_entries = document.querySelector(
	'.m_entries'
);


/* ------------------------------- Procedures ------------------------------- */

async function entryTemplate_set() {
	entryTemplate = await getNodeFromFetchedView('entry');
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

function new_entry(entryTemplate) {
	let newEntry = entryTemplate.cloneNode(true);
	newEntry = addingEntryEventListeners(newEntry, entryTemplate);
	return newEntry;
}

function addingEntryEventListeners(
	newEntry,
	entryTemplate
) {
	newEntry.addEventListener(
		'submit',
		preventDefault
	);
	return newEntry;
}

function preventDefault(e) {
	e.preventDefault();
}
