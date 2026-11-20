/* ============================================================
   VOLPA — gegevens van Arnoud
   ------------------------------------------------------------
   Dit is het enige bestand dat je hoeft te bewerken om
   Arnoud's gegevens, certificeringen, opleidingen, contact-
   informatie en cijfers op de site bij te werken.

   Alleen informatie opnemen die zeker is.
   Wat nog niet zeker of nog niet gecontroleerd is:
   - laat je leeg
   - of markeer je hieronder met een commentaar "Nog in te vullen"

   Sla op, ververs de pagina — klaar.

   Belangrijke regels:
   - Tekst staat altijd tussen "quotes"
   - Een nieuwe regel toevoegen aan een lijst? Kopieer een
     bestaand item en zet er een komma achter.
   - Probeer haakjes { } [ ] niet weg te halen.
   ============================================================ */

window.VOLPA = {

  /* --- Persoonlijk --- */
  naam:        "Arnoud Vos",
  rol:         "Financieel scheidingsspecialist · Register Erkend Scheidingsadviseur (RES®) · Certified Financial Planner (CFP®)",
  werkgebied:  "Primair regio Arnhem, Nijmegen en Doetinchem, landelijk voor complexe casuistiek · landelijk voor ondernemers en DGA's",
  sinds:       "", // Nog in te vullen
  footerPitch: "Arnoud Vos begeleidt beide partners bij de financiële keuzes rond een scheiding. Hij brengt woning, inkomen, pensioen en vermogen in kaart en rekent de gevolgen van afspraken door.",

  /* --- Bio: één paragraaf per regel --- */
  bio: [
    "Ik ben Arnoud Vos, financial planner en scheidingsadviseur. Ik help beide partners de financiële gevolgen van een scheiding te begrijpen voordat zij afspraken ondertekenen.",
    "Ik kijk naar de woning, het inkomen, pensioen, vermogen en belasting. Waar keuzes van elkaar afhangen, reken ik verschillende mogelijkheden door en bespreek ik de uitkomst met u beiden.",
    "Mijn werkgebied ligt primair in de regio Arnhem, Nijmegen en Doetinchem. Voor ondernemers en DGA’s werk ik ook landelijk. In elk traject blijf ik het vaste aanspreekpunt, ook als een advocaat, fiscalist of hypotheekadviseur nodig is."
  ],

  /* --- Contact --- */
  contact: {
    telefoon:       "+31 (0)6 51 21 47 52",
    telefoonLink:   "+31651214752",          // gebruikt voor tel:-link, geen spaties
    email:          "arnoudvos@volpa.nl",
    whatsapp:       "31651214752",           // landcode + nummer, zonder + of 0
    adres:          "Martinusweg 17, Zevenaar",
    bereikbaar:     "Ma–Vr · 09:00 – 18:00 Avonden op afspraak",
    linkedin:       "" // Nog in te vullen
  },

  /* --- Certificeringen ---
     Wordt getoond op de "Over Arnoud"-sectie.
     `label` = kort kopje, `naam` = volledige naam */
  certificeringen: [
    { label: "Beroepsregistratie", naam: "Register Erkend Scheidingsadviseur (RES®)" },
    { label: "Financieel vakmanschap", naam: "Certified Financial Planner (CFP®)" },
    { label: "Methodiek", naam: "Alimentatieberekeningen volgens Tremanormen via Split-Online.nl" },
    { label: "Fiscale begeleiding", naam: "Eigen toolkit voor belastingaangifte in het scheidingsjaar" }
  ],

  /* --- Specialisaties (chips onder Over Arnoud) --- */
  specialisaties: [
    "Scheiden met vermogen",
    "Ondernemers en DGA's",
    "Woning, uitkoop en hypotheek",
    "Pensioen en alimentatie",
    "Belastingaangifte scheidingsjaar",
    "Second opinions en nazorg"
  ],

  /* --- Cijfers in de hero --- */
  stats: {
    ervaringJaren:      null, // Nog in te vullen
    kennismakingKeuzePct: null, // Cijfer uit vragenlijst; publicatie pas na controle van meetbasis
    tevredenheidPct:    null, // Cijfer uit vragenlijst; publicatie pas na controle van meetbasis
    gesprekkenRange:    "2 inhoudelijke gesprekken + ondertekeningsafspraak"
  },

  /* --- Opleidingen ---
     Concrete instellingen en jaartallen: nog in te vullen. */
  opleidingen: [
    { jaar: "", titel: "Bedrijfskundig geschoold", instelling: "" },
    { jaar: "", titel: "Bedrijfseconomisch geschoold", instelling: "" }
  ],

  /* --- Publicaties ---
     Alleen publicaties opnemen die echt gecontroleerd zijn. */
  publicaties: [
    { jaar: "", titel: "Kennisartikelen over scheiden, vermogen, pensioen en belastingaangifte", medium: "Volpa kennisbank en blog" }
  ]

};
