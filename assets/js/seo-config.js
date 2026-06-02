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
    organizationDescription: "Volpa begeleidt mensen bij scheiding met aandacht voor rust, overzicht en financiele duidelijkheid.",
    knowsAbout: [
      "Scheidingsbegeleiding",
      "Mediation bij scheiding",
      "Financiele begeleiding bij scheiding",
      "Alimentatie",
      "Ouderschapsplan",
      "Scheidingsconvenant",
      "Pensioen bij scheiding",
      "Woning bij scheiding"
    ]
  };

  // Pre-live instelling:
  // - GitHub Pages blijft voorlopig staging, daarom staat defaultPublicRobots op "noindex,follow".
  // - Zet bij livegang isStaging op false, wijzig siteUrl naar het live domein
  //   en draai daarna opnieuw: npm run build:static
})();
