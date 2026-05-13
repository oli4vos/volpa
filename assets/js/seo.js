(function () {
  const defaults = {
    siteUrl: "https://oli4vos.github.io/volpa/",
    siteName: "Volpa",
    defaultOgImagePath: "assets/img/og-default.svg",
    personName: "Arnoud Vos",
    organizationDescription: "Volpa begeleidt mensen bij scheiding met aandacht voor rust, overzicht en financiele duidelijkheid.",
    knowsAbout: []
  };

  const config = Object.assign({}, defaults, window.VOLPA_SEO_CONFIG || {});
  config.siteUrl = ensureTrailingSlash(config.siteUrl);

  function ensureTrailingSlash(url) {
    return url.endsWith("/") ? url : `${url}/`;
  }

  function absoluteUrl(path) {
    return new URL(path || "", config.siteUrl).href;
  }

  function getMeta(selector) {
    return document.head.querySelector(selector);
  }

  function ensureMeta(attrName, attrValue) {
    let meta = getMeta(`meta[${attrName}="${attrValue}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attrName, attrValue);
      document.head.appendChild(meta);
    }
    return meta;
  }

  function ensureLink(rel) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }
    return link;
  }

  function setMeta(attrName, attrValue, content) {
    const meta = ensureMeta(attrName, attrValue);
    meta.setAttribute("content", content);
    return meta;
  }

  function setCanonical(path) {
    const link = ensureLink("canonical");
    link.href = absoluteUrl(path);
    return link;
  }

  function updateUrlBasedTags() {
    document.querySelectorAll('link[rel="canonical"][data-seo-path]').forEach((link) => {
      link.href = absoluteUrl(link.getAttribute("data-seo-path"));
    });

    document.querySelectorAll('meta[property="og:url"][data-seo-path]').forEach((meta) => {
      meta.content = absoluteUrl(meta.getAttribute("data-seo-path"));
    });

    document.querySelectorAll('meta[property="og:image"][data-seo-image], meta[name="twitter:image"][data-seo-image]').forEach((meta) => {
      const imagePath = meta.getAttribute("data-seo-image") || config.defaultOgImagePath;
      meta.content = absoluteUrl(imagePath);
    });
  }

  function shouldSkipStructuredData() {
    const robots = getMeta('meta[name="robots"]');
    return robots && /noindex/i.test(robots.content || "");
  }

  function buildSiteStructuredData() {
    const organizationId = absoluteUrl("#organization");
    const personId = absoluteUrl("over-arnoud.html#person");
    const personUrl = absoluteUrl("over-arnoud.html");
    const websiteId = absoluteUrl("#website");
    const pageKind = document.documentElement.dataset.seoKind || "page";

    const items = [
      {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        "name": config.siteName,
        "url": config.siteUrl,
        "founder": {
          "@type": "Person",
          "@id": personId,
          "name": config.personName,
          "url": personUrl
        },
        "description": config.organizationDescription,
        "knowsAbout": config.knowsAbout
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": websiteId,
        "name": config.siteName,
        "url": config.siteUrl,
        "inLanguage": "nl-NL",
        "description": config.organizationDescription
      }
    ];

    if (pageKind === "about") {
      items.push({
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": personId,
        "name": config.personName,
        "url": personUrl,
        "worksFor": {
          "@id": organizationId
        },
        "jobTitle": "Oprichter van Volpa",
        "description": "Arnoud Vos begeleidt mensen bij scheiding met aandacht voor rust, overzicht en financiele duidelijkheid."
      });
    }

    return items;
  }

  function injectStructuredData(id, payload) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    if (!payload) {
      return;
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(payload);
    document.head.appendChild(script);
  }

  function initStaticStructuredData() {
    if (shouldSkipStructuredData()) {
      return;
    }

    injectStructuredData("volpa-site-structured-data", buildSiteStructuredData());
  }

  function formatPublishedTime(dateValue) {
    if (!dateValue) {
      return "";
    }

    return /^\d{4}-\d{2}-\d{2}$/.test(dateValue) ? `${dateValue}T00:00:00+00:00` : "";
  }

  function summarizeBody(body) {
    if (!body) {
      return "";
    }

    const cleaned = body
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map((line) => line.replace(/^##\s*/, "").replace(/^-\s*/, "").trim())
      .filter(Boolean)
      .join(" ");

    if (!cleaned) {
      return "";
    }

    if (cleaned.length <= 160) {
      return cleaned;
    }

    return `${cleaned.slice(0, 157).trim()}...`;
  }

  function getBlogArticlePath(post) {
    return post && post.slug ? `blog/${encodeURIComponent(post.slug)}.html` : "blogpost.html";
  }

  function getBlogDescription(post) {
    if (!post) {
      return "Lees een artikel van Volpa over scheiden, mediation, financiele afspraken en begeleiding bij scheiding.";
    }

    return post.summary || summarizeBody(post.body) || "Lees een artikel van Volpa over scheiden, mediation, financiele afspraken en begeleiding bij scheiding.";
  }

  function buildArticleStructuredData(post, path) {
    const title = post && post.title ? post.title : "Artikel over scheiden en mediation";
    const description = getBlogDescription(post);
    const publishedTime = post && post.date ? formatPublishedTime(post.date) : "";
    const articleUrl = absoluteUrl(path);

    const payload = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${articleUrl}#article`,
      "mainEntityOfPage": articleUrl,
      "headline": title,
      "description": description,
      "author": {
        "@type": "Person",
        "name": config.personName,
        "url": absoluteUrl("over-arnoud.html")
      },
      "publisher": {
        "@id": absoluteUrl("#organization")
      },
      "image": absoluteUrl(config.defaultOgImagePath),
      "url": articleUrl
    };

    if (publishedTime) {
      payload.datePublished = publishedTime;
      payload.dateModified = publishedTime;
    }

    if (post && post.category) {
      payload.articleSection = post.category;
    }

    return payload;
  }

  function updateBlogPostSeo(post) {
    const path = getBlogArticlePath(post);
    const title = post && post.title
      ? `${post.title} | Volpa`
      : "Artikel over scheiden, mediation en financiele afspraken | Volpa";
    const description = getBlogDescription(post);
    const publishedTime = post && post.date ? formatPublishedTime(post.date) : "";
    const articleUrl = absoluteUrl(path);
    const imageUrl = absoluteUrl(config.defaultOgImagePath);
    const articleAuthor = `${config.personName} / ${config.siteName}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", "index,follow");
    setCanonical(path);
    setMeta("property", "og:locale", "nl_NL");
    setMeta("property", "og:site_name", config.siteName);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", articleUrl);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "article:author", articleAuthor);
    setMeta("property", "article:published_time", publishedTime);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    if (!shouldSkipStructuredData()) {
      injectStructuredData("volpa-blogpost-structured-data", buildArticleStructuredData(post, path));
    }
  }

  window.VolpaSeo = {
    absoluteUrl,
    updateBlogPostSeo
  };

  updateUrlBasedTags();
  initStaticStructuredData();

  if ((document.documentElement.dataset.seoKind || "") === "blog-post") {
    updateBlogPostSeo(null);
  }
})();
