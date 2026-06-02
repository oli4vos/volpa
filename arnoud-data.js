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
  werkgebied:  "Primair regio Arnhem, Nijmegen en Doetinchem · landelijk voor ondernemers en DGA's",
  sinds:       "", // Nog in te vullen
  footerPitch: "Volpa is de financieel scheidingsspecialist bij scheiding met vermogen. Wij brengen voor beide partners het volledige financiële plaatje in kaart, zodat afspraken eerlijk, uitvoerbaar en toekomstbestendig worden.",

  /* --- Bio: één paragraaf per regel --- */
  bio: [
    "Ik ben Arnoud Vos. Als financial planner met een sterk ontwikkelde expertise in scheidingsbegeleiding help ik beide partners om rust te krijgen in een periode waarin emoties en financiële gevolgen vaak door elkaar gaan lopen.",
    "Volpa werkt niet als klassieke mediator die alleen vragen stelt en noteert. Ik adviseer actief, breng het volledige financiële plaatje in kaart en help mensen om beslissingen te nemen waar ze ook later nog achter kunnen staan.",
    "Mijn werkgebied ligt primair in de regio Arnhem, Nijmegen en Doetinchem. Voor ondernemers, DGA's en andere specialistische dossiers werk ik ook landelijk en online."
  ],

  /* --- Contact --- */
  contact: {
    telefoon:       "+31 (0)6 51 21 47 52",
    telefoonLink:   "+31651214752",          // gebruikt voor tel:-link, geen spaties
    email:          "arnoudvos@volpa.nl",
    whatsapp:       "31651214752",           // landcode + nummer, zonder + of 0
    adres:          "Martinusweg 17 — Zevenaar",
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
    kennismakingKeuzePct: 97,
    tevredenheidPct:    99,
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
