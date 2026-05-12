document.addEventListener("DOMContentLoaded", () => {
  initAdminPanel();
});

const ADMIN_LOGIN_KEY = "volpa-admin-unlocked";
const ADMIN_BLOG_SOURCE = "../content/blog-posts.txt";

const adminState = {
  loaded: false,
  posts: [],
  selectedPostSlug: null,
  arnoud: null
};

function initAdminPanel() {
  const loginScreen = document.querySelector("[data-admin-login-screen]");
  const app = document.querySelector("[data-admin-app]");
  const loginButton = document.querySelector("[data-admin-login]");
  const logoutButton = document.querySelector("[data-admin-logout]");

  if (!loginScreen || !app || !loginButton || !logoutButton) {
    return;
  }

  loginButton.addEventListener("click", async () => {
    try {
      window.sessionStorage.setItem(ADMIN_LOGIN_KEY, "true");
    } catch (error) {
      // Ignore sessionStorage failures and still open the panel.
    }
    await openAdminApp(loginScreen, app);
  });

  logoutButton.addEventListener("click", () => {
    try {
      window.sessionStorage.removeItem(ADMIN_LOGIN_KEY);
    } catch (error) {
      // Ignore storage failures.
    }
    app.hidden = true;
    loginScreen.hidden = false;
  });

  let isOpen = false;
  try {
    isOpen = window.sessionStorage.getItem(ADMIN_LOGIN_KEY) === "true";
  } catch (error) {
    isOpen = false;
  }

  if (isOpen) {
    openAdminApp(loginScreen, app);
  }
}

async function openAdminApp(loginScreen, app) {
  loginScreen.hidden = true;
  app.hidden = false;

  if (!adminState.loaded) {
    try {
      await loadAdminData();
      bindAdminEvents();
      adminState.loaded = true;
    } catch (error) {
      app.hidden = true;
      loginScreen.hidden = false;
      window.alert("Het adminpaneel kon niet volledig laden. Controleer of de site via een webserver draait en probeer opnieuw.");
    }
  }
}

async function loadAdminData() {
  await loadBlogPosts();
  loadArnoudData();
  renderBlogEditor();
  renderArnoudEditor();
}

async function loadBlogPosts() {
  const response = await fetch(ADMIN_BLOG_SOURCE, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Blogbestand kon niet worden geladen.");
  }

  const source = await response.text();
  adminState.posts = parseBlogPosts(source);
  adminState.selectedPostSlug = adminState.posts[0] ? adminState.posts[0].slug : null;
}

function loadArnoudData() {
  adminState.arnoud = cloneValue(window.VOLPA || {});
}

function bindAdminEvents() {
  bindBlogEvents();
  bindArnoudEvents();
}

