<?php
const path = '../../data/entries.json';

if ($_GET['putorupdate']){
	$newEntry = (object)[
		'food' => $_POST['food'],
		'datetime' => $_POST['datetime'],
		'id' => $_POST['id'],
	];

	$entries_prior = json_decode(file_get_contents(path));
	$entries_prior_hasId = false;
	$updated_entries = [];
	foreach ($entries_prior as $key => $entry_prior) {
		if ($entry_prior->id === $newEntry->id) {
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
    echo "\n\n first: " . $first->food . " ";
    var_dump($first->datetime);
    echo "second: " . $second->food . " ";
    var_dump($second->datetime);
    echo "\n\n";
		return $first->datetime > $second->datetime;
	});
  file_put_contents(path, json_encode($updated_entries));
  var_dump($updated_entries);
  
}
else if ($_GET['delete']) {
	$id = $_GET['delete'];
	$entries_prior = json_decode(file_get_contents(path));
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
	$entries_prior_json = file_get_contents(path);
	$entries_prior = json_decode($entries_prior_json);
	if ($_GET['start-datetime'] && $_GET['end-datetime']) {
		$entries_prior = json_decode($entries_prior_json);
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
		echo $entries_prior_json;
	}
}