(function () {
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const VALID_MODES = new Set(["mailto", "form-endpoint", "disabled", "test"]);
  const DEFAULTS = {
    mode: "mailto",
    provider: "none",
    endpoint: "",
    contactEmail: "",
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
  };

  function getConfig() {
    const configured = window.VOLPA_FORMS || {};
    const contactEmail = configured.contactEmail || (window.VOLPA && window.VOLPA.contact && window.VOLPA.contact.email) || "";
    const merged = Object.assign({}, DEFAULTS, configured, {
      fieldLabels: Object.assign({}, DEFAULTS.fieldLabels, configured.fieldLabels || {}),
      contactEmail
    });

    if (!VALID_MODES.has(merged.mode)) {
      merged.mode = DEFAULTS.mode;
    }

    if (!Array.isArray(merged.allowedFormNames) || !merged.allowedFormNames.length) {
      merged.allowedFormNames = DEFAULTS.allowedFormNames.slice();
    }

    return merged;
  }

  function init() {
    document.querySelectorAll("[data-volpa-form], [data-mailto-form]").forEach((form) => {
      if (form.dataset.volpaReady === "true") {
        return;
      }

      form.dataset.volpaReady = "true";
      applyQueryPrefill(form);
      form.addEventListener("submit", handleSubmit);
      form.addEventListener("input", clearFieldErrorOnInput);
      form.addEventListener("change", clearFieldErrorOnInput);
    });
  }

  function clearFieldErrorOnInput(event) {
    const field = event.target;
    if (!(field instanceof HTMLElement)) {
      return;
    }

    clearFieldError(field);
    const status = field.form && field.form.querySelector(".form-status");
    if (status && status.classList.contains("error")) {
      status.textContent = "";
      status.classList.remove("error");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement) || form.dataset.submitting === "true") {
      return;
    }

    const config = getConfig();
    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton ? submitButton.innerHTML : "";
    const formName = normalizeFormName(form, config);
    const requestType = getRequestType(form);
    const mode = resolveMode(form, config);
    const provider = resolveProvider(form, config);

    clearFormErrors(form);

    if (isHoneypotTriggered(form)) {
      setStatus(form, "Dank voor uw bericht. Als uw aanvraag geldig is, neemt Volpa contact op.", "success");
      debugLog(config, "honeypot_blocked", { formName, mode, provider });
      return;
    }

    const invalidFields = validateForm(form, config);
    if (invalidFields.length) {
      setStatus(form, "Controleer de gemarkeerde velden en probeer opnieuw.", "error");
      invalidFields[0].focus();
      return;
    }

    form.dataset.submitting = "true";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
    }

    const complete = () => {
      delete form.dataset.submitting;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
        submitButton.innerHTML = originalLabel;
      }
    };

    if (mode === "disabled") {
      setStatus(form, "Dit formulier is tijdelijk niet beschikbaar. Neem telefonisch of per e-mail contact op.", "error");
      complete();
      return;
    }

    if (mode === "test") {
      debugLog(config, "test_mode_submit", { formName, mode, provider, requestType });
      trackSubmission(formName, requestType, mode);
      setStatus(form, "Testmodus actief. De aanvraag wordt niet echt verzonden.", "success");
      window.setTimeout(() => {
        complete();
        window.location.href = buildThankYouUrl(config.thankYouUrl, formName);
      }, 250);
      return;
    }

    if (mode === "form-endpoint") {
      submitToEndpoint(form, config, { formName, requestType, provider })
        .then(() => {
          debugLog(config, "endpoint_submit_success", { formName, mode, provider, requestType });
          trackSubmission(formName, requestType, mode);
          window.location.href = buildThankYouUrl(config.thankYouUrl, formName);
        })
        .catch((error) => {
          setStatus(form, resolveEndpointErrorMessage(error), "error");
          debugLog(config, "endpoint_submit_error", {
            formName,
            mode,
            provider,
            requestType,
            errorCode: error && error.code ? error.code : "unknown"
          });
          complete();
        });
      return;
    }

    const email = config.contactEmail;
    if (!email) {
      setStatus(form, "Er is nog geen ontvangstadres ingesteld. Neem rechtstreeks contact op met Volpa.", "error");
      complete();
      return;
    }

    const subject = buildSubject(form, config, requestType);
    const mailto = buildMailtoLink(form, email, subject, formName, config);

    try {
      if (submitButton) {
        submitButton.innerHTML = "Mailprogramma openen…";
      }

      window.location.href = mailto;
      debugLog(config, "mailto_opened", { formName, mode, provider, requestType });
      trackSubmission(formName, requestType, mode);
      setStatus(form, "Als uw mailprogramma is geopend, kunt u de aanvraag daar verzenden. Voor een uitgebreidere vraag kunt u ook de contactpagina gebruiken.", "success");
      window.setTimeout(complete, 1800);
    } catch (error) {
      setStatus(form, "Het mailprogramma kon niet worden geopend. Neem rechtstreeks contact op per e-mail of telefoon.", "error");
      debugLog(config, "mailto_error", { formName, mode, provider, requestType, errorCode: "mailto_failed" });
      complete();
    }
  }

  function resolveMode(form, config) {
    const requested = `${form.getAttribute("data-form-mode") || config.mode || DEFAULTS.mode}`.trim();
    return VALID_MODES.has(requested) ? requested : DEFAULTS.mode;
  }

  function resolveProvider(form, config) {
    return `${form.getAttribute("data-form-provider") || config.provider || "none"}`.trim().toLowerCase();
  }

  function normalizeFormName(form, config) {
    const requested = `${form.getAttribute("data-form-name") || form.getAttribute("data-volpa-form") || "homepage"}`
      .trim()
      .toLowerCase();
    const aliases = {
      "contact-intake": "contact",
      "lead-intake": "lead"
    };
    const resolved = aliases[requested] || requested;
    return config.allowedFormNames.includes(resolved) ? resolved : resolved;
  }

  function validateForm(form) {
    const invalidFields = [];
    const fields = Array.from(form.querySelectorAll("input, textarea, select"));

    fields.forEach((field) => {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) {
        return;
      }

      if (field.disabled || field.type === "hidden" || field.hasAttribute("data-volpa-honeypot")) {
        return;
      }

      const value = field.type === "checkbox" ? field.checked : field.value.trim();
      const required = field.hasAttribute("required");

      if (required && !value) {
        showFieldError(field, field.type === "checkbox" ? "Bevestig dat Volpa contact met u mag opnemen." : "Dit veld is verplicht.");
        invalidFields.push(field);
        return;
      }

      if (field.type === "email" && value && !EMAIL_PATTERN.test(field.value.trim())) {
        showFieldError(field, "Vul een geldig e-mailadres in.");
        invalidFields.push(field);
      }
    });

    return invalidFields;
  }

  async function submitToEndpoint(form, config, context) {
    const endpoint = `${form.getAttribute("data-form-endpoint") || config.endpoint || ""}`.trim();
    if (!endpoint) {
      throw createSubmitError("missing-endpoint");
    }

    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutMs = Number(config.requestTimeoutMs) > 0 ? Number(config.requestTimeoutMs) : DEFAULTS.requestTimeoutMs;
    const timeoutId = controller ? window.setTimeout(() => controller.abort(), timeoutMs) : null;
    const payload = buildEndpointPayload(form, config, context);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller ? controller.signal : undefined
      });

      if (!response.ok) {
        throw createSubmitError("http-error", { status: response.status });
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        let json;
        try {
          json = await response.json();
        } catch (error) {
          throw createSubmitError("unexpected-response");
        }

        if (json && json.errors && json.errors.length) {
          throw createSubmitError("http-error", { status: response.status });
        }
      } else if (response.status !== 204) {
        const text = await response.text();
        if (text.trim() && text.trim().startsWith("<")) {
          throw createSubmitError("unexpected-response");
        }
      }
    } catch (error) {
      if (error && error.name === "AbortError") {
        throw createSubmitError("timeout");
      }

      if (error && error.code) {
        throw error;
      }

      throw createSubmitError("network-error");
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    }
  }

  function buildEndpointPayload(form, config, context) {
    if (context.provider === "formspree") {
      return buildFormspreePayload(form, config, context);
    }

    const mapped = mapFields(form);
    return {
      form_name: context.formName,
      request_type: context.requestType,
      preferred_contact: mapped.preferredContact || "",
      name: mapped.name || "",
      email: mapped.email || "",
      phone: mapped.phone || "",
      message: mapped.message || "",
      source_page: getSourcePage(),
      _subject: buildSubject(form, config, context.requestType)
    };
  }

  function buildFormspreePayload(form, config, context) {
    const mapped = mapFields(form);
    return {
      form_name: context.formName,
      request_type: context.requestType,
      preferred_contact: mapped.preferredContact || "",
      name: mapped.name || "",
      email: mapped.email || "",
      phone: mapped.phone || "",
      message: mapped.message || "",
      source_page: getSourcePage(),
      _subject: buildSubject(form, config, context.requestType)
    };
  }

  function mapFields(form) {
    const getValue = (selector) => {
      const field = form.querySelector(selector);
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
        return `${field.value || ""}`.trim();
      }
      return "";
    };

    const firstName = getValue('[name="voornaam"]');
    const lastName = getValue('[name="achternaam"]');

    return {
      name: getValue('[name="name"]') || [firstName, lastName].filter(Boolean).join(" ") || getValue('[name="naam"]'),
      email: getValue('[name="email"]'),
      phone: getValue('[name="phone"]') || getValue('[name="telefoon"]'),
      requestType: getValue('[name="requestType"]') || getValue('[name="type_aanvraag"]') || getValue('[name="type_vraag"]') || getValue('[name="onderwerp"]'),
      preferredContact: getValue('[name="preferredContact"]') || getValue('[name="voorkeurscontact"]'),
      message: getValue('[name="message"]') || getValue('[name="toelichting"]') || getValue('[name="bericht"]') || getValue('[name="situatie"]')
    };
  }

  function buildSubject(form, config, requestType) {
    const formSubject = form.getAttribute("data-form-subject");
    const base = formSubject || config.defaultSubject || DEFAULTS.defaultSubject;
    const suffix = requestType && requestType !== "onbekend" ? ` (${requestType})` : "";
    return `${base}${suffix}`;
  }

  function buildMailtoLink(form, email, subject, formName, config) {
    const lines = [];
    const pageLabel = getSourcePage();

    lines.push(`Formulier: ${formName}`);
    lines.push(`Pagina: ${pageLabel}`);
    lines.push("");

    const mapped = mapFields(form);
    const orderedFields = [
      ["name", mapped.name],
      ["email", mapped.email],
      ["phone", mapped.phone],
      ["requestType", mapped.requestType],
      ["preferredContact", mapped.preferredContact],
      ["message", mapped.message]
    ];

    orderedFields.forEach(([key, value]) => {
      if (!value) {
        return;
      }

      const label = config.fieldLabels[key] || key;
      lines.push(`${label}: ${value}`);
    });

    return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  function setStatus(form, message, tone) {
    const status = form.querySelector(".form-status");
    if (!status) {
      return;
    }

    status.textContent = message;
    status.classList.remove("error", "success");
    if (tone) {
      status.classList.add(tone);
    }
  }

  function showFieldError(field, message) {
    const container = field.closest(".field") || field.parentElement;
    if (!container) {
      return;
    }

    field.classList.add("invalid");
    field.setAttribute("aria-invalid", "true");

    const error = document.createElement("span");
    error.className = "field-error";
    error.textContent = message;

    const errorId = `${field.name || field.id || "field"}-error`;
    error.id = errorId;
    field.setAttribute("aria-describedby", errorId);
    container.appendChild(error);
  }

  function clearFieldError(field) {
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) {
      return;
    }

    field.classList.remove("invalid");
    field.removeAttribute("aria-invalid");
    if (field.getAttribute("aria-describedby") && field.getAttribute("aria-describedby").endsWith("-error")) {
      field.removeAttribute("aria-describedby");
    }

    const container = field.closest(".field") || field.parentElement;
    if (!container) {
      return;
    }

    container.querySelectorAll(".field-error").forEach((error) => error.remove());
  }

  function clearFormErrors(form) {
    form.querySelectorAll(".field-error").forEach((error) => error.remove());
    form.querySelectorAll(".invalid").forEach((field) => {
      field.classList.remove("invalid");
      field.removeAttribute("aria-invalid");
      if (field.getAttribute("aria-describedby") && field.getAttribute("aria-describedby").endsWith("-error")) {
        field.removeAttribute("aria-describedby");
      }
    });

    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent = "";
      status.classList.remove("error", "success");
    }
  }

  function isHoneypotTriggered(form) {
    const honeypot = form.querySelector("[data-volpa-honeypot]");
    if (!honeypot || !(honeypot instanceof HTMLInputElement)) {
      return false;
    }

    return Boolean(honeypot.value.trim());
  }

  function getRequestType(form) {
    const mapped = mapFields(form);
    return mapped.requestType || "onbekend";
  }

  function trackSubmission(formName, requestType, mode) {
    window.VolpaAnalytics?.track?.("lead_submit", {
      form_name: formName,
      request_type: requestType,
      mode
    });
  }

  function buildThankYouUrl(basePath, formName) {
    const url = new URL(basePath, window.location.href);
    url.searchParams.set("form", formName);
    return url.toString();
  }

  function applyQueryPrefill(form) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    if (type) {
      form.querySelectorAll('select[name="type_aanvraag"], select[name="type_vraag"], select[name="requestType"]').forEach((field) => {
        if (!(field instanceof HTMLSelectElement)) {
          return;
        }

        const option = Array.from(field.options).find((item) => item.value === type);
        if (option) {
          field.value = type;
        }
      });
    }
  }

  function getSourcePage() {
    return window.location.pathname.replace(/^\//, "") || "index.html";
  }

  function createSubmitError(code, extra) {
    const error = new Error(code);
    error.code = code;
    if (extra) {
      Object.assign(error, extra);
    }
    return error;
  }

  function resolveEndpointErrorMessage(error) {
    switch (error && error.code) {
      case "missing-endpoint":
        return "Er is nog geen formulierendpoint ingesteld. Gebruik voorlopig e-mail of neem telefonisch contact op.";
      case "timeout":
        return "Het verzenden duurde te lang. Probeer het later opnieuw of neem rechtstreeks contact op.";
      case "http-error":
        return "De aanvraag kon niet worden verwerkt. Controleer uw invoer of probeer het later opnieuw.";
      case "unexpected-response":
        return "Het formulier gaf een onverwachte reactie terug. Probeer het later opnieuw of neem rechtstreeks contact op.";
      case "network-error":
      default:
        return "Verzenden lukte niet door een netwerkfout. Probeer het later opnieuw of neem rechtstreeks contact op.";
    }
  }

  function debugLog(config, eventName, details) {
    if (!config.enableDebugLogging) {
      return;
    }

    const payload = Object.assign({ event: eventName }, details || {});
    try {
      console.info("[VolpaForms]", payload);
    } catch (error) {
      return;
    }
  }

  window.VolpaForms = {
    init
  };
})();
