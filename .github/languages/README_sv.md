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

---

![src/templates/entries.html](../screenshots/code/src-templates-entries.html.png)

En datumväljare som väljer vilka food entries som ska visas. Dessa
entries läggs i m_entries som ett utifrån entry.html

---

![src/templates/entries.html](../screenshots/code/src-templates-entry.html.png)

Denna vy hämtas genom fetch i entries.js som körs av entries.html

---
![public/static/entry.js](../screenshots/code/public-static-entries.js-68-74.png)![public/src/views.php](../screenshots/code/public-src-views.php.png)

Här hämtas entries.html

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
