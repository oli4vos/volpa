document.addEventListener("DOMContentLoaded", () => {
  initStyleSwitcher();
  hydrateVolpaData();
  initMobileNav();
  initFaq();
  initReveal();
  initSmoothScroll();
  initMailtoForms();
  initBlogSystem();
});

const BLOG_SOURCE = "content/blog-posts.txt";
let blogPostsPromise = null;

function initStyleSwitcher() {
  const styles = Array.isArray(window.VOLPA_THEME_STYLES) && window.VOLPA_THEME_STYLES.length
    ? window.VOLPA_THEME_STYLES
    : [{ id: "main", name: "Basis", href: "assets/css/main.css" }];
  const storageKey = window.VOLPA_THEME_STORAGE_KEY || "volpa-active-style";
  const link = ensureStyleLink(styles);

  if (!link || styles.length < 2 || document.querySelector("[data-style-switcher]")) {
    return;
  }

  injectStyleSwitcherStyles();

  const switcher = document.createElement("div");
  switcher.className = "style-switcher";
  switcher.setAttribute("data-style-switcher", "");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "style-switcher-trigger";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "true");

  const panel = document.createElement("div");
  panel.className = "style-switcher-panel";
  panel.hidden = true;

  const title = document.createElement("div");
  title.className = "style-switcher-title";
  title.textContent = "Kies design";
  panel.appendChild(title);

  const optionButtons = styles.map((style) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "style-switcher-option";
    button.dataset.styleId = style.id;
    button.innerHTML = `<span>${escapeHtml(style.name)}</span><small>${escapeHtml(style.href.split("/").pop())}</small>`;
    button.addEventListener("click", () => {
      applyStyle(style.id, styles, link, storageKey);
      syncStyleSwitcherState(styles, link, trigger, optionButtons);
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    });
    panel.appendChild(button);
    return button;
  });

  trigger.addEventListener("click", () => {
    const open = panel.hidden;
    panel.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target)) {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  switcher.appendChild(trigger);
  switcher.appendChild(panel);
  document.body.appendChild(switcher);

  syncStyleSwitcherState(styles, link, trigger, optionButtons);
}

function ensureStyleLink(styles) {
  let link = document.getElementById("site-stylesheet");
  if (link) {
    return link;
  }

  link = document.createElement("link");
  link.rel = "stylesheet";
  link.id = "site-stylesheet";
  link.href = styles[0].href;
  link.setAttribute("data-style-id", styles[0].id);
  document.head.appendChild(link);
  return link;
}

function applyStyle(styleId, styles, link, storageKey) {
  const active = styles.find((style) => style.id === styleId) || styles[0];
  link.href = active.href;
  link.setAttribute("data-style-id", active.id);

  try {
    window.localStorage.setItem(storageKey, active.id);
  } catch (error) {
    return;
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", active.id);
    window.history.replaceState({}, "", url);
  } catch (error) {
    return;
  }
}

