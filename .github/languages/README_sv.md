avalli
=

Din personliga matjournal och matlista
<br>

![public/index.php](../screenshots/application/entries-example.png)

<br>
<br>

# Languages

### [English](../../README.md) Swedish
#### Swedish is the primary language of the docs

<br>
<br>

# Kod

![public/index.php](../screenshots/code/public-index.php.png)

Första steget in i applicationen. Här skapas template objektet
vilket används för att lägga till titel och vilken view som ska
visas. Nu skickas entries.html ut till klienten.
<br>

---

![src/templates/entries.html](../screenshots/code/src-templates-entries.html.png)

En datumväljare som väljer vilka food entries som ska visas. Dessa
entries läggs i "m_entries" som ett utifrån "entry.html".
<br>

---

![src/templates/entry.html](../screenshots/code/src-templates-entry.html.png)

Denna vy hämtas genom fetch i "entries.js" som körs av "entries.html".
<br>

---
![public/static/entries.js 68-74](../screenshots/code/public-static-entries.js-68-74.png)![public/src/views.php](../screenshots/code/public-src-views.php.png)

"entries.js" körs av "entries.html". Direkt vid onload hämtas "entry.html" genom att skicka en fetch request till "views.php". "entry.html" outerHTML används för att skapa en html nod. 
<br>

---
![public/static/entries.js 56-65](../screenshots/code/public-static-entries.js-56-65.png)

Här används den hämtade entry noden till att rendera entries från databasen inom den tid som är vald av datum väljaren, samt renderas en ny entry med nuvarande tid. Denna får även ett nytt id. 
<br>

---
![public/static/entries.js 76-94](../screenshots/code/public-static-entries.js-76-94.png)

Denna function behöver vi inte djupdyka i. Det viktiga här är att det görs en ny fetch request som frågar efter alla entries inom spannet av valt datum. Dessa renderas sedan genom "new_entry_withData".
<br>

---

![public/static/entries.js 206-229](../screenshots/code/public-static-entries.js-206-229.png)

Där finns tre "new_entry" functioner. En som endast skapar en ny nod ifrån noden av "entry.html" genom att klona den. De andra två  använder denna funktion för att skapa sin nya entry, men de lägger även till antingen nuvarande tid eller redan bestämd data. 
<br>

---

![public/static/entries.js 150-164](../screenshots/code/public-static-entries.js-150-164.png)

Den eventlistener som varje entry har för att vid förändring skicka till databasen. Har entry:n, gammal eller ny, fått ny data när den tappar fokus då skickas den till "entries.php". Är entry:ns mat fält tomt då raderas entryn både från databasen och visuellt.
<br>

---

<br>
<br>

## Använder

### Språk

- PHP
- JSON
- HTML
- JavaScript
- scss -> css

##### Egen modifierad atom-bem scss
