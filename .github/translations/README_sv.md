# avalli
Din personliga mat dagbok och mat journal

<img style="width: 60vw;" src="../images/example.png">


## Other Languages
[Swedish](./translations/README_sv.md)


## Code 

![index.php](../images/screenshots/public-index.png)

<code>
<?php
require_once '../src/Templating.php';

$mainTemplate = new Templating('main');

$mainTemplate->add('title', 'Avalli');
$mainTemplate->addView('body', 'entries');

echo $mainTemplate->render();
</code>

Första steget in i applicationen