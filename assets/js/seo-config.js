(function () {
  const siteUrl = "https://oli4vos.github.io/volpa/";
  const isStaging = true;
  const defaultPublicRobots = isStaging ? "noindex,follow" : "index,follow";

  window.VOLPA_SEO_CONFIG = {
    siteUrl,
    isStaging,
    defaultPublicRobots,
    siteName: "Volpa",
    defaultOgImagePath: "assets/img/og-default.svg",
    personName: "Arnoud Vos",
    organizationDescription: "Volpa brengt bij scheiding met vermogen voor beide partners woning, pensioen, onderneming, alimentatie en fiscale gevolgen in kaart.",
    knowsAbout: [
      "Scheidingsbegeleiding",
      "Financieel scheidingsadvies",
      "Financiele begeleiding bij scheiding",
      "Alimentatie",
      "Ouderschapsplan",
      "Scheidingsconvenant",
      "Pensioen bij scheiding",
      "Woning bij scheiding",
      "Ondernemer en scheiding",
      "Belastingaangifte scheidingsjaar"
    ]
  };

  // Pre-live instelling:
  // - GitHub Pages blijft voorlopig staging, daarom staat defaultPublicRobots op "noindex,follow".
  // - Zet bij livegang isStaging op false, wijzig siteUrl naar het live domein
  //   en draai daarna opnieuw: npm run build:static
})();
