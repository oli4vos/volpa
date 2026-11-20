# Ontwerpaudit: Volpa als deskundige dienstverlener

**20 november 2026.** Doel: de Atelier-variant laten aanvoelen als een gevestigde, persoonlijke adviespraktijk. De bestaande statische architectuur en de schakelaar met de huidige stijl blijven intact.

## Wat de bronnen ondersteunen

De bestaande [Volpa-site](https://www.volpa.nl/) gebruikt een zandkleurige navigatie, een koperbruin accent, donkerbruine tekst en een eigen woordmerk. De koude, blauwgroene Atelier-variant sloot daar niet op aan. Voor een bezoeker is herkenning van dezelfde praktijk een concreet vertrouwenssignaal.

[Nielsen Norman Group](https://www.nngroup.com/articles/trustworthy-design/) beschrijft vier factoren voor geloofwaardigheid: ontwerpkwaliteit, openheid over de organisatie, inhoudelijke volledigheid en verbinding met externe bronnen. Hun [onderzoek naar trust en credibility](https://www.nngroup.com/reports/ecommerce-ux-trust-and-credibility/) benoemt ook professionele afwerking, bedrijfsinformatie, expertise en voldoende detail over de dienst. Dit zijn richtinggevende gebruikersonderzoeken, geen garantie dat één kleur of lettertype vertrouwen veroorzaakt.

De [Advieskeuze-pagina van Volpa](https://www.advieskeuze.nl/advies/6905ar/volpa-begeleiding-bij-scheiding/beoordelingen) bevat een controleerbare beoordeling van Henry van 23 september 2025. De quote op de homepage is een kort, exact fragment en linkt naar de bron. Er zijn geen nieuwe percentages, kwaliteitsclaims of casussen bedacht.

## Audit van de lokale Atelier-versie vóór deze aanpassing

- Het blauwgroen, grijswit en de rechte, zware typografie kwamen niet terug op volpa.nl. De merkherkenning ontbrak.
- De hero was inhoudelijk helder maar had op desktop een grote lege rechterhelft. Daardoor voelde de pagina als een onvoltooid typografisch skelet.
- Diensten stonden als eenvoudige regels op een lichte achtergrond. De belangrijkste commerciële inhoud kreeg nauwelijks meer gewicht dan de omliggende uitleg.
- Registraties, prijs en Arnoud waren aanwezig, maar de controleerbare gegevens waren niet direct samen zichtbaar in de eerste schermen.
- De foto blijft een naamplaceholder tot een geschikte echte portretfoto wordt aangeleverd. Een gegenereerd of onduidelijk portret zou juist afbreuk doen aan vertrouwen.

## Uitgevoerde richting

1. Het bestaande Volpa-woordmerk is als klein geoptimaliseerd PNG-bestand in de Atelier-navigatie en footer gebruikt.
2. De Atelier-kleuren zijn afgeleid van de zichtbare huisstijl: warm wit `#faf7f2`, zand `#e2d3c0`, donkerbruin `#352b27` en koperbruin `#8b4719` voor de hoofdactie. De knopkleur met witte tekst haalt ongeveer 7:1 contrast.
3. Grote koppen gebruiken Newsreader; navigatie, uitleg en formulieren blijven in Geist. De serif geeft de adviespraktijk een eigen stem zonder de leesbaarheid van de gewone tekst te beperken.
4. De hero combineert de concrete dienstbelofte met tarief, registraties en één gelinkte, echte beoordeling. De beoordeling staat als tekst in de compositie, zonder zwevende kaart of pseudo-statistiek.
5. Het dienstengedeelte heeft een donkere achtergrond met rustige regels en duidelijke links. Zo krijgt het aanbod hiërarchie, terwijl de inhoud direct scanbaar blijft.
6. Binnenpagina's delen dezelfde navigatie, paginatoetsen, letterkeuze en kleuren. De bestaande stijl blijft via de schakelaar beschikbaar.

## Controlepunten

- De lokale pagina is op desktop en op 390px breed visueel bekeken; beide breedtes hebben geen horizontale overflow.
- Gecontroleerd zijn de homepage, blog, gegenereerd artikel, blogpreview, kennisbank en admin. Formulieren en de stijlwisselaar behouden hun bestaande gedrag.
- `npm run build:static`, `npm run audit:style`, `npm run validate:forms`, `node --check` en `git diff --check` zijn uitgevoerd.
- Bij het plaatsen van een echte portretfoto moet de foto opnieuw op kwaliteit, uitsnede en toestemming worden beoordeeld.