function syncStyleSwitcherState(styles, link, trigger, optionButtons) {
  const activeId = link.getAttribute("data-style-id") || styles[0].id;
  const active = styles.find((style) => style.id === activeId) || styles[0];

  trigger.innerHTML = `<span>Design</span><span aria-hidden="true">▾</span>`;
  trigger.setAttribute("aria-label", `Actief design: ${active.name}`);
  trigger.setAttribute("title", `Actief design: ${active.name}`);

  optionButtons.forEach((button) => {
    const isActive = button.dataset.styleId === active.id;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function injectStyleSwitcherStyles() {
  if (document.getElementById("style-switcher-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "style-switcher-styles";
  style.textContent = `
    .style-switcher {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 120;
      font-family: "Geist", -apple-system, system-ui, sans-serif;
    }

    .style-switcher-trigger,
    .style-switcher-option {
      appearance: none;
      border: 1px solid rgba(20, 24, 28, 0.18);
      background: rgba(252, 248, 240, 0.96);
      color: #14181c;
      box-shadow: 0 16px 40px -24px rgba(20, 24, 28, 0.42);
      -webkit-backdrop-filter: blur(14px);
      backdrop-filter: blur(14px);
    }

    .style-switcher-trigger {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      min-height: 40px;
      padding: 0 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.02em;
      cursor: pointer;
    }

    .style-switcher-panel {
      position: absolute;
      right: 0;
      bottom: calc(100% + 8px);
      width: min(240px, calc(100vw - 32px));
      max-height: min(68vh, 460px);
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-gutter: stable;
      padding: 12px;
      border-radius: 18px;
      border: 1px solid rgba(20, 24, 28, 0.12);
      background: rgba(252, 248, 240, 0.98);
      box-shadow: 0 20px 48px -30px rgba(20, 24, 28, 0.38);
      -webkit-backdrop-filter: blur(18px);
      backdrop-filter: blur(18px);
    }

    .style-switcher-title {
      margin-bottom: 8px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #6a6b6c;
    }

    .style-switcher-option {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 3px;
      width: 100%;
      padding: 12px 14px;
      border-radius: 14px;
      cursor: pointer;
      text-align: left;
      box-shadow: none;
    }

    .style-switcher-option + .style-switcher-option {
      margin-top: 8px;
    }

    .style-switcher-option small {
      font-size: 11px;
      color: #6a6b6c;
      letter-spacing: 0.04em;
    }

    .style-switcher-option.active {
      border-color: rgba(20, 24, 28, 0.4);
      background: #14181c;
      color: #fcfaf3;
    }

    .style-switcher-option.active small {
      color: rgba(252, 250, 243, 0.72);
    }

    @media (max-width: 720px) {
      .style-switcher {
        right: 12px;
        bottom: calc(12px + env(safe-area-inset-bottom));
      }

      .style-switcher-panel {
        width: min(220px, calc(100vw - 24px));
        max-height: min(64vh, 400px);
      }

      .style-switcher-trigger {
        min-height: 38px;
        padding: 0 12px;
        font-size: 12px;
      }
    }
  `;

  document.head.appendChild(style);
}

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

function initBlogSystem() {
  initBlogGenerator();

  const blogIndex = document.querySelector("[data-blog-featured], [data-blog-list]");
  const blogPostPage = document.querySelector("[data-blog-post-hero], [data-blog-post-content], [data-blog-related]");

  if (!blogIndex && !blogPostPage) {
    return;
  }

  getBlogPosts()
    .then((posts) => {
      if (blogIndex) {
        renderBlogIndex(posts);
      }

      if (blogPostPage) {
        renderBlogPostPage(posts);
      }
    })
    .catch(() => {
      renderBlogLoadError();
    });
}

function getBlogPosts() {
  if (!blogPostsPromise) {
    blogPostsPromise = fetch(BLOG_SOURCE, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Blogbron kon niet worden geladen.");
        }
        return response.text();
      })
      .then(parseBlogPosts);
  }

  return blogPostsPromise;
}

function parseBlogPosts(source) {
  const blocks = source
    .replace(/\r\n?/g, "\n")
    .split("=== POST ===")
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const headers = {};
      const bodyLines = [];
      let inBody = false;

      lines.forEach((line) => {
        if (line.trim() === "Inhoud:") {
          inBody = true;
          return;
        }

        if (inBody) {
          bodyLines.push(line);
          return;
        }

        const separatorIndex = line.indexOf(":");
        if (separatorIndex === -1) {
          return;
        }

        const key = line.slice(0, separatorIndex).trim().toLowerCase();
        const value = line.slice(separatorIndex + 1).trim();
        headers[key] = value;
      });

      const body = bodyLines.join("\n").trim();
      const title = headers.titel || "Zonder titel";
      const date = headers.datum || "";
      const category = headers.categorie || "Algemeen";
      const summary = headers.samenvatting || summarizeBody(body);
      const slug = headers.slug || slugify(title);
      const featured = /^(ja|yes|true|1)$/i.test(headers.uitgelicht || "");

      return {
        title,
        date,
        category,
        summary,
        slug,
        featured,
        body
      };
    })
    .filter((post) => post.title && post.body)
    .sort((left, right) => `${right.date}`.localeCompare(`${left.date}`));
}

function renderBlogIndex(posts) {
  const featuredElement = document.querySelector("[data-blog-featured]");
  const listElement = document.querySelector("[data-blog-list]");

  if (!featuredElement && !listElement) {
    return;
  }

  if (!posts.length) {
    const emptyMarkup = '<div class="notice">Er staan nog geen blogartikelen in het centrale blogbestand.</div>';
    if (featuredElement) {
      featuredElement.innerHTML = emptyMarkup;
    }
    if (listElement) {
      listElement.innerHTML = "";
    }
    return;
  }

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const listPosts = posts.filter((post) => post.slug !== featuredPost.slug);

  if (featuredElement) {
    featuredElement.innerHTML = `
      <div class="blog-kicker">Uitgelicht artikel</div>
      <div class="blog-featured-grid">
        <div class="blog-featured-copy">
          <div class="blog-meta">
            <span>${escapeHtml(featuredPost.category)}</span>
            <span>${escapeHtml(formatBlogDate(featuredPost.date))}</span>
          </div>
          <h2>${escapeHtml(featuredPost.title)}</h2>
          <p>${escapeHtml(featuredPost.summary)}</p>
          <a href="${escapeHtml(getBlogPageHref(featuredPost))}" class="btn btn-primary">Lees artikel <span class="arr">→</span></a>
        </div>
        <div class="blog-featured-note">
          <strong>Eenvoudig publicatiemodel</strong>
          <p>Eén tekstbestand voedt de overzichtspagina en alle losse artikelen. Dat maakt publiceren voorspelbaar en onderhoudbaar.</p>
          <a href="blog-aanleveren.html" class="btn btn-ghost">Nieuw artikel aanleveren</a>
        </div>
      </div>
    `;
  }

  if (listElement) {
    listElement.innerHTML = listPosts.length
      ? listPosts.map((post) => createBlogCard(post)).join("")
      : `
        <article class="post-card">
          <div class="tag">Meer artikelen</div>
          <h3>Nog geen tweede artikel</h3>
          <p>Zodra er nieuwe stukken in <code>content/blog-posts.txt</code> staan, verschijnen ze hier automatisch.</p>
        </article>
      `;
  }
}

function renderBlogPostPage(posts) {
  const heroElement = document.querySelector("[data-blog-post-hero]");
  const contentElement = document.querySelector("[data-blog-post-content]");
  const relatedElement = document.querySelector("[data-blog-related]");
  const updateBlogPostSeo = window.VolpaSeo && typeof window.VolpaSeo.updateBlogPostSeo === "function"
    ? window.VolpaSeo.updateBlogPostSeo
    : null;

  if (!heroElement || !contentElement || !relatedElement) {
    return;
  }

  if (!posts.length) {
    if (updateBlogPostSeo) {
      updateBlogPostSeo(null);
    }
    heroElement.innerHTML = `
      <a href="blog.html" class="back-link">← Terug naar blog</a>
      <div class="sec-num">Volpa · Blog</div>
      <h1 class="page-title">Nog geen artikel beschikbaar</h1>
      <p class="page-intro">Zodra er iets in het blogbestand staat, wordt deze pagina automatisch gevuld.</p>
    `;
    contentElement.innerHTML = '<p>Voeg eerst een artikel toe via <code>content/blog-posts.txt</code> of via de aanleverpagina.</p>';
    relatedElement.innerHTML = "";
    return;
  }

  const slug = new URLSearchParams(window.location.search).get("slug");
  const selectedPost = posts.find((post) => post.slug === slug) || posts[0];
  const notFound = slug && selectedPost.slug !== slug;

  if (updateBlogPostSeo) {
    updateBlogPostSeo(selectedPost);
  }

  heroElement.innerHTML = `
    <a href="blog.html" class="back-link">← Terug naar blog</a>
    <div class="sec-num">Volpa · Blog</div>
    <div class="blog-meta">
      <span>${escapeHtml(selectedPost.category)}</span>
      <span>${escapeHtml(formatBlogDate(selectedPost.date))}</span>
    </div>
    <h1 class="page-title">${escapeHtml(selectedPost.title)}</h1>
    <p class="page-intro">${escapeHtml(selectedPost.summary)}</p>
    ${notFound ? '<div class="notice">Dit artikel werd niet gevonden. Daarom staat hier het meest recente artikel.</div>' : ""}
  `;

  contentElement.innerHTML = renderBlogBody(selectedPost.body);
  relatedElement.innerHTML = posts
    .filter((post) => post.slug !== selectedPost.slug)
    .slice(0, 4)
    .map((post) => (
      `<li><a href="${escapeHtml(getBlogPageHref(post))}">${escapeHtml(post.title)}</a><span>${escapeHtml(formatBlogDate(post.date))}</span></li>`
    ))
    .join("") || "<li>Er staan nog geen andere artikelen klaar.</li>";
}

function renderBlogLoadError() {
  if (window.VolpaSeo && typeof window.VolpaSeo.updateBlogPostSeo === "function") {
    window.VolpaSeo.updateBlogPostSeo(null);
  }

  const hero = document.querySelector("[data-blog-post-hero]");
  if (hero) {
    hero.innerHTML = `
      <a href="blog.html" class="back-link">← Terug naar blog</a>
      <div class="sec-num">Volpa · Blog</div>
      <h1 class="page-title">Blog kon niet laden</h1>
      <p class="page-intro">Controleer of de site via een webserver draait en of <code>content/blog-posts.txt</code> bereikbaar is.</p>
    `;
  }

  const targets = document.querySelectorAll("[data-blog-featured], [data-blog-list], [data-blog-post-content], [data-blog-related]");
  targets.forEach((target) => {
    target.innerHTML = target.tagName === "UL"
      ? '<li>De bloginhoud kon niet worden geladen.</li>'
      : '<div class="notice">De bloginhoud kon niet worden geladen. Controleer of de site via een webserver draait.</div>';
  });
}

function createBlogCard(post) {
  return `
    <article class="post-card">
      <div class="tag">${escapeHtml(post.category)} · ${escapeHtml(formatBlogDate(post.date))}</div>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.summary)}</p>
      <a href="${escapeHtml(getBlogPageHref(post))}" class="post-link">Lees artikel →</a>
    </article>
  `;
}

function getBlogPageHref(post) {
  if (!post || !post.slug) {
    return "blog.html";
  }

  return `blog/${encodeURIComponent(post.slug)}.html`;
}

function renderBlogBody(body) {
  const lines = body.replace(/\r\n?/g, "\n").split("\n");
  const chunks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      chunks.push(`<h2>${escapeHtml(line.slice(3).trim())}</h2>`);
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(`<li>${escapeHtml(lines[index].trim().slice(2).trim())}</li>`);
        index += 1;
      }
      chunks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    const paragraph = [];
    while (index < lines.length) {
      const value = lines[index].trim();
      if (!value || value.startsWith("## ") || value.startsWith("- ")) {
        break;
      }
      paragraph.push(value);
      index += 1;
    }
    chunks.push(`<p>${escapeHtml(paragraph.join(" "))}</p>`);
  }

  return chunks.join("");
}

