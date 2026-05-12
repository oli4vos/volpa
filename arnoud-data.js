/* ============================================================
   VOLPA — gegevens van Arnoud
   ------------------------------------------------------------
   Dit is het enige bestand dat je hoeft te bewerken om
   Arnoud's gegevens, certificeringen, opleidingen, contact-
   informatie en cijfers op de site bij te werken.

   Sla op, ververs de pagina — klaar.

   Belangrijke regels:
   - Tekst staat altijd tussen "quotes"
   - Een nieuwe regel toevoegen aan een lijst? Kopieer een
     bestaand item en zet er een komma achter.
   - Probeer haakjes { } [ ] niet weg te halen.
   ============================================================ */

window.VOLPA = {

  /* --- Persoonlijk --- */
  naam:        "Arnoud Volpa",
  rol:         "Oprichter · RFEA-echtscheidings adviseur · vFAS-lid",
  werkgebied:  "Noord-Holland, Utrecht, Gelderland — online afspraken altijd mogelijk",
  sinds:       2011,

  /* --- Bio: één paragraaf per regel --- */
  bio: [
    "Ik ben Arnoud. Veertien jaar geleden begeleidde ik mijn eerste scheiding — toen al met de overtuiging dat je het op een nettere manier kunt doen dan de rechtszaal. Sindsdien heb ik honderden mensen door dit proces geholpen.",
    "Mijn aanpak is rustig, helder en eerlijk. Ik geloof niet in trucjes, ik geloof in goede gesprekken, gedegen kennis en het lef om de moeilijke onderwerpen op tafel te leggen. Ook — en juist — als het schuurt.",
    "Werkgebied: Gelderland en omstreken. Online afspraken zijn altijd mogelijk."
  ],

  /* --- Contact --- */
  contact: {
    telefoon:       "+31 (0)6 51 21 47 52",
    telefoonLink:   "+31651214752",          // gebruikt voor tel:-link, geen spaties
    email:          "arnoudvos@volpa.nl",
    whatsapp:       "31651214752",           // landcode + nummer, zonder + of 0
    adres:          "Martinusweg 17 — Zevenaar",
    bereikbaar:     "Ma–Vr · 09:00 – 18:00 Avonden op afspraak",
    linkedin:       "https://www.linkedin.com/in/arnoud-volpa"
  },

  /* --- Certificeringen ---
     Wordt getoond op de "Over Arnoud"-sectie.
     `label` = kort kopje, `naam` = volledige naam */
  certificeringen: [
    { label: "Registratie",            naam: "MfN-register Mediator",                            sinds: 2013, nummer: "MFN-2013-0814" },
    { label: "Beroepsvereniging",      naam: "vFAS-aangesloten",                                  sinds: 2014 },
    { label: "Financieel specialisme", naam: "RFEA — Register Financieel Echtscheidings Adviseur", sinds: 2016, nummer: "RFEA-1149" },
    { label: "Internationaal",         naam: "ADR Mediator Certified",                            sinds: 2018 }
  ],

  /* --- Specialisaties (chips onder Over Arnoud) --- */
  specialisaties: [
    "Familie & financiën",
    "Ondernemers in scheiding",
    "Co-ouderschap bij jonge kinderen",
    "Internationale scheidingen"
  ],

  /* --- Cijfers in de hero --- */
  stats: {
    ervaringJaren:      14,
    zonderRechterPct:   96,
    gesprekkenRange:    "4–6"
  },

  /* --- Opleidingen --- */
  opleidingen: [
    { jaar: 2011, titel: "Master Notarieel Recht",            instelling: "Radboud Universiteit Nijmegen" },
    { jaar: 2013, titel: "Opleiding tot MfN-mediator",        instelling: "Caleidoscoop Leertrajecten" },
    { jaar: 2016, titel: "Postacademische opleiding RFEA",    instelling: "Erasmus Universiteit Rotterdam" }
  ],

  /* --- Publicaties --- */
  publicaties: [
    { jaar: 2022, titel: "De stille kosten van een vechtscheiding",    medium: "FD Persoonlijk" },
    { jaar: 2024, titel: "Pensioenverevening na 2027 — wat verandert er?", medium: "Volpa blog" }
  ]

};
