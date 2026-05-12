document.addEventListener("DOMContentLoaded", () => {
  hydrateVolpaData();
  initMobileNav();
  initFaq();
  initReveal();
  initSmoothScroll();
  initMailtoForms();
});

function hydrateVolpaData() {
  const data = window.VOLPA;
  if (!data) {
    return;
  }

  const get = (path) => path.split(".").reduce((value, key) => value && value[key], data);

  document.querySelectorAll("[data-bind]").forEach((element) => {
    const value = get(element.getAttribute("data-bind"));
    if (value != null) {
      element.textContent = value;
    }
  });

  const nameElement = document.querySelector("[data-bind-name]");
  if (nameElement && data.naam) {
    const parts = data.naam.split(" ");
    const last = parts.pop();
    nameElement.innerHTML = `${parts.join(" ")} <em>${last}</em>`;
  }

  const bioElement = document.querySelector("[data-bind-bio]");
  if (bioElement && Array.isArray(data.bio)) {
    bioElement.innerHTML = data.bio.map((paragraph) => `<p>${paragraph}</p>`).join("");
  }

  const specsElement = document.querySelector("[data-bind-specs]");
  if (specsElement && Array.isArray(data.specialisaties)) {
    specsElement.innerHTML = data.specialisaties.map((item) => `<span class="chip">${item}</span>`).join("");
  }

  const credsElement = document.querySelector("[data-bind-creds]");
  if (credsElement && Array.isArray(data.certificeringen)) {
    credsElement.innerHTML = data.certificeringen.map((item) => {
      const meta = [item.sinds && `sinds ${item.sinds}`, item.nummer && item.nummer].filter(Boolean).join(" · ");
      return `<div class="cred"><div class="ctitle">${item.label || ""}</div><div class="cval">${item.naam || ""}</div>${meta ? `<div class="cmeta">${meta}</div>` : ""}</div>`;
    }).join("");
  }

  const opleidingenElement = document.querySelector("[data-bind-opleidingen]");
  if (opleidingenElement && Array.isArray(data.opleidingen)) {
    opleidingenElement.innerHTML = data.opleidingen.map((item) => (
      `<li><span class="y">${item.jaar}</span>${item.titel}<span class="src">${item.instelling}</span></li>`
    )).join("");
  }

  const publicatiesElement = document.querySelector("[data-bind-publicaties]");
  if (publicatiesElement && Array.isArray(data.publicaties)) {
    publicatiesElement.innerHTML = data.publicaties.map((item) => (
      `<li><span class="y">${item.jaar}</span>${item.titel}<span class="src">${item.medium}</span></li>`
    )).join("");
  }

  const phone = data.contact && data.contact.telefoon;
  const phoneLink = data.contact && (data.contact.telefoonLink || (data.contact.telefoon || "").replace(/\s|\(|\)|-/g, ""));
  document.querySelectorAll("[data-bind-telefoon]").forEach((element) => {
    if (phone) {
      element.textContent = phone;
    }
    if (phoneLink) {
      element.setAttribute("href", `tel:${phoneLink}`);
    }
  });

  const email = data.contact && data.contact.email;
  document.querySelectorAll("[data-bind-email]").forEach((element) => {
    if (email) {
      element.textContent = email;
      element.setAttribute("href", `mailto:${email}`);
    }
  });

  const whatsapp = data.contact && data.contact.whatsapp;
  document.querySelectorAll("[data-bind-whatsapp]").forEach((element) => {
    if (whatsapp) {
      element.setAttribute("href", `https://wa.me/${whatsapp}`);
    } else {
      const item = element.closest(".ci-item");
      if (item) {
        item.remove();
      }
    }
  });

  const footerList = document.querySelector("[data-bind-footer-contact]");
  if (footerList && data.contact) {
    footerList.innerHTML = [
      data.contact.telefoon && `<li><a href="tel:${phoneLink}">${data.contact.telefoon}</a></li>`,
      data.contact.email && `<li><a href="mailto:${data.contact.email}">${data.contact.email}</a></li>`,
      data.contact.adres && `<li>${data.contact.adres}</li>`,
      data.contact.bereikbaar && `<li>${data.contact.bereikbaar}</li>`
    ].filter(Boolean).join("");
  }
}

function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    if (!question || !answer) {
      return;
    }

    question.addEventListener("click", () => {
      const open = item.classList.contains("open");
      if (open) {
        answer.style.maxHeight = "0px";
        item.classList.remove("open");
        return;
      }

      answer.style.maxHeight = `${answer.scrollHeight}px`;
      item.classList.add("open");
    });
  });
}

function initMobileNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!nav || !toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  try {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll("section.block, .hero-stats, .hero-card, .content-card, .post-card, .lead-card, .proof-card, .conversion-card, .result-panel, .testimonial-panel").forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });

    window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((element) => element.classList.add("in"));
    }, 4000);
  } catch (error) {
    return;
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      window.scrollTo({ top: target.offsetTop - 64, behavior: "smooth" });
    });
  });
}

function initMailtoForms() {
  document.querySelectorAll("[data-mailto-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const fields = Array.from(form.querySelectorAll("input, textarea, select"));
      const status = form.querySelector(".form-status");
      const button = form.querySelector('button[type="submit"]');
      const email = window.VOLPA && window.VOLPA.contact && window.VOLPA.contact.email;
      const originalButtonLabel = button ? button.innerHTML : "";

      let valid = true;
      if (status) {
        status.textContent = "";
        status.classList.remove("error", "success");
      }

      fields.forEach((field) => {
        field.classList.remove("invalid");
        const next = field.nextElementSibling;
        if (next && next.classList.contains("field-error")) {
          next.remove();
        }

        const required = field.hasAttribute("required");
        const value = field.value.trim();
        const isEmail = field.type === "email";

        if ((required && !value) || (isEmail && value && !/\S+@\S+\.\S+/.test(value))) {
          valid = false;
          field.classList.add("invalid");
          const error = document.createElement("span");
          error.className = "field-error";
          error.textContent = !value ? "Dit veld is verplicht." : "Vul een geldig e-mailadres in.";
          field.insertAdjacentElement("afterend", error);
        }
      });

      if (!valid) {
        if (status) {
          status.textContent = "Controleer de gemarkeerde velden en probeer opnieuw.";
          status.classList.add("error");
        }
        return;
      }

      if (!email) {
        if (status) {
          status.textContent = "Er is geen e-mailadres ingesteld voor dit formulier.";
          status.classList.add("error");
        }
        return;
      }

      const subject = form.getAttribute("data-form-subject") || "Nieuwe aanvraag via volpa.nl";
      const body = fields
        .filter((field) => field.name && field.value.trim())
        .map((field) => `${field.name.charAt(0).toUpperCase()}${field.name.slice(1)}: ${field.value.trim()}`)
        .join("\n");

      if (button) {
        button.innerHTML = "E-mail wordt geopend…";
      }

      if (status) {
        status.textContent = "Je e-mailapp wordt geopend met een ingevuld bericht.";
        status.classList.add("success");
      }

      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.setTimeout(() => {
        if (button) {
          button.innerHTML = originalButtonLabel;
        }
      }, 1800);
    });
  });
}
