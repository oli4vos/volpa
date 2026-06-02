# Volpa — statische website

Statische website met lichte Node-buildscripts voor blogs, `sitemap.xml` en `llms.txt`. De publiekskant draait verder direct in de browser.

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
├── blogpost.html
├── blog-aanleveren.html
├── privacy.html
├── voorwaarden.html
├── cookies.html
├── BLOG-AANLEVEREN.md
├── content/
│   └── blog-posts.txt
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
  Voor interactie zoals FAQ, smooth scroll, formulieren, blogrendering en het invullen van data uit `arnoud-data.js`.

- `content/blog-posts.txt`
  Voor alle blogartikelen in één eenvoudig tekstformaat.

- `blog-aanleveren.html`
  Voor niet-technische aanlevering van nieuwe blogartikelen met copy/download-flow.

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

## Build en validatie

Gebruik deze commando's als je blogcontent, sitemap, `llms.txt` of formulierconfig hebt aangepast:

```bash
npm run validate:forms
npm run build:static
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

## Blog toevoegen

1. Open `blog-aanleveren.html`
2. Vul minimaal titel en tekst in
3. Gebruik `Open e-mailconcept`, `Kopieer blogblok` of `Download .txt`
4. Plak het blok onderaan `content/blog-posts.txt` als je handmatig publiceert
5. Push naar GitHub Pages

## Opmerkingen

- De juridische pagina's zijn nu placeholders en moeten nog inhoudelijk/juridisch worden gecontroleerd voor livegang.
- Het formulier is nog steeds een demoformulier. Voor echte verzending kun je later bijvoorbeeld Formspree of een server-side endpoint koppelen.

## Formulieren en leadverwerking

De site gebruikt nu een centrale formulierlaag via:

- `assets/js/forms-config.js`
- `assets/js/forms.js`

Huidige standaard:

- `mode: "mailto"`
- formulieren openen dus standaard het mailprogramma van de bezoeker
- dit werkt zonder backend, secrets of database

Formulieren:

- `contact.html`
  Uitgebreid intakeformulier voor kennismakingen, second opinions en inhoudelijke vragen.
- `leadpagina.html`
  Kort intakeformulier voor laagdrempelige eerste aanvragen.
- `index.html`
  Behoudt een compact homepageformulier.
- `bedankt.html`
  Noindex-bedanktpagina voor endpoint- of testverwerking. Bij `mailto` wordt niet automatisch doorgestuurd.

Later Formspree koppelen:

1. Maak in Formspree een formulier aan
2. Neem het publieke endpoint over, bijvoorbeeld:
   `https://formspree.io/f/FORM_ID`
3. Pas in `assets/js/forms-config.js` aan:

```js
window.VOLPA_FORMS = {
  mode: "form-endpoint",
  provider: "formspree",
  endpoint: "https://formspree.io/f/FORM_ID"
};
```

Belangrijk:

- zet geen API-keys of secrets in de frontend
- gebruik alleen een publiek formulierendpoint
- vraag via formulieren geen zeer gevoelige documenten of dossierstukken op

Testen:

```bash
node --check assets/js/forms-config.js
node --check assets/js/forms.js
node --check scripts/validate-forms-config.js
npm run validate:forms
python3 -m http.server 8000
```

Controleer daarna minimaal:

- `contact.html`
- `leadpagina.html`
- `bedankt.html`
- homepageformulier op `index.html`

Voor lokale tests zonder netwerk of mailclient kun je tijdelijk `mode: "test"` gebruiken in `assets/js/forms-config.js`.

## Pre-live en livegang

GitHub Pages is nu de staging/testomgeving:

- publieke pagina's staan daarom tijdelijk op `noindex,follow`
- `admin/` en `blog-aanleveren.html` blijven intern op `noindex,nofollow`
- `robots.txt`, `sitemap.xml` en `llms.txt` blijven bestaan, maar zijn vooral voorbereidende infrastructuur

Belangrijk voor intern designtesten:

- `main.css` is de vaste publieksbasis
- alternatieve designs blijven beschikbaar via querystring, bijvoorbeeld `?theme=main_small`
- de zichtbare theme-switcher is verborgen op publieke pagina's
- tijdelijk tonen kan met `?theme=main_small&themePanel=1`

Bij livegang op `volpa.nl` of `www.volpa.nl` moeten deze stappen gebeuren:

1. eigen domein koppelen
2. `siteUrl` in `assets/js/seo-config.js` omzetten van `https://oli4vos.github.io/volpa/` naar het live domein
3. `isStaging` op `false` zetten in `assets/js/seo-config.js`
4. `npm run build:static` draaien om canonicals, statische blogs, `sitemap.xml` en `llms.txt` opnieuw te genereren
5. controleren dat publieke pagina's weer op `index,follow` staan
6. formulierendpoint kiezen en koppelen
7. Search Console instellen
8. analytics alleen toevoegen als privacy- en cookiekeuze helder is
9. inhoudelijke eindcheck door Arnoud afronden
