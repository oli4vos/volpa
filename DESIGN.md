# Volpa ontwerp

## Product en publiek
Volpa is de praktijk van Arnoud Vos voor financieel scheidingsadvies. De site helpt partners met een woning, pensioen, onderneming of ander vermogen te begrijpen wat Arnoud onderzoekt, welke keuzes zij moeten maken, wat begeleiding kost en hoe zij contact opnemen. De bezoeker kan gespannen zijn en leest waarschijnlijk snel. Informatie moet zonder vaktaal of opgewekte verkooptoon te vinden zijn.

## Ontwerprichting
**Karakter:** kalm, precies, warm en gezaghebbend.  
**Beeld:** een zorgvuldig vormgegeven adviespraktijk. Het echte Volpa-woordmerk en de zandkleur, koperkleur en donkerbruine tekst van [volpa.nl](https://www.volpa.nl/) vormen de identiteit. De vorm blijft ruim en leesbaar, zonder dashboardesthetiek of generieke luxeversiering.  
**Eerste taak:** binnen één scherm begrijpen wat Arnoud doet en de kennismaking kunnen plannen.  
**Tweede taak:** diensten, prijs, werkwijze en persoon kunnen toetsen voordat iemand contact opneemt.

De site houdt twee selecteerbare stijlen: `assets/css/main.css` (**Huidige stijl**) en `assets/css/main9.css` (**Atelier**). De inhoud, semantiek en interactie zijn gedeeld. `assets/js/theme-init.js` kiest de stylesheet vóór de pagina zichtbaar wordt; `assets/js/main.js` toont de publieke schakelaar. Alternatieve debugstijlen blijven buiten de gewone schakelaar. GitHub Pages blijft statisch en relatieve paden blijven geldig onder `/volpa/`.

## Typografie en vorm
- Lopende tekst in Geist of een vergelijkbare goed leesbare sans. Kies kopgroottes naar inhoud, niet voor maximale impact. De grote kop op mobiel moet zonder afgebroken woorden leesbaar blijven.
- Maximaal één duidelijke H1, daarna beschrijvende H2's. Gebruik gewone zinshoofdletters. Een kop hoeft geen cursief of gekleurd accentwoord.
- Geen `01/02/03` als decoratie. Een proces mag een volgorde hebben, maar de tekst moet die volgorde zelfstandig duidelijk maken.
- Geen kleine bovenregel die de kop eronder herhaalt. Een breadcrumb, categorie en datum mogen blijven wanneer zij navigatie of context geven.
- Gebruik een punt of komma waar een em-dash alleen ritme toevoegt. Bewaar betekenisvolle bereiknotatie met een en-dash, zoals `09:00–18:00`.
- Atelier gebruikt warm wit `#faf7f2`, zand `#e2d3c0`, donkerbruin `#352b27` en koper `#8b4719` voor hoofdacties. Dit zijn digitale benaderingen van de kleuren op volpa.nl. Koppen gebruiken Newsreader, lopende tekst Geist. Het officiële woordmerk staat in `assets/img/volpa-wordmark.png`. Zorg voor duidelijk contrast. Geen verlopen, gloed of glas.
- Gebruik ruimte en uitlijning om verwante inhoud te groeperen. Een kaart of rand is toegestaan wanneer die een echte keuze, invulveld of afgebakend document onderscheidt. Geen kaart om lege ruimte te vullen.
- Geen verzonnen inhoudskaarten, identieke iconentegels voor diensten of stroken die gewone procesinformatie als statistisch bewijs presenteren. Een echte, gelinkte cliëntbeoordeling mag als onomkaderde tekst naast de hero staan.
- Geen automatische verschijnanimatie op iedere sectie. Interacties hebben wel zichtbare hover-, focus- en foutstatus. Respecteer `prefers-reduced-motion`.
- Knoppen in Atelier hebben hoeken van 12 px en minstens 48 px hoogte. Formulierkaarten hebben hoeken van 16 px, velden van 10 px. Veldlabels blijven gewone leesbare tekst boven het veld; de focusrand gebruikt koper. De stijlschakelaar staat in de footer zodat hij geen inhoud of formulieren bedekt.
- Ankers houden ruimte vrij voor de vaste navigatie. Veelgestelde vragen melden hun open status aan hulptechnologie. Het mobiele menu sluit met Escape, buitenklik en na navigatie.
- Op mobiel blijft de vaste header één rij hoog. De primaire actie staat in het geopende menu; op de homepage en contactpagina staat de directe actie bij de inhoud. Zo neemt navigatie minder schermruimte in en verschijnt dezelfde knop niet twee keer boven elkaar.
- Processtappen staan samen in één rustig paneel. Alle stappen gebruiken dezelfde binnenmarge van 40 px op desktop en 24 px op mobiel, zodat geen kolom hard tegen de buitenlijn begint.

## Inhoud
- Schrijf in de termen van bezoekers: woning, hypotheek, inkomen, pensioen, alimentatie, onderneming, belasting, convenant.
- Leg uit wat Arnoud **doet**: documenten verzamelen, gegevens controleren, opties doorrekenen en gevolgen voor beide partners bespreken.
- Noem wat een bezoeker **krijgt**: een overzicht, berekeningen, bespreking van keuzes en afspraken die kunnen worden vastgelegd. Gebruik alleen resultaten die het aanbod echt omvat.
- Behoud het uurtarief en de gratis kennismaking zichtbaar en precies. Cijfers, reviews, opleidingen en kwalificaties hebben een controleerbare bron in `arnoud-data.js` of de bestaande site-inhoud.
- Maak geen verzonnen cliëntreview, casus, foto, tijdwinst of resultaatpercentage. Gebruik beoordelingen uitsluitend met controleerbare bron en link. De portretplaceholder toont voorlopig alleen Arnouds naam; zodra een echte foto beschikbaar is kan die worden geplaatst.
- Elke sectie heeft een eigen taak. Schrap een tweede uitleg van een punt dat net is gemaakt. Gebruik contactoproepen spaarzaam.
- Blogartikelen komen uit `content/blog-posts.txt`. Bewerk gegenereerde `blog/*.html` via de generator, niet handmatig.

## Pagina-indeling
- **Homepage:** heldere H1, korte uitleg en één hoofdactie; concrete output van het werk; diensten als directe ingangen; beknopte werkwijze; Arnoud; praktische vragen en contact. Geen A/B-routekaarten, genummerde onderwerptegels of pseudo-statistieken.
- **Diensten:** specifieke vraag in de titel, concrete reikwijdte, wat onderzocht wordt, hoe het traject aansluit op andere deskundigen, duidelijke volgende stap.
- **Blog en kennisbank:** lezing en navigatie staan voorop. Categorie en datum zijn nuttig; een verkoopblok vóór de artikelen niet.
- **Contact en intake:** formulieren, contactgegevens, tarief en verwachte vervolgstap duidelijk; geen herhaalde CTA's rond dezelfde handeling.

## Repositories en controles
- `.agents/skills/impeccable/` komt uit [pbakaus/impeccable](https://github.com/pbakaus/impeccable), Apache 2.0. Gebruik de audit en detector als tweede controle, met dit document als Volpa-specifieke waarheid.
- `.agents/skills/anti-slop/` komt uit [RealMrHex/anti-slop](https://github.com/RealMrHex/anti-slop), MIT. Gebruik de audit en refine-workflow voor contextuele kritiek.
- `npm run audit:style` controleert de expliciete Volpa-regels voor decoratieve nummering, em-dashes en herhalende labels in de kernpagina's. Automatische uitkomsten zijn signalen; bekijk altijd de gerenderde pagina.
- Het onderzoeksrapport en de specifieke bevindingen staan in `AI-SLOP-ONDERZOEK-VOLPA.md`.

## Definitie van klaar
Controleer beide stijlen op telefoon en desktop. Test homepage, blog, gegenereerd artikel, blogpreview, kennisbank, contact, admin, robots, sitemap en llms. Geen horizontale overflow. Menu, stijlschakelaar, formulier, focus en leesbaarheid blijven werken. Lees de kernpagina's zonder opmaak: elke kop en alinea moet ook dan nuttig zijn.
