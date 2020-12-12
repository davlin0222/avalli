<?php
require_once '../../src/Templating.php';

if (isset($_GET)) {
	if (isset($_GET['getView'])) {
		header('Content-Type: text/plain');
		if ($_GET['getView'] === 'entry') {
			echo file_get_contents(Templating::filepath('entry'));
		}
	}
}