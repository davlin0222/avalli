<?php
require_once '../src/Templating.php';

$mainTemplate = new Templating('main');

$mainTemplate->add('title', 'Avalli');
$mainTemplate->addView('body', 'entries');

echo $mainTemplate->render();
