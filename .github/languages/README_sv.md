avalli
=

Din personliga mat dagbok och mat journal

<br>
<img style="width: 60vw;" src="../images/example.png">
<br>
<br>
<br>

# Languages

### [English](../../README.md) Swedish
#### Swedish is the primary language of the docs
<br>
<br>

# Kod

![public/index.php](../images/screenshots/public-index.php.png)
Första steget in i applicationen. Här skapas template objektet
vilket används för att lägga till titel och vilken view som ska
visas. Nu skickas entries.html ut till klienten.

---

![src/templates/entries.html](../images/screenshots/src-templates-entries.html.png)
En datumväljare som väljer vilka food entries som ska visas. Dessa
entries läggs i m_entries som ett utifrån entry.html

---

![src/templates/entries.html](../images/screenshots/src-templates-entry.html.png)
Denna vy hämtas genom fetch i entries.js som körs av entries.html

---
![public/static/entry.js](../images/screenshots/public-static-entries.js-68-74.png)
![public/src/views.php](../images/screenshots/public-src-views.php.png)
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