function bindBlogEvents() {
  const form = document.querySelector("[data-admin-post-form]");
  const titleInput = form.querySelector('[name="title"]');
  const slugInput = form.querySelector('[name="slug"]');

  titleInput.addEventListener("input", () => {
    if (!slugInput.dataset.manual || !slugInput.value.trim()) {
      slugInput.value = slugify(titleInput.value.trim());
      slugInput.dataset.manual = "";
    }
  });

  slugInput.addEventListener("input", () => {
    slugInput.dataset.manual = slugInput.value.trim() ? "true" : "";
  });

  document.querySelector("[data-admin-new-post]").addEventListener("click", () => {
    adminState.selectedPostSlug = null;
    fillBlogForm(createEmptyPost());
    updateBlogEditorTitle();
    updateBlogStatus("Nieuw blogformulier geopend.", "success");
  });

  document.querySelector("[data-admin-save-post]").addEventListener("click", () => {
    const payload = readBlogForm();
    if (!payload) {
      return;
    }

    const existingIndex = adminState.posts.findIndex((post) => post.slug === adminState.selectedPostSlug);
    const conflictingPost = adminState.posts.find((post, index) => post.slug === payload.slug && index !== existingIndex);
    if (conflictingPost) {
      updateBlogStatus("Deze slug bestaat al. Pas titel of slug aan.", "error");
      return;
    }

    if (existingIndex >= 0) {
      adminState.posts.splice(existingIndex, 1, payload);
    } else {
      adminState.posts.push(payload);
    }

    adminState.posts = sortPosts(adminState.posts);
    adminState.selectedPostSlug = payload.slug;
    renderBlogEditor();
    updateBlogStatus("Blog opgeslagen in de huidige lijst. Download of kopieer daarna het volledige blogbestand.", "success");
  });

  document.querySelector("[data-admin-delete-post]").addEventListener("click", () => {
    if (!adminState.selectedPostSlug) {
      updateBlogStatus("Er is geen bestaand blog geselecteerd om te verwijderen.", "error");
      return;
    }

    const selectedPost = adminState.posts.find((post) => post.slug === adminState.selectedPostSlug);
    if (!selectedPost) {
      updateBlogStatus("Geselecteerd blog kon niet meer worden gevonden.", "error");
      return;
    }

    const confirmed = window.confirm(`Weet je zeker dat je "${selectedPost.title}" wilt verwijderen?`);
    if (!confirmed) {
      return;
    }

    adminState.posts = adminState.posts.filter((post) => post.slug !== adminState.selectedPostSlug);
    adminState.selectedPostSlug = adminState.posts[0] ? adminState.posts[0].slug : null;
    renderBlogEditor();
    updateBlogStatus("Blog verwijderd uit de huidige lijst. Vergeet niet het bijgewerkte blogbestand te publiceren.", "success");
  });

  document.querySelector("[data-admin-copy-current-post]").addEventListener("click", async () => {
    const payload = readBlogForm();
    if (!payload) {
      return;
    }

    await copyText(buildBlogBlock(payload), "Huidig blogblok gekopieerd.", "Kon huidig blogblok niet kopiëren.");
  });

  document.querySelector("[data-admin-copy-posts]").addEventListener("click", async () => {
    await copyText(buildBlogFile(adminState.posts), "Volledige blogbestand gekopieerd.", "Kon blogbestand niet kopiëren.");
  });

  document.querySelector("[data-admin-download-posts]").addEventListener("click", () => {
    downloadTextFile("blog-posts.txt", buildBlogFile(adminState.posts));
    updateBlogStatus("blog-posts.txt gedownload.", "success");
  });
}

function bindArnoudEvents() {
  document.querySelector("[data-admin-generate-arnoud]").addEventListener("click", () => {
    renderArnoudOutput();
    updateArnoudStatus("Nieuwe arnoud-data.js gegenereerd.", "success");
  });

  document.querySelector("[data-admin-copy-arnoud]").addEventListener("click", async () => {
    renderArnoudOutput();
    const output = document.querySelector("[data-admin-arnoud-output]").value;
    await copyText(output, "arnoud-data.js gekopieerd.", "Kon arnoud-data.js niet kopiëren.", "arnoud");
  });

  document.querySelector("[data-admin-download-arnoud]").addEventListener("click", () => {
    renderArnoudOutput();
    const output = document.querySelector("[data-admin-arnoud-output]").value;
    downloadTextFile("arnoud-data.js", output);
    updateArnoudStatus("arnoud-data.js gedownload.", "success");
  });
}

function renderBlogEditor() {
  const selectedPost = adminState.posts.find((post) => post.slug === adminState.selectedPostSlug) || null;
  fillBlogForm(selectedPost || createEmptyPost());
  renderBlogList(selectedPost ? selectedPost.slug : null);
  updateBlogEditorTitle();

  const output = document.querySelector("[data-admin-posts-output]");
  output.value = buildBlogFile(adminState.posts);
}

function renderBlogList(activeSlug) {
  const list = document.querySelector("[data-admin-post-list]");
  if (!list) {
    return;
  }

  if (!adminState.posts.length) {
    list.innerHTML = '<div class="admin-post-meta">Er staan nog geen blogs in het huidige bestand.</div>';
    return;
  }

  list.innerHTML = adminState.posts.map((post) => `
    <button type="button" class="admin-post-item${post.slug === activeSlug ? " active" : ""}" data-post-slug="${escapeHtml(post.slug)}">
      <span class="admin-post-title">${escapeHtml(post.title)}</span>
      <span class="admin-post-meta">${escapeHtml(post.category)} · ${escapeHtml(formatBlogDate(post.date))}${post.featured ? " · uitgelicht" : ""}</span>
    </button>
  `).join("");

  list.querySelectorAll("[data-post-slug]").forEach((button) => {
    button.addEventListener("click", () => {
      adminState.selectedPostSlug = button.getAttribute("data-post-slug");
      renderBlogEditor();
      updateBlogStatus("Bestaand blog geladen in de editor.", "success");
    });
  });
}

