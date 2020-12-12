<?php
const path = '../../data/entries.json';

if ($_GET['putorupdate']){
	$newEntry = [
		'food' => $_POST['food'],
		'datetime' => $_POST['datetime'],
		'id' => $_POST['id'],
	];

	$entries_prior = json_decode(file_get_contents(path));
	$entries_prior_hasId = false;
	$updated_entries = [];
	foreach ($entries_prior as $key => $entry_prior) {
		if ($entry_prior->id === $newEntry['id']) {
			$entries_prior_hasId = true;
			$updated_entries[] = $newEntry;
		} else {
			$updated_entries[] = $entry_prior;
		}
	}
	if (!$entries_prior_hasId) {
		$updated_entries[] = $newEntry;
	}

	usort($updated_entries, function ($first, $second) {
		return $first->date > $second->date;
	});
	file_put_contents(path, json_encode($updated_entries));
}
else if ($_GET['delete']) {
	$entries_prior = json_decode(file_get_contents(path));
	/* $updated_entries = [];
	foreach ($entries_prior as $key => $entry_prior) {
		if ($entry_prior->id === $newEntry['id']) {
			$entries_prior_hasId = true;
			$updated_entries[] = $newEntry;
		} else {
			$updated_entries[] = $entry_prior;
		}
	}
	if (!$entries_prior_hasId) {
		$updated_entries[] = $newEntry;
	} */
}
else if ($_GET['getEntries']) {
	header('Content-Type:application/json');
	$entries_prior_json = file_get_contents(path);
	echo $entries_prior_json;
}