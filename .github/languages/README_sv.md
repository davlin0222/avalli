avalli
=

Din personliga matjournal och matlista
<br>

![public/index.php](../screenshots/application/entries-example.png)

<br>

# Användning

GitHub repository: https://github.com/davlin0222/avalli

<br>

### Prova avalli

- Genom att ladda ner och köra på lokal server, eller
- För alla som vill testa den globala beta versionen, innan tilläggning av separata användare:  https://creatorise.com/avalli

<br>

# Languages

### [English](../../README.md) Swedish
#### Swedish is the primary language of the docs

<br>

# Kod dokumentation

![public/index.php](../screenshots/code/public-index.php.png)

Första steget in i applicationen. Nu skapas template objektet
vilket används för att lägga till titel och den view som ska
visas. Här skickas "entries.html" ut till klienten. 
<br>

---

![src/templates/entries.html](../screenshots/code/src-templates-entries.html.png)

I header:n är en datumväljare som väljer vilken dags food entries som ska visas. Dessa läggs som egna html formulär i "m_entries" utifrån "entry.html" mallen. 
<br>

---

![src/templates/entry.html](../screenshots/code/src-templates-entry.html.png)

Denna view används som en mall för alla entries. 
<br>

---
![public/static/entries.js line 68-74](../screenshots/code/public-static-entries.js-68-74.png)![public/src/views.php](../screenshots/code/public-src-views.php.png)

"entries.js" körs av "entries.html" vilken direkt vid onload hämtar "entry.html" genom att skicka en GET fetch request till "views.php". 
<br>

---
![public/static/entries.js line 56-65](../screenshots/code/public-static-entries.js-56-65.png)

Här används den hämtade entry noden till att rendera tidigare skapade entries, som ligger i databasen. De entries med datumstämpel inom den tid som är vald av datum väljaren hämtas och renderas, samt en ny entry med nuvarande tid. Denna får även ett id, skapat av npm:s uuid, v4 funktionen används. 
<br>

---
![public/static/entries.js line 76-94](../screenshots/code/public-static-entries.js-76-94.png)

En GET fetch request som frågar efter alla entries inom spannet av valt datum. Dessa renderas sedan genom "new_entry_withData". 
<br>

---

![public/static/entries.js line 206-229](../screenshots/code/public-static-entries.js-206-229.png)

Här är tre "new_entry" functioner. En som endast skapar en ny nod ifrån noden av "entry.html" genom att klona den. De andra två  använder denna grund funktion för att skapa sin nya entry. Dessa två lägger sedan till nuvarande tid eller förbestämd data. 
<br>

---

![public/static/entries.js line 150-164](../screenshots/code/public-static-entries.js-150-164.png)

Detta är eventet som varje entry kör vid förändring av mat eller tid input för att skicka dess innehåll till databasen. Har en entry fått nytt innehåll när den tappar fokus då skickas datan till "entries.php". Finns id:t i databasen ändras innehållet, annars skapas en ny. Är mat fältet tomt i denna entry då raderas den både från databasen och visuellt, html noden tas bort. 
<br>

---

<br>

# Problem ärenden
https://github.com/davlin0222/avalli/issues

<br>

## Extra belysta befintliga problem

![public/static/entries.js line 189](../screenshots/code/public-static-entries.js-189.png)

Denna rad används vid exportering genom att kopiera den formaterade strängen till användarens clipboard. Detta har upptäckts inte fungera på DuckDuckGo:s och Safari:s mobila webbläsare. 

https://github.com/davlin0222/avalli/issues/4

<br><br>

Ändrar man tiden på en entry, innan mat lagts till, tas den bort. 

https://github.com/davlin0222/avalli/issues/5

<br><br>

# Använder
### Språk

- PHP på backend
- JSON för databas
- HTML markup på framsidan
- JavaScript, frontend, gör förfrågningar till backend
- scss -> css, för styling
  - Tillämpar egen modifierad atom-bem class naming

### Software
- Apache server

### Dependencies
- npm
  - uuid
- A way to compile sass

<br>

---

<br>

# Enormt Tack till
## Bästa läraren - [Fredric Persson](https://github.com/freddeP)