function initBlogGenerator() {
  const form = document.querySelector("[data-blog-generator]");
  const output = document.querySelector("[data-blog-output]");
  const status = document.querySelector("[data-blog-output-status]");
  const copyButton = document.querySelector("[data-copy-blog]");
  const downloadButton = document.querySelector("[data-download-blog]");
  const emailButton = document.querySelector("[data-email-blog]");
  const slugPreview = document.querySelector("[data-blog-slug]");
  const preview = document.querySelector("[data-blog-preview]");

  if (!form || !output || !status || !copyButton || !downloadButton || !emailButton || !slugPreview || !preview) {
    return;
  }

  const fields = {
    title: form.querySelector('[name="title"]'),
    date: form.querySelector('[name="date"]'),
    category: form.querySelector('[name="category"]'),
    summary: form.querySelector('[name="summary"]'),
    body: form.querySelector('[name="body"]'),
    featured: form.querySelector('[name="featured"]')
  };

  if (fields.date && !fields.date.value) {
    fields.date.value = getTodayInputValue();
  }

  const generate = () => {
    const title = fields.title.value.trim();
    const date = (fields.date.value || getTodayInputValue()).trim();
    const category = (fields.category.value || "Algemeen").trim();
    const body = fields.body.value.trim();
    const summary = (fields.summary.value || summarizeBody(body)).trim();
    const featured = fields.featured.value === "ja" ? "ja" : "nee";
    const slug = slugify(title);

    slugPreview.value = slug;
    if (!fields.date.value) {
      fields.date.value = date;
    }

    clearGeneratorErrors(form, status);

    let valid = true;
    [
      [fields.title, title],
      [fields.body, body]
    ].forEach(([field, value]) => {
      if (!value) {
        valid = false;
        field.classList.add("invalid");
        const error = document.createElement("span");
        error.className = "field-error";
        error.textContent = "Dit veld is verplicht.";
        field.insertAdjacentElement("afterend", error);
      }
    });

    if (!title || !slug) {
      valid = false;
    }

    if (!valid) {
      output.value = "";
      preview.innerHTML = '<p class="generator-placeholder">Vul eerst alle velden in voor een bruikbaar blogblok.</p>';
      status.textContent = "Vul minimaal een titel en de tekst in.";
      status.classList.add("error");
      return null;
    }

    if (!fields.category.value.trim()) {
      fields.category.value = category;
    }

    if (!fields.summary.value.trim()) {
      fields.summary.value = summary;
    }

    const block = [
      "=== POST ===",
      `Titel: ${title}`,
      `Datum: ${date}`,
      `Categorie: ${category}`,
      `Slug: ${slug}`,
      `Samenvatting: ${summary}`,
      `Uitgelicht: ${featured}`,
      "",
      "Inhoud:",
      body
    ].join("\n");

    output.value = block;
    preview.innerHTML = `
      <div class="blog-meta">
        <span>${escapeHtml(category)}</span>
        <span>${escapeHtml(formatBlogDate(date))}</span>
      </div>
      <h3>${escapeHtml(title)}</h3>
      <p class="preview-summary">${escapeHtml(summary)}</p>
      <div class="preview-body">${renderBlogBody(body)}</div>
    `;
    status.textContent = "Blogblok klaar. Je kunt het nu kopiëren of downloaden.";
    status.classList.remove("error");
    status.classList.add("success");

    return { block, slug, title, date, category, summary, body };
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    generate();
  });

  form.addEventListener("input", () => {
    const title = fields.title.value.trim();
    slugPreview.value = slugify(title);
  });

  copyButton.addEventListener("click", async () => {
    const draft = generate();
    if (!draft) {
      return;
    }

    try {
      await navigator.clipboard.writeText(draft.block);
      status.textContent = "Blogblok gekopieerd naar het klembord.";
      status.classList.remove("error");
      status.classList.add("success");
    } catch (error) {
      output.focus();
      output.select();
      status.textContent = "Kopiëren via knop lukte niet. De tekst is wel geselecteerd.";
      status.classList.remove("success");
      status.classList.add("error");
    }
  });

  downloadButton.addEventListener("click", () => {
    const draft = generate();
    if (!draft) {
      return;
    }

    const blob = new Blob([draft.block], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${draft.slug || "blog"}-aanlevering.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    status.textContent = "Blogblok gedownload als tekstbestand.";
    status.classList.remove("error");
    status.classList.add("success");
  });

  emailButton.addEventListener("click", () => {
    const draft = generate();
    if (!draft) {
      return;
    }

    const email = window.VOLPA && window.VOLPA.contact && window.VOLPA.contact.email;
    if (!email) {
      status.textContent = "Er is geen e-mailadres ingesteld voor blogaanlevering.";
      status.classList.remove("success");
      status.classList.add("error");
      return;
    }

    const subject = `Blogaanlevering: ${draft.title}`;
    const mailBody = [
      "Nieuwe blogaanlevering voor Volpa.",
      "",
      `Titel: ${draft.title}`,
      `Datum: ${draft.date}`,
      `Categorie: ${draft.category}`,
      `Samenvatting: ${draft.summary}`,
      "",
      "Inhoud:",
      draft.body
    ].join("\n");

    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

    if (mailto.length > 6000) {
      status.textContent = "Deze tekst is te lang voor een e-mailconcept. Gebruik in dat geval Download .txt.";
      status.classList.remove("success");
      status.classList.add("error");
      return;
    }

    status.textContent = "Je e-mailapp wordt geopend met de blogaanlevering.";
    status.classList.remove("error");
    status.classList.add("success");
    window.location.href = mailto;
  });
}

function clearGeneratorErrors(form, status) {
  form.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));
  form.querySelectorAll(".field-error").forEach((field) => field.remove());
  status.textContent = "";
  status.classList.remove("error", "success");
}

function formatBlogDate(value) {
  if (!value) {
    return "Datum volgt";
  }

  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function getTodayInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function summarizeBody(body) {
  const cleaned = body
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("##") && !line.startsWith("- "))
    .join(" ");

  const fallback = body
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^##\s*/, "").replace(/^-\s*/, "").trim())
    .filter(Boolean)
    .join(" ");

  const source = cleaned || fallback;

  if (!source) {
    return "";
  }

  const sentences = source.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length) {
    const summary = sentences.slice(0, 2).join(" ").trim();
    if (summary.length >= 80) {
      return summary;
    }
  }

  if (source.length <= 180) {
    return source;
  }

  return `${source.slice(0, 177).trim()}...`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return `${value}`
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
