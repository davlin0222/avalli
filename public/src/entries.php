<?php
session_start();

if (!$_SESSION['avalli']['isLoggedIn']) {
	return;
}

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
	$id = $_GET['delete'];
	$users = json_decode(file_get_contents(path));
	$users = (array)$users;
	$entries_prior = $users[$_SESSION['avalli']['email']];
	$updated_entries = [];
	foreach ($entries_prior as $key => $entry_prior) {
		if ($entry_prior->id !== $id) {
			$updated_entries[] = $entry_prior;
		}
	}

	usort($updated_entries, function ($first, $second) {
		return $first->date > $second->date;
	});
	file_put_contents(path, json_encode($updated_entries));
}
else if ($_GET['getEntries']) {
	header('Content-Type:application/json');

	$users = json_decode(file_get_contents(path));
	$users = (array)$users;
	$entries_prior = $users[$_SESSION['avalli']['email']];
	if ($_GET['start-datetime'] && $_GET['end-datetime']) {
		$selected_entries = [];
		foreach ($entries_prior as $entry_prior) {
			if ($entry_prior->datetime >= $_GET['start-datetime'] && $entry_prior->datetime < $_GET['end-datetime']) {
				$selected_entries[] = $entry_prior;
			}
		}
		// $selected_entries[] = $_GET['end-datetime'];
		echo json_encode($selected_entries);
	}
	else {
		echo json_encode($entries_prior);
	}
}