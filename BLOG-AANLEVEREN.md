# Blog Toevoegen Aan Volpa

Deze website werkt voor blogs vanuit één centraal bestand:

`content/blog-posts.txt`

Dat betekent:

- je hoeft geen HTML te schrijven
- je hoeft geen code in `blog.html` of `blogpost.html` aan te passen
- elk nieuw blogartikel komt uit hetzelfde vaste format
- de overzichtspagina en de losse blogpagina worden automatisch gevuld

De makkelijkste ingang is:

`blog-aanleveren.html`

Daar kan iemand zonder technische kennis gewoon tekst invullen of plakken.

## Hoe Het Systeem Werkt

Er zijn 3 onderdelen:

1. `blog-aanleveren.html`
   Hier vul je een blog in of plak je bestaande tekst.
2. `content/blog-posts.txt`
   Hier worden alle blogartikelen opgeslagen in één vast tekstformaat.
3. De website
   `blog.html` en `blogpost.html` lezen dat bestand automatisch uit.

Kort gezegd:

1. iemand maakt een blog-aanlevering
2. jij zet die aanlevering in `content/blog-posts.txt`
3. je pusht naar GitHub
4. GitHub Pages publiceert de wijziging automatisch

## Snelste Route Voor Je Vader

Gebruik deze route als je vader geen code of bestanden wil openen.

1. Open `blog-aanleveren.html` in de browser.
2. Vul bij `Titel` de titel van het artikel in.
3. Plak bij `Volledige tekst` de hele blogtekst.
4. Klik op `Open e-mailconcept` als hij het direct per mail wil versturen.
5. Of klik op `Download .txt` als hij liever een tekstbestand wil meesturen.
6. Of klik op `Kopieer blogblok` als jij het meteen wilt plakken.

Wat automatisch gebeurt:

- de datum wordt standaard op vandaag gezet
- de categorie wordt standaard `Algemeen`
- de samenvatting wordt automatisch gemaakt
- de linknaam van het artikel wordt automatisch gemaakt
- de preview laat ongeveer zien hoe het artikel op de site komt

Dit betekent dat je vader in de praktijk meestal alleen dit hoeft te doen:

1. titel invullen
2. tekst plakken
3. op de knop drukken

## Eenvoudigste Publicatieroute Voor Jou

Als jij daarna het artikel live wilt zetten, gebruik dan deze route:

1. Open het bestand `content/blog-posts.txt`.
2. Scroll helemaal naar beneden.
3. Plak daar het nieuwe blogblok onderaan.
4. Laat tussen het vorige artikel en het nieuwe artikel een lege regel staan als dat nodig is.
5. Sla het bestand op.
6. Commit en push de wijziging naar GitHub.

Na de push:

- GitHub Pages bouwt de site opnieuw
- meestal is het artikel binnen een paar minuten live
- het artikel verschijnt automatisch op `blog.html`
- de losse artikelpagina werkt automatisch via `blogpost.html?slug=...`

## Publiceren Via Terminal

Als je lokaal werkt en daarna via Git publiceert, gebruik dan:

```bash
git add content/blog-posts.txt
git commit -m "Add new blog post"
git push origin main
```

Daarna wacht je meestal 1 tot 3 minuten tot GitHub Pages heeft ververst.

## Publiceren Via GitHub In De Browser

Als je niet lokaal wilt werken, kan het ook direct in GitHub.

1. Open de repository `volpa` op GitHub.
2. Open het bestand `content/blog-posts.txt`.
3. Klik op het potloodje `Edit`.
4. Plak het nieuwe blogblok onderaan het bestand.
5. Klik op `Commit changes`.
6. Commit direct naar `main`.

Ook dan publiceert GitHub Pages het artikel daarna automatisch.

## Welke Knop Gebruik Je Wanneer

Gebruik `Open e-mailconcept` als:

- iemand het artikel direct naar jou wil mailen
- die persoon niets wil kopiëren of downloaden
- je de aanlevering liever eerst leest voor publicatie

Gebruik `Download .txt` als:

- iemand een bestand wil meesturen
- de blogtekst lang is
- je de aanlevering later wilt bewaren of doorsturen

Gebruik `Kopieer blogblok` als:

- jij het artikel meteen zelf in `content/blog-posts.txt` wilt plakken
- je snel lokaal wilt publiceren

## Optionele Details Aanpassen

Op `blog-aanleveren.html` zit ook een blok:

`Optionele details aanpassen`

Dat hoef je meestal niet te gebruiken, maar het kan wel.

Daar kun je aanpassen:

- `Datum`
- `Categorie`
- `Korte samenvatting`
- `Uitgelicht op overzicht`

Gebruik `Uitgelicht op overzicht` alleen als dit artikel bovenaan `blog.html` moet komen te staan.

Laat je dit op `Nee` staan, dan wordt het artikel gewoon normaal toegevoegd aan de lijst.

## Hoe De Tekst Het Best Kan Worden Aangeleverd

De veiligste en simpelste manier is gewone platte tekst.

Dat werkt goed:

- normale alinea's
- lege regel tussen alinea's
- eenvoudige tussenkoppen
- korte opsommingen

De generator begrijpt ook deze extra notatie:

- gebruik `##` voor een tussenkop
- gebruik `-` voor een opsomming

Voorbeeld:

```text
Dit is de eerste alinea.

Dit is de tweede alinea.

## Wat kost het ongeveer?

- mediation
- financieel advies
- juridische afwikkeling
```

## Wat Je Liever Niet Doet

Doe dit liever niet:

- handmatig rommelen in `blog.html`
- handmatig nieuwe HTML-pagina's maken voor elk artikel
- de structuur van `content/blog-posts.txt` aanpassen
- per ongeluk tekst bovenin een bestaand artikel plakken
- het scheidingsblok `=== POST ===` weghalen

Het systeem werkt juist goed omdat elk artikel exact dezelfde structuur gebruikt.

## Vast Format Van Een Blogblok

Elk artikel in `content/blog-posts.txt` gebruikt dit format:

```text
=== POST ===
Titel: Wat kost een scheiding echt?
Datum: 2026-05-10
Categorie: Kosten
Slug: wat-kost-een-scheiding-echt
Samenvatting: Korte samenvatting van 1 of 2 zinnen.
Uitgelicht: nee

Inhoud:
Eerste alinea.

## Tussenkop

- eerste punt
- tweede punt
```

Belangrijk:

- `=== POST ===` markeert het begin van een nieuw artikel
- `Slug` moet uniek zijn
- `Uitgelicht` is meestal `nee`
- onder `Inhoud:` komt de volledige tekst

## Wat Automatisch Wordt Gevormd

Als je de aanleverpagina gebruikt en velden leeg laat, wordt dit automatisch gedaan:

- titel blijft exact wat jij invult
- datum wordt automatisch vandaag
- categorie wordt automatisch `Algemeen`
- samenvatting wordt automatisch uit de tekst gehaald
- slug wordt automatisch gemaakt uit de titel

Een titel zoals:

`Wat kost een scheiding echt?`

wordt automatisch:

`wat-kost-een-scheiding-echt`

## Controle Voor Je Publiceert

Loop dit even kort na voordat je pusht:

1. Staat het nieuwe blok helemaal onderaan `content/blog-posts.txt`?
2. Begint het blok met `=== POST ===`?
3. Heeft het een titel?
4. Heeft het inhoud onder `Inhoud:`?
5. Staat `Uitgelicht` alleen op `ja` als dat echt de bedoeling is?
6. Heb je opgeslagen?
7. Heb je gecommit en gepusht?

## Controleren Of Het Live Staat

Na het pushen kun je dit controleren:

1. Open `https://oli4vos.github.io/volpa/blog.html`
2. Kijk of het nieuwe artikel in de lijst staat
3. Klik het artikel open
4. Controleer of titel, samenvatting en inhoud goed tonen

Als je niets ziet:

- wacht 1 tot 3 minuten
- refresh de pagina
- test eventueel in een privévenster

## Aanbevolen Werkwijze In De Praktijk

Voor jullie situatie is dit waarschijnlijk het makkelijkst:

1. je vader schrijft de tekst
2. hij opent `blog-aanleveren.html`
3. hij vult titel en tekst in
4. hij klikt op `Open e-mailconcept` of `Download .txt`
5. jij ontvangt de aanlevering
6. jij plakt die in `content/blog-posts.txt`
7. jij doet `git add`, `git commit`, `git push`
8. het artikel komt live

Dat is de meest stabiele route, omdat:

- hij geen code hoeft te zien
- jij controle houdt over wat live gaat
- de site technisch schoon blijft

## Als Je Wilt Opschalen

Als je later vaker blogs wilt plaatsen, kun je dit systeem nog verder uitbreiden met:

- een echt formulier dat direct naar jou mailt
- automatische publicatie zonder handmatig plakken
- een CMS-achtige invoer
- afbeeldingen per blog
- concept/publicatie-status

Voor nu is de huidige opzet bewust simpel, snel en veilig.
