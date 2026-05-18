(function () {
  // Later overschakelen naar Formspree:
  // mode: "form-endpoint"
  // provider: "formspree"
  // endpoint: "https://formspree.io/f/FORM_ID"
  window.VOLPA_FORMS = Object.assign({
    mode: "mailto",
    provider: "none",
    endpoint: "",
    contactEmail: "arnoudvos@volpa.nl",
    defaultSubject: "Nieuwe aanvraag via Volpa.nl",
    thankYouUrl: "bedankt.html",
    requestTimeoutMs: 10000,
    enableDebugLogging: false,
    allowedFormNames: ["contact", "lead", "homepage"],
    fieldLabels: {
      name: "Naam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      requestType: "Type aanvraag",
      preferredContact: "Voorkeurscontact",
      message: "Toelichting"
    }
  }, window.VOLPA_FORMS || {});
})();
