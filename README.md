# Volpa — statische website

Statische website zonder build-stap of dependencies. Alles draait direct in de browser.

## Structuur

```text
volpa/
├── index.html
├── mediation.html
├── financieel-advies.html
├── juridische-begeleiding.html
├── over-arnoud.html
├── contact.html
├── blog.html
├── privacy.html
├── voorwaarden.html
├── cookies.html
├── arnoud-data.js
└── assets/
    ├── css/
    │   └── main.css
    └── js/
        └── main.js
```

## Wat pas je waar aan?

- `arnoud-data.js`
  Voor naam, rol, contactgegevens, certificeringen, specialisaties, cijfers, opleidingen en publicaties.

- `assets/css/main.css`
  Voor alle styling van de homepage en subpagina's.

- `assets/js/main.js`
  Voor interactie zoals FAQ, smooth scroll, formulieren en het invullen van data uit `arnoud-data.js`.

- `*.html`
  Voor paginacontent en navigatie.

## Lokaal draaien

```bash
cd volpa
python3 -m http.server 8000
```

Open daarna:

```text
http://127.0.0.1:8000/
```

## Publiceren via GitHub Pages

Snelste route:

1. Maak een nieuwe repository aan op GitHub
2. Push deze map naar de `main` branch
3. Ga in GitHub naar `Settings > Pages`
4. Kies:
   `Source`: `Deploy from a branch`
   `Branch`: `main`
   `Folder`: `/ (root)`
5. Wacht een paar minuten tot GitHub Pages klaar is

De site komt dan meestal op:

```text
https://JOUW-GITHUB-NAAM.github.io/REPO-NAAM/
```

Omdat deze site meerdere HTML-pagina's en een `assets/` map gebruikt, staat er ook een `.nojekyll` bestand in de root. Dat voorkomt dat GitHub Pages onbedoeld Jekyll-gedrag toepast.

## Nieuwe pagina toevoegen

1. Kopieer een bestaande subpagina, bijvoorbeeld `mediation.html`
2. Pas titel, intro en inhoud aan
3. Voeg de link toe in navigatie of footer

## Opmerkingen

- De juridische pagina's zijn nu placeholders en moeten nog inhoudelijk/juridisch worden gecontroleerd voor livegang.
- Het formulier is nog steeds een demoformulier. Voor echte verzending kun je later bijvoorbeeld Formspree of een server-side endpoint koppelen.
