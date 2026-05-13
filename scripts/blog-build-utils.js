const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_SOURCE_PATH = path.join(ROOT_DIR, "content", "blog-posts.txt");
const BLOG_OUTPUT_DIR = path.join(ROOT_DIR, "blog");
const SITEMAP_PATH = path.join(ROOT_DIR, "sitemap.xml");

function loadSeoConfig() {
  const source = fs.readFileSync(path.join(ROOT_DIR, "assets", "js", "seo-config.js"), "utf8");
  const sandbox = { window: {} };

  vm.runInNewContext(source, sandbox, { filename: "assets/js/seo-config.js" });

  return Object.assign({
    siteUrl: "https://oli4vos.github.io/volpa/",
    siteName: "Volpa",
    defaultOgImagePath: "assets/img/og-default.svg",
    personName: "Arnoud Vos",
    organizationDescription: "Volpa begeleidt mensen bij scheiding met aandacht voor rust, overzicht en financiele duidelijkheid."
  }, sandbox.window.VOLPA_SEO_CONFIG || {});
}

function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function absoluteUrl(config, relativePath) {
  return new URL(relativePath || "", ensureTrailingSlash(config.siteUrl)).href;
}

function escapeHtml(value) {
  return `${value}`
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(value) {
  return `${value || ""}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function summarizeBody(body, maxLength = 160) {
  const source = `${body || ""}`
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^##\s*/, "").replace(/^-\s*/, "").trim())
    .filter(Boolean)
    .join(" ");

  if (!source) {
    return "";
  }

  if (source.length <= maxLength) {
    return source;
  }

  return `${source.slice(0, maxLength - 3).trim()}...`;
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

function formatPublishedTime(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(`${value || ""}`) ? `${value}T00:00:00+00:00` : "";
}

function parseBlogPosts(source) {
  const blocks = `${source || ""}`
    .replace(/\r\n?/g, "\n")
    .split("=== POST ===")
    .map((block) => block.trim())
    .filter(Boolean);

  const posts = blocks.map((block, index) => {
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
    const title = headers.titel || "";
    const slug = headers.slug || slugify(title);

    if (!title) {
      throw new Error(`Blogblok ${index + 1} heeft geen titel.`);
    }

    if (!body) {
      throw new Error(`Blogblok "${title}" heeft geen inhoud.`);
    }

    if (!slug) {
      throw new Error(`Blogblok "${title}" heeft geen bruikbare slug.`);
    }

    return {
      title,
      date: headers.datum || "",
      category: headers.categorie || "Algemeen",
      summary: headers.samenvatting || summarizeBody(body),
      slug,
      featured: /^(ja|yes|true|1)$/i.test(headers.uitgelicht || ""),
      body
    };
  });

  const seen = new Set();
  posts.forEach((post) => {
    if (seen.has(post.slug)) {
      throw new Error(`Dubbele slug gevonden: ${post.slug}`);
    }
    seen.add(post.slug);
  });

  return posts.sort((left, right) => `${right.date}`.localeCompare(`${left.date}`));
}

function readBlogPosts() {
  const source = fs.readFileSync(BLOG_SOURCE_PATH, "utf8");
  return parseBlogPosts(source);
}

function renderBlogBody(body) {
  const lines = `${body || ""}`.replace(/\r\n?/g, "\n").split("\n");
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

function getBlogStaticPath(slug) {
  return `blog/${slug}.html`;
}

function getBlogFallbackPath(slug) {
  return `blogpost.html?slug=${encodeURIComponent(slug)}`;
}

function getMetaDescription(post) {
  return post.summary || summarizeBody(post.body);
}

function buildBlogPostingStructuredData(post, config) {
  const articlePath = getBlogStaticPath(post.slug);
  const articleUrl = absoluteUrl(config, articlePath);
  const payload = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    "mainEntityOfPage": articleUrl,
    "headline": post.title,
    "description": getMetaDescription(post),
    "author": {
      "@type": "Person",
      "name": config.personName,
      "url": absoluteUrl(config, "over-arnoud.html")
    },
    "publisher": {
      "@id": absoluteUrl(config, "#organization")
    },
    "image": absoluteUrl(config, config.defaultOgImagePath),
    "url": articleUrl
  };

  const publishedTime = formatPublishedTime(post.date);
  if (publishedTime) {
    payload.datePublished = publishedTime;
    payload.dateModified = publishedTime;
  }

  if (post.category) {
    payload.articleSection = post.category;
  }

  return payload;
}

function renderRelatedPosts(currentPost, posts) {
  const items = posts
    .filter((post) => post.slug !== currentPost.slug)
    .slice(0, 4)
    .map((post) => `<li><a href="${escapeHtml(`${post.slug}.html`)}">${escapeHtml(post.title)}</a><span>${escapeHtml(formatBlogDate(post.date))}</span></li>`)
    .join("");

  return items || "<li>Er staan nog geen andere artikelen klaar.</li>";
}

function renderStaticBlogPage(post, posts, config) {
  const articlePath = getBlogStaticPath(post.slug);
  const articleUrl = absoluteUrl(config, articlePath);
  const articleDescription = getMetaDescription(post);
  const articlePublishedTime = formatPublishedTime(post.date);
  const articleStructuredData = JSON.stringify(buildBlogPostingStructuredData(post, config));
  const ogImageUrl = absoluteUrl(config, config.defaultOgImagePath);

  return `<!DOCTYPE html>
<html lang="nl" data-seo-path="${escapeHtml(articlePath)}" data-seo-kind="blog-article">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(`${post.title} | ${config.siteName}`)}</title>
<meta name="description" content="${escapeHtml(articleDescription)}" />
<meta name="robots" content="index,follow" />
<link rel="canonical" href="${escapeHtml(articleUrl)}" data-seo-path="${escapeHtml(articlePath)}" />
<meta property="og:locale" content="nl_NL" />
<meta property="og:site_name" content="${escapeHtml(config.siteName)}" />
<meta property="og:title" content="${escapeHtml(`${post.title} | ${config.siteName}`)}" />
<meta property="og:description" content="${escapeHtml(articleDescription)}" />
<meta property="og:url" content="${escapeHtml(articleUrl)}" data-seo-path="${escapeHtml(articlePath)}" />
<meta property="og:type" content="article" />
<meta property="og:image" content="${escapeHtml(ogImageUrl)}" data-seo-image="${escapeHtml(config.defaultOgImagePath)}" />
${articlePublishedTime ? `<meta property="article:published_time" content="${escapeHtml(articlePublishedTime)}" />` : ""}
<meta property="article:author" content="${escapeHtml(`${config.personName} / ${config.siteName}`)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(`${post.title} | ${config.siteName}`)}" />
<meta name="twitter:description" content="${escapeHtml(articleDescription)}" />
<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" data-seo-image="${escapeHtml(config.defaultOgImagePath)}" />
<script type="application/ld+json">${articleStructuredData}</script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
<script src="../assets/js/seo-config.js"></script>
<script src="../assets/js/theme-init.js"></script>
<script src="../assets/js/seo.js"></script>
<noscript><link rel="stylesheet" href="../assets/css/main.css" /></noscript>
</head>
<body>
<header class="nav">
  <div class="container nav-inner">
    <a href="../index.html" class="logo">
      <span class="dot"></span>
      Volpa
      <small>begeleiding bij scheiding</small>
    </a>
    <nav class="nav-links">
      <a href="../mediation.html">Mediation</a>
      <a href="../financieel-advies.html">Financieel advies</a>
      <a href="../juridische-begeleiding.html">Juridische begeleiding</a>
      <a href="../over-arnoud.html">Over Arnoud</a>
      <a href="../blog.html" aria-current="page">Blog</a>
    </nav>
    <button type="button" class="nav-toggle" data-nav-toggle aria-expanded="false" aria-label="Open menu">Menu</button>
    <a href="../contact.html" class="nav-cta">Even praten <span class="arr">-&gt;</span></a>
  </div>
</header>

<section class="page-hero">
  <div class="container article-hero">
    <a href="../blog.html" class="back-link">&larr; Terug naar blog</a>
    <div class="sec-num">Volpa · Blog</div>
    <div class="blog-meta">
      <span>${escapeHtml(post.category)}</span>
      <span>${escapeHtml(formatBlogDate(post.date))}</span>
    </div>
    <h1 class="page-title">${escapeHtml(post.title)}</h1>
    <p class="page-intro">${escapeHtml(articleDescription)}</p>
  </div>
</section>

<main class="page-main">
  <div class="container article-layout">
    <article class="content-card article-content">
      ${renderBlogBody(post.body)}
    </article>
    <aside class="content-card article-side">
      <h4>Verder lezen</h4>
      <ul class="link-list">${renderRelatedPosts(post, posts)}</ul>
      <div class="notice">Dit artikel is statisch gegenereerd vanuit <code>content/blog-posts.txt</code> en houdt dezelfde inhoudsbron aan als het bestaande blog.</div>
      <a href="../${escapeHtml(getBlogFallbackPath(post.slug))}" class="back-link">Fallback-versie openen</a>
    </aside>
  </div>
</main>

<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="../index.html" class="logo">
          <span class="dot"></span>
          Volpa
          <small>begeleiding bij scheiding</small>
        </a>
        <p>Volpa staat voor menselijke begeleiding bij scheiding. Mediation, financieel advies en juridische zorg - onder een dak, op jullie tempo.</p>
      </div>
      <div>
        <h5>Diensten</h5>
        <ul>
          <li><a href="../mediation.html">Mediation</a></li>
          <li><a href="../financieel-advies.html">Financieel advies</a></li>
          <li><a href="../juridische-begeleiding.html">Juridische begeleiding</a></li>
          <li><a href="../index.html#aanpak">Onze aanpak</a></li>
        </ul>
      </div>
      <div>
        <h5>Volpa</h5>
        <ul>
          <li><a href="../over-arnoud.html">Over Arnoud</a></li>
          <li><a href="../blog.html" aria-current="page">Blog</a></li>
          <li><a href="../kennisbank-scheiden.html">Kennisbank scheiden</a></li>
          <li><a href="../blog-aanleveren.html">Blog aanleveren</a></li>
          <li><a href="../contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h5>Bereikbaar</h5>
        <ul data-bind-footer-contact>
          <li>+31 (0)26 30 30 610</li>
          <li>hallo@volpa.nl</li>
          <li>Velperweg 21, Arnhem</li>
          <li>Ma-do · 09-18u</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <span>© 2026 Volpa B.V. · KvK 67891234</span>
      <span class="marks">
        <a href="../privacy.html">Privacy</a>
        <a href="../voorwaarden.html">Voorwaarden</a>
        <a href="../cookies.html">Cookies</a>
      </span>
    </div>
  </div>
</footer>

<script src="../arnoud-data.js"></script>
<script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

function getFixedPageEntries() {
  return [
    { path: "", file: "index.html" },
    { path: "mediation.html", file: "mediation.html" },
    { path: "financieel-advies.html", file: "financieel-advies.html" },
    { path: "juridische-begeleiding.html", file: "juridische-begeleiding.html" },
    { path: "over-arnoud.html", file: "over-arnoud.html" },
    { path: "contact.html", file: "contact.html" },
    { path: "blog.html", file: "blog.html" },
    { path: "kennisbank-scheiden.html", file: "kennisbank-scheiden.html" },
    { path: "scheiden/mediation-of-financiele-scheidingsbegeleiding.html", file: "scheiden/mediation-of-financiele-scheidingsbegeleiding.html" },
    { path: "scheiden/wat-is-financiele-scheidingsbegeleiding.html", file: "scheiden/wat-is-financiele-scheidingsbegeleiding.html" },
    { path: "scheiden/wat-is-pendelmediation.html", file: "scheiden/wat-is-pendelmediation.html" },
    { path: "scheiden/scheiden-met-koophuis.html", file: "scheiden/scheiden-met-koophuis.html" },
    { path: "scheiden/second-opinion-scheidingsconvenant.html", file: "scheiden/second-opinion-scheidingsconvenant.html" },
    { path: "leadpagina.html", file: "leadpagina.html" },
    { path: "privacy.html", file: "privacy.html" },
    { path: "voorwaarden.html", file: "voorwaarden.html" },
    { path: "cookies.html", file: "cookies.html" }
  ];
}

function getFileLastMod(fileName) {
  const stats = fs.statSync(path.join(ROOT_DIR, fileName));
  return stats.mtime.toISOString().slice(0, 10);
}

function generateSitemapXml(posts, config) {
  const urls = [];

  getFixedPageEntries().forEach((entry) => {
    urls.push({
      loc: absoluteUrl(config, entry.path),
      lastmod: getFileLastMod(entry.file)
    });
  });

  posts.forEach((post) => {
    urls.push({
      loc: absoluteUrl(config, getBlogStaticPath(post.slug)),
      lastmod: /^\d{4}-\d{2}-\d{2}$/.test(post.date) ? post.date : getFileLastMod("blog.html")
    });
  });

  const body = urls.map((entry) => `  <url>
    <loc>${escapeHtml(entry.loc)}</loc>
    <lastmod>${escapeHtml(entry.lastmod)}</lastmod>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

module.exports = {
  BLOG_OUTPUT_DIR,
  BLOG_SOURCE_PATH,
  ROOT_DIR,
  SITEMAP_PATH,
  absoluteUrl,
  generateSitemapXml,
  getBlogStaticPath,
  loadSeoConfig,
  parseBlogPosts,
  readBlogPosts,
  renderStaticBlogPage
};
