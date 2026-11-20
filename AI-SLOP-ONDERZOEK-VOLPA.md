# Onderzoek en audit: AI-slop op Volpa

**Datum:** 19 november 2026  
**Scope:** zichtbare vorm en tekst van de publieke statische site, beide stijlen, inclusief homepage, blog, diensten, kennisbank en contact. Dit rapport gebruikt een code-inventaris, een visuele controle van de lokale site en een selectie van openbare discussies en ontwerpbronnen. Reddit-reacties zijn praktijkervaringen, geen representatieve gebruikerstest. Een automatische detector levert signalen, geen objectief oordeel over kwaliteit.

## 1. Wat mensen concreet bedoelen

De recente [r/webdesign-discussie over herkenbare AI-sites](https://www.reddit.com/r/webdesign/comments/1xsqm9l/are_there_any_dead_giveaways_of_an_ai_designed/) noemt kleine labels boven koppen, genummerde secties, cursieve woorden in koppen, em-dashes, pillen, kaarten, gloed, generieke iconen, herhaalde inhoud en een hero met tekst links en een kaart rechts. Een [andere discussie](https://www.reddit.com/r/webdesign/comments/1vygnjp/how_do_i_get_rid_of_the_aivibecode_look/) beschrijft hetzelfde vaste recept: eyebrow, kop, beschrijving, twee knoppen, daarna stappen `01` tot `04`. In [r/UI_Design](https://www.reddit.com/r/UI_Design/comments/1w70kqb/question_about_websites_looking_like_ai_slop/) wijzen mensen er terecht op dat een rand of schaduw op zichzelf geen AI-kenmerk is. Het gevoel ontstaat wanneer steeds dezelfde keuzes zonder aantoonbare reden samenkomen.

Adrian Krebs [analyseerde 1.590 recente Show HN-pagina's](https://www.adriankrebs.ch/blog/design-slop/) met deterministische DOM- en CSS-controles. Hij noemt onder meer een afwijkend cursief woord in de hero, een badge boven de H1, gekleurde kaartranden, identieke featurekaarten, genummerde stappen en statistiekstroken. Zijn meting is verkennend, gericht op Show HN en heeft volgens zijn eigen controle ongeveer 5 tot 10 procent foutpositieven. De [Impeccable-catalogus](https://impeccable.style/slop/) onderscheidt daarom zichtbare clichés, technische kwaliteitsproblemen en afwijkingen van een eigen ontwerpsysteem.

**Werkdefinitie voor Volpa:** een element is verdacht als het op veel pagina's terugkomt, weinig helpt bij de keuze van een bezoeker en zonder verlies van betekenis kan worden weggelaten. Het gaat om de opeenstapeling, niet om het verbieden van één leesteken of CSS-eigenschap.

## 2. Concrete kenmerken en remedie

| Kenmerk | Waarom mensen het herkennen | Volpa vóór deze ronde | Aanpak |
|---|---|---|---|
| Decoratieve `01`, `02`, `03` | Een nummer suggereert proces of rangorde, ook waar die niet bestaat | Zeven genummerde sectielabels, acht genummerde onderwerpen en vier genummerde stappen op de homepage | Verwijder de nummers uit secties en onderwerpen. Beschrijf echte stappen met werkwoorden en inhoud, zonder grafische index. |
| Em-dash als standaardritme | AI-tekst zet vaak een pauze of tegenstelling met `—` waar een punt werkt | Negen zichtbare em-dashes op de homepage | Herschrijf zinnen. Behoud alleen betekenisvolle streepjes in bijvoorbeeld een adres of getalbereik; die zijn geen retorische em-dash. |
| Eyebrow boven bijna elke kop | Een tweede, kleine kop herhaalt vaak de H2 | Homepage heeft zeven `.sec-num`-labels; ook veel binnenpagina's beginnen ermee | Verwijder herhalende labels. Behoud echte breadcrumb-navigatie en noodzakelijke metagegevens. |
| Cursief of accentkleur op één kopwoord | Een automatische manier om een verder generieke kop spannender te maken | Zeventien `<em>`-elementen op de homepage | Laat koppen het onderwerp zelf dragen. Gebruik geen decoratieve `em`; echte nadruk blijft semantisch mogelijk. |
| H1 links, quote/kaart rechts | Standaard AI-landingspagina met een opvulkaart | De hero bevat een gesimuleerde vragenkaart naast de H1 | Geef de vragen een gewone, geïntegreerde plek of verwijs naar een echte casus. Geen kaart puur voor balans. |
| Hero plus vier vakken met cijfers/claims | De visuele vorm lijkt op bewijs, ook wanneer de inhoud slechts procesinformatie is | `hero-stats` bevat aanpak, kennismaking, gesprekken en uurtarief | Zet prijs en werkwijze in leesbare, feitelijke tekst. Gebruik cijfers alleen voor echte prijs of verifieerbare uitkomst. |
| Twee gelijke routekaarten | Een kunstmatig A/B-verhaal verdringt uitleg over de eigen dienstverlening | `Route A` tegenover `Route B` | Vervang door één concrete uitleg: welke gegevens worden bekeken, welke berekening volgt en wat de cliënt krijgt. |
| Kaarten voor ieder onderwerp | Alles krijgt dezelfde rand, padding en hover, ook wanneer het een simpele link of alinea is | Acht onderwerptegels, dienstkaarten, blogkaarten en notices | Gebruik lijsten, tekstblokken en directe links. Een kaart alleen wanneer de afbakening functioneel is. |
| Gelijke iconen boven diensten | Decoratie bepaalt het ritme in plaats van de inhoud | Vijf dienstblokken met lijniconen | Laat de dienstnaam en relevante vraag voorop staan. Gebruik iconen alleen als ze oriëntatie verbeteren. |
| Puntjes, pillen en labels als versiering | Ze zijn visuele ankers zonder nieuwe informatie | Logo-dot, route-pill, hero-labels en diverse kleine tags | Verwijder decoratieve markeringen. Behoud categorieën waar ze nodig zijn voor blognavigatie. |
| Overmatig gebruik van monospace en kapitalen | De pagina lijkt een UI-template in plaats van een adviespraktijk | Labels in `.sec-num`, `.stat-kicker`, `.role`, footer en CTA's | Gebruik monospace uitsluitend voor data of kleine metadata. Schrijf lopende tekst en navigatie normaal. |
| Vage resultaatwoorden | Claims als rust en inzicht zeggen niet wat de dienst doet | Herhaald `volledig inzicht`, `rust`, `overzicht`, `afspraken die kloppen` | Noem onderzoek, berekening, document en beslissing. Schrijf wat een cliënt na een gesprek concreet weet. |
| Te veel herhaling over meerdere secties | Lange pagina zonder evenredig meer informatie | Financieel inzicht, woning, pensioen en alimentatie keren op de homepage in diverse blokken terug | Geef iedere sectie een eigen taak. Schrap of combineer secties die dezelfde belofte herhalen. |
| Onverifieerbare quotes en proof | Een getuigenis zonder echte afzender oogt geconstrueerd | De eerdere hero-quote is al omgezet naar een voorbeeldvraag; een grote principequote bleef | Label voorbeelden expliciet. Gebruik geen testimonialvorm zonder toestemming en herkomst. |
| Placeholder die op een echte persoon lijkt | Een silhouet of AI-portret ondermijnt vertrouwen bij persoonlijke dienstverlening | Eerder SVG-silhouet; nu typografische naamplaceholder | Houd de typografische placeholder tot een echte foto beschikbaar is. Geen gegenereerd gezicht van Arnoud. |
| Automatische onthulanimaties | Alles schuift of vervaagt zonder functionele reden | `initReveal()` voegt `.reveal` toe aan secties en kaarten | Schakel onthulling in Atelier uit. Behoud directe feedback voor interactieve knoppen. |
| Onverklaarde schaduwen en verlopen | Geeft alle secties dezelfde zachte template-afwerking | Basis-CSS bevat 26 `gradient(`- en 16 `box-shadow`-vermeldingen | Atelier moet in de gerenderde pagina vlak zijn. Controleer computed styles, omdat Atelier de basis-CSS importeert. |
| Uniforme, lange artikelintro's | Marketingzin vóór de inhoud vertraagt de bezoeker | Blog, kennisbank en diensten hebben soms twee keer een inleiding | Begin bij de vraag van de bezoeker. Eén introductie per pagina, daarna antwoord. |
| FAQ als standaardblok | Een uitklap-FAQ is vaak toegevoegd omdat landingspagina's die 'horen' te hebben | Acht homepagevragen | Houd vragen met echte praktische waarde; schrijf antwoorden direct en specifiek. Een FAQ is niet op zichzelf fout. |
| SEO-woorden als zichtbare copy | Herhaalde zoektermen maken een tekst robotachtig | `financieel scheidingsspecialist`, `volledig financieel inzicht` op veel pagina's | Gebruik de zoekterm waar die informeert, daarna gewone taal en concrete voorbeelden. |

De opmerking over de **combinatie** van pillen, eyebrows, kaarten en em-dashes komt rechtstreeks terug in [de recente r/webdesign-reacties](https://www.reddit.com/r/webdesign/comments/1xsqm9l/are_there_any_dead_giveaways_of_an_ai_designed/). De bezwaren tegen nutteloze animatie, iconen en herhaalde kaartstructuren sluiten aan bij de [Impeccable-catalogus](https://impeccable.style/slop/) en [Krebs' inventaris](https://www.adriankrebs.ch/blog/design-slop/).

## 3. Audit van Volpa per paginatype

### Homepage: hoogste prioriteit

De homepage heeft de grootste dichtheid van signalen: 21 losstaande `01` tot `09`-markeringen in zichtbare tekst, zeven `.sec-num`-labels, zeventien decoratieve `<em>`-tags en negen em-dashes. De hero volgt nog steeds het vaste recept met kleine bovenregel, groot opschrift, twee knoppen en een rechterkaart. Daaronder staan vier vakken die als statistieken ogen, gevolgd door een A/B-vergelijking, dienstblokken, acht onderwerpkaders, vier processtappen en een FAQ. Dit is meer uitlegstructuur dan nodig om de eerste keuze te maken.

**Nieuwe inhoudsvolgorde:** (1) wat Arnoud onderzoekt, (2) wat de bezoeker na de analyse weet, (3) diensten als directe ingangen, (4) werkwijze in gewone tekst, (5) Arnoud, (6) contact. De uurtariefinformatie blijft makkelijk vindbaar. Onderwerpen kunnen via kennisbank en diensten worden bereikt.

### Diensten en intake

De dienstenpagina's hebben minder visuele clichés, maar veel pagina's beginnen met een label dat de paginanaam herhaalt. De intakepagina heeft weer een grote hero, proof-blokken en meerdere conversiekaarten. Ook daar geldt: één duidelijke route naar contact, met helderheid over prijs en wat de eerste stap inhoudt.

### Blog, artikelen en kennisbank

Een categorie en datum zijn nuttige metadata. `Volpa · Blog` boven de blogtitel voegt weinig toe. Op de blog staan een notice, een uitgelicht artikel en een tweede oproep naar gesprek voordat de lijst begint. De kennisbank mag juist een gestructureerd overzicht behouden; de navigatiewaarde is daar groter dan op de homepage. De generator voor `blog/*.html` blijft de bron voor artikelpagina's.

### Vertrouwen

De typografische placeholder is eerlijker dan het eerdere silhouet. Echte fotografie blijft een latere kans. Concrete procesdetails, kwalificaties en bereikbaarheid zijn al aanwezig; die zijn sterker dan algemene beloftes of nagebootste sociale bewijsvormen. Beschrijf een geanonimiseerd praktijkvoorbeeld pas als de feiten daarvoor zijn geverifieerd.

## 4. Ontwerpregels voor uitvoering

1. Verwijder decoratieve sectienummers en labels op publieke pagina's. Een breadcrumb of artikelcategorie blijft als die helpt navigeren.
2. Gebruik gewone zinnen met punten en komma's. Schrijf em-dashes in marketingtekst om; controleer daarna handmatig dat adressen, tijden en typografische getalbereiken intact blijven.
3. Verwijder tekst die alleen de volgende kop aankondigt of een eerder punt herhaalt.
4. Gebruik een kaart alleen als de bezoeker er informatie mee kan vergelijken of als inhoud werkelijk bij elkaar hoort.
5. Maak Atelier visueel anders door de **informatiearchitectuur** te verbeteren, niet alleen door kleuren en randen te vervangen.
6. Behoud echte informatie: tarief, werkwijze, contact, kwalificaties en toepassingsgebied.
7. Controleer met een automatische detector én met screenshots, toetsenbord en mobiele weergave. De [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines) geven bruikbare controles voor focus, doelen op mobiel, formulieren en beweging.
8. Vraag bij elke nieuwe sectie: welke beslissing kan de bezoeker hierna nemen? Als het antwoord hetzelfde is als in de vorige sectie, combineer of schrap.

## 5. Repositories en toepassing

- [pbakaus/impeccable](https://github.com/pbakaus/impeccable), Apache 2.0: bruikbaar als projectskill en CLI-controle voor broncode en gerenderde pagina's. De detector is een tweede lezer, geen automatische ontwerper. Geen runtimeafhankelijkheid voor de GitHub Pages-site.
- [RealMrHex/anti-slop](https://github.com/RealMrHex/anti-slop), MIT: projectskill voor contextuele audit en gerichte verbeteringen. De instructies schrijven geen vaste stijl voor. Geen browser- of servercode.
- [AdrianKrebs/design-slop-cop](https://github.com/AdrianKrebs/design-slop-cop), MIT: nuttig als onafhankelijke benchmark van visuele patronen. Het scoresysteem kan foutpositieven geven en mag geen harde releasepoort zijn.
- [nattergabriel/frontend-craft](https://github.com/nattergabriel/frontend-craft): nuttige taxonomie, maar geen zichtbare licentie. Daarom alleen als onderzoeksbron gebruikt, niet gekopieerd naar de repository.

De projectskill(s) horen in `.agents/skills/`. Tools mogen de statische site niet belasten met JavaScript, frameworks of een backend. De definitieve regels van Volpa horen in `DESIGN.md` en hebben voor dit project voorrang op generieke stijladviezen.

## 6. Acceptatiecriteria

- Geen decoratieve `01/02`-nummers, routeletters of herhalende eyebrows op de publieke homepage.
- Geen retorische em-dashes in zichtbare marketingtekst van de kernpagina's; behouden alleen waar ze functioneel zijn.
- De hero bevat geen opvulkaart en geen pseudo-statistiekstrook.
- Diensten, werkwijze en contact zijn vindbaar binnen duidelijke, verschillende secties.
- Beide stijlen en de schakelaar werken op desktop en telefoon. Geen horizontale overflow.
- Focus, menu, formulieren en `prefers-reduced-motion` blijven bruikbaar.
- Geen verzonnen foto, review, casus of resultaatcijfer.

## Bronnen en beperkingen

De belangrijkste externe bronnen zijn de [r/webdesign-discussie van november 2026](https://www.reddit.com/r/webdesign/comments/1xsqm9l/are_there_any_dead_giveaways_of_an_ai_designed/), [r/UI_Design over de grenzen van het begrip](https://www.reddit.com/r/UI_Design/comments/1w70kqb/question_about_websites_looking_like_ai_slop/), [r/ClaudeCode over het nut van eigen referenties en een stijlguide](https://www.reddit.com/r/ClaudeCode/comments/1xyp1gd/claude_is_awful_at_design/), [Krebs' Show HN-meting](https://www.adriankrebs.ch/blog/design-slop/), de [Impeccable-catalogus](https://impeccable.style/slop/) en de [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines). Dit is een gerichte selectie. Reddit-reacties weerspiegelen deelnemers die sterk op AI-design letten; gewone cliënten kunnen anders reageren. De acceptatiecriteria borgen daarom ook begrijpelijkheid, vertrouwen en bruikbaarheid.

## 7. Uitvoering en resultaat

De audit is uitgevoerd voordat de pagina's zijn aangepast. Daarna zijn de decoratieve nummers, herhalende bovenlabels en cursieve kopaccenten verwijderd uit de publieke kernpagina's. De homepage gebruikt nu een inhoudelijke hero, een lijst met concrete uitkomsten, directe dienstlinks en vier benoemde processtappen. De intakepagina bevat geen proof-strook, getekend gezicht of nagebootste testimonial meer. De foto blijft een typografische placeholder. De bloggenerator is aangepast zodat gegenereerde artikelen geen dubbel bloglabel krijgen. De beide stijlen gebruiken dezelfde inhoud en blijven via de bestaande schakelaar bereikbaar.

`npm run audit:style` controleert tien kernpagina's op de meest herkenbare patronen en de homepage op opvulkaarten. Deze controle is opzettelijk smal: hij vervangt geen visuele of redactionele beoordeling. De geïnstalleerde projectskills zijn hulpmiddelen voor toekomstige audits en voegen geen runtimecode aan de site toe.