function fillBlogForm(post) {
  const form = document.querySelector("[data-admin-post-form]");
  form.querySelector('[name="title"]').value = post.title || "";
  form.querySelector('[name="date"]').value = post.date || getTodayInputValue();
  form.querySelector('[name="category"]').value = post.category || "Algemeen";
  form.querySelector('[name="slug"]').value = post.slug || "";
  form.querySelector('[name="slug"]').dataset.manual = post.slug ? "true" : "";
  form.querySelector('[name="summary"]').value = post.summary || "";
  form.querySelector('[name="featured"]').checked = Boolean(post.featured);
  form.querySelector('[name="body"]').value = post.body || "";
}

function readBlogForm() {
  const form = document.querySelector("[data-admin-post-form]");
  const title = form.querySelector('[name="title"]').value.trim();
  const date = form.querySelector('[name="date"]').value.trim() || getTodayInputValue();
  const category = form.querySelector('[name="category"]').value.trim() || "Algemeen";
  const rawSlug = form.querySelector('[name="slug"]').value.trim();
  const body = form.querySelector('[name="body"]').value.trim();
  const summary = form.querySelector('[name="summary"]').value.trim() || summarizeBody(body);
  const slug = rawSlug || slugify(title);
  const featured = form.querySelector('[name="featured"]').checked;

  if (!title || !body) {
    updateBlogStatus("Titel en volledige tekst zijn verplicht.", "error");
    return null;
  }

  if (!slug) {
    updateBlogStatus("Voor deze titel kon geen geldige slug worden gemaakt.", "error");
    return null;
  }

  return {
    title,
    date,
    category,
    slug,
    summary,
    featured,
    body
  };
}

function updateBlogEditorTitle() {
  const title = document.querySelector("[data-admin-post-editor-title]");
  const selectedPost = adminState.posts.find((post) => post.slug === adminState.selectedPostSlug);
  title.textContent = selectedPost ? `Blog bewerken: ${selectedPost.title}` : "Nieuwe blog";
}

function updateBlogStatus(message, type) {
  updateStatus("[data-admin-post-status]", message, type);
}

function renderArnoudEditor() {
  const data = adminState.arnoud || {};
  const form = document.querySelector("[data-admin-arnoud-form]");

  form.querySelector('[name="naam"]').value = data.naam || "";
  form.querySelector('[name="rol"]').value = data.rol || "";
  form.querySelector('[name="werkgebied"]').value = data.werkgebied || "";
  form.querySelector('[name="sinds"]').value = data.sinds || "";
  form.querySelector('[name="bio"]').value = (data.bio || []).join("\n\n");
  form.querySelector('[name="specialisaties"]').value = (data.specialisaties || []).join("\n");
  form.querySelector('[name="ervaringJaren"]').value = data.stats && data.stats.ervaringJaren != null ? data.stats.ervaringJaren : "";
  form.querySelector('[name="zonderRechterPct"]').value = data.stats && data.stats.zonderRechterPct != null ? data.stats.zonderRechterPct : "";
  form.querySelector('[name="gesprekkenRange"]').value = data.stats && data.stats.gesprekkenRange ? data.stats.gesprekkenRange : "";

  const contact = data.contact || {};
  form.querySelector('[name="telefoon"]').value = contact.telefoon || "";
  form.querySelector('[name="telefoonLink"]').value = contact.telefoonLink || "";
  form.querySelector('[name="whatsapp"]').value = contact.whatsapp || "";
  form.querySelector('[name="email"]').value = contact.email || "";
  form.querySelector('[name="adres"]').value = contact.adres || "";
  form.querySelector('[name="bereikbaar"]').value = contact.bereikbaar || "";
  form.querySelector('[name="linkedin"]').value = contact.linkedin || "";

  renderArnoudOutput();
}

function buildArnoudStateFromForm() {
  const form = document.querySelector("[data-admin-arnoud-form]");
  const current = cloneValue(adminState.arnoud || {});
  const phone = form.querySelector('[name="telefoon"]').value.trim();
  const normalizedPhone = normalizePhoneLink(phone);
  const phoneLink = form.querySelector('[name="telefoonLink"]').value.trim() || normalizedPhone;
  const whatsapp = form.querySelector('[name="whatsapp"]').value.trim() || phoneLink.replace(/^\+/, "");

  current.naam = form.querySelector('[name="naam"]').value.trim();
  current.rol = form.querySelector('[name="rol"]').value.trim();
  current.werkgebied = form.querySelector('[name="werkgebied"]').value.trim();
  current.sinds = toNumberOrValue(form.querySelector('[name="sinds"]').value.trim());
  current.bio = splitParagraphs(form.querySelector('[name="bio"]').value);
  current.specialisaties = splitLines(form.querySelector('[name="specialisaties"]').value);
  current.contact = current.contact || {};
  current.contact.telefoon = phone;
  current.contact.telefoonLink = phoneLink;
  current.contact.whatsapp = whatsapp;
  current.contact.email = form.querySelector('[name="email"]').value.trim();
  current.contact.adres = form.querySelector('[name="adres"]').value.trim();
  current.contact.bereikbaar = form.querySelector('[name="bereikbaar"]').value.trim();
  current.contact.linkedin = form.querySelector('[name="linkedin"]').value.trim();
  current.stats = current.stats || {};
  current.stats.ervaringJaren = toNumberOrValue(form.querySelector('[name="ervaringJaren"]').value.trim());
  current.stats.zonderRechterPct = toNumberOrValue(form.querySelector('[name="zonderRechterPct"]').value.trim());
  current.stats.gesprekkenRange = form.querySelector('[name="gesprekkenRange"]').value.trim();

  adminState.arnoud = current;
  return current;
}

function renderArnoudOutput() {
  const output = document.querySelector("[data-admin-arnoud-output]");
  output.value = buildArnoudFile(buildArnoudStateFromForm());
}

function updateArnoudStatus(message, type) {
  updateStatus("[data-admin-arnoud-status]", message, type);
}

function updateStatus(selector, message, type) {
  const status = document.querySelector(selector);
  if (!status) {
    return;
  }

  status.textContent = message || "";
  status.classList.remove("error", "success");

  if (type) {
    status.classList.add(type);
  }
}

async function copyText(text, successMessage, errorMessage, mode) {
  const scope = mode === "arnoud" ? "arnoud" : "blog";

  try {
    await navigator.clipboard.writeText(text);
    if (scope === "arnoud") {
      updateArnoudStatus(successMessage, "success");
    } else {
      updateBlogStatus(successMessage, "success");
    }
  } catch (error) {
    if (scope === "arnoud") {
      updateArnoudStatus(errorMessage, "error");
    } else {
      updateBlogStatus(errorMessage, "error");
    }
  }
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function createEmptyPost() {
  return {
    title: "",
    date: getTodayInputValue(),
    category: "Algemeen",
    slug: "",
    summary: "",
    featured: false,
    body: ""
  };
}

function parseBlogPosts(source) {
  const blocks = source
    .replace(/\r\n?/g, "\n")
    .split("=== POST ===")
    .map((block) => block.trim())
    .filter(Boolean);

  return sortPosts(blocks.map((block) => {
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

    const title = headers.titel || "Zonder titel";
    const date = headers.datum || getTodayInputValue();
    const category = headers.categorie || "Algemeen";
    const summary = headers.samenvatting || "";
    const slug = headers.slug || slugify(title);
    const featured = /^(ja|yes|true|1)$/i.test(headers.uitgelicht || "");
    const body = bodyLines.join("\n").trim();

    return { title, date, category, summary, slug, featured, body };
  }));
}

function buildBlogBlock(post) {
  return [
    "=== POST ===",
    `Titel: ${post.title}`,
    `Datum: ${post.date}`,
    `Categorie: ${post.category}`,
    `Slug: ${post.slug}`,
    `Samenvatting: ${post.summary}`,
    `Uitgelicht: ${post.featured ? "ja" : "nee"}`,
    "",
    "Inhoud:",
    post.body
  ].join("\n");
}

function buildBlogFile(posts) {
  return posts.map((post) => buildBlogBlock(post)).join("\n\n").trim() + "\n";
}

function buildArnoudFile(data) {
  const header = [
    "/* ============================================================",
    "   VOLPA — gegevens van Arnoud",
    "   ------------------------------------------------------------",
    "   Gegenereerd vanuit /admin.",
    "   Deze versie kun je gebruiken om arnoud-data.js te vervangen.",
    "   ============================================================ */",
    ""
  ].join("\n");

  return `${header}\nwindow.VOLPA = ${JSON.stringify(data, null, 2)};\n`;
}

function sortPosts(posts) {
  return posts.slice().sort((left, right) => `${right.date}`.localeCompare(`${left.date}`));
}

function splitParagraphs(value) {
  return value
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value) {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatBlogDate(value) {
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

function normalizePhoneLink(phone) {
  return phone.replace(/[^\d+]/g, "");
}

function toNumberOrValue(value) {
  if (!value) {
    return "";
  }

  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : value;
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

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}
