<?php
session_start();
require_once '../src/Templating.php';

$mainTemplate = new Templating('main');

$_SESSION['avalli']['isLoggedIn'] = true;
$_SESSION['avalli']['username'] = 'davlin';

if ($_SESSION['avalli']['isLoggedIn']) {
	$mainTemplate->add('title', 'Avalli');
	$mainTemplate->addView('body', 'entries');
}
else {
	$mainTemplate->add('title', 'Avalli - Login');
	$mainTemplate->addView('body', 'auth');
}

echo $mainTemplate->render();
