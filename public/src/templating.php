<?php
require_once '../../src/Templating.php';

if (isset($_GET)) {
	if (isset($_GET['getView'])) {
		header('Content-Type: text/plain');
		echo file_get_contents(Templating::filepath($_GET['getView']));
	}
}