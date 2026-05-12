# Blog aanleveren

De blog werkt nu vanuit één bestand:

`content/blog-posts.txt`

## Makkelijkste route

1. Open `blog-aanleveren.html`
2. Vul titel, datum, categorie, samenvatting en tekst in
3. Klik op `Genereer blogblok`
4. Gebruik daarna `Kopieer blogblok` of `Download .txt`
5. Plak die output onderaan `content/blog-posts.txt`
6. Commit en push de wijziging

## Tekstregels

- Gebruik een lege regel tussen alinea's
- Gebruik `##` voor een tussenkop
- Gebruik `-` voor een opsomming
- De `Slug` wordt automatisch gemaakt uit de titel
- Zet `Uitgelicht` alleen op `ja` als dit artikel bovenaan het blogoverzicht moet staan

## Voorbeeld

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
