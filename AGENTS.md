# AGENTS.md

## Project
- Volpa is een statische HTML/CSS/JS-site op GitHub Pages.
- Houd GitHub Pages-compatibiliteit en relatieve paden onder `/volpa/` intact.

## Source Of Truth
- Blogcontent: `content/blog-posts.txt`
- Kerninformatie over Arnoud/Volpa: `arnoud-data.js`

## Generated Files
- `blog/*.html`
- `sitemap.xml`
- `llms.txt`
- Pas deze bij voorkeur niet handmatig aan als de generator of bronbestanden de juiste plek zijn.

## Commands
- Lokale server: `python3 -m http.server 8000`
- Open lokaal: `http://127.0.0.1:8000/`
- Build alles opnieuw: `npm run build:static`

## Validation
- Gebruik `node --check` voor gewijzigde JS-bestanden, vooral:
  - `assets/js/main.js`
  - `assets/js/seo.js`
  - `scripts/blog-build-utils.js`
  - `scripts/generate-blog-pages.js`
  - `scripts/generate-sitemap.js`
  - `scripts/generate-llms.js`
- Test na relevante wijzigingen minimaal:
  - homepage
  - `blog.html`
  - een pagina in `blog/`
  - `blogpost.html?slug=...`
  - `kennisbank-scheiden.html`
  - `admin/`
  - `robots.txt`
  - `sitemap.xml`
  - `llms.txt`

## Guardrails
- Voeg geen frameworks, backend, database of echte auth toe zonder expliciete opdracht.
- `/admin/` is geen echte beveiligde admin, maar een statische exporttool.
- Behoud de huidige statische architectuur tenzij expliciet anders gevraagd.
- Refactor generated output niet handmatig als de bron of generator aangepast hoort te worden.

## Working Rules For Agents
- Lees eerst de relevante bronbestanden voordat je wijzigt.
- Voor blogwijzigingen: controleer `content/blog-posts.txt`, `assets/js/main.js` en `scripts/blog-build-utils.js`.
- Voor SEO/buildwijzigingen: controleer `assets/js/seo-config.js`, `assets/js/seo.js`, `scripts/generate-sitemap.js` en `scripts/generate-llms.js`.
- Als je blogbron, sitemaplogica of llms-logica wijzigt, draai daarna `npm run build:static`.
