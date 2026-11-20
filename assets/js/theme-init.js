(function () {
  const scriptUrl = document.currentScript && document.currentScript.src
    ? new URL(document.currentScript.src, window.location.href)
    : new URL("assets/js/theme-init.js", window.location.href);
  const cssBaseUrl = new URL("../css/", scriptUrl);
  const faviconUrl = new URL("../img/volpa-favicon.svg", scriptUrl);

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }
  favicon.type = "image/svg+xml";
  favicon.href = faviconUrl.href;

  const styles = [
    { id: "main", name: "Huidige stijl", href: new URL("main.css?v=20261120h", cssBaseUrl).href },
    { id: "main_small", name: "Basis rustig", href: new URL("main_small.css", cssBaseUrl).href },
    { id: "main2", name: "Alternatief", href: new URL("main2.css", cssBaseUrl).href },
    { id: "main3", name: "Design 3", href: new URL("main3.css", cssBaseUrl).href },
    { id: "main4", name: "Design 4", href: new URL("main4.css", cssBaseUrl).href },
    { id: "main5", name: "Design 5", href: new URL("main5.css", cssBaseUrl).href },
    { id: "main6", name: "Design 6", href: new URL("main6.css", cssBaseUrl).href },
    { id: "main7", name: "Design 7", href: new URL("main7.css", cssBaseUrl).href },
    { id: "main8", name: "Design 8", href: new URL("main8.css", cssBaseUrl).href },
    { id: "main9", name: "Atelier", href: new URL("main9.css?v=20261120h", cssBaseUrl).href }
  ];
  const storageKey = "volpa-active-style";
  const debugQueryKeys = ["themepanel", "themePanel", "themedebug", "themeDebug", "debugtheme", "debugTheme"];

  window.VOLPA_THEME_STYLES = styles;
  window.VOLPA_THEME_STORAGE_KEY = storageKey;

  const styleMap = Object.fromEntries(styles.map((style) => [style.id, style]));
  const params = new URLSearchParams(window.location.search);
  const queryTheme = params.get("theme");
  const isThemeDebug = debugQueryKeys.some((key) => params.get(key) === "1");
  window.VOLPA_THEME_DEBUG = isThemeDebug;

  let activeId = styles[0].id;
  try {
    const savedId = window.localStorage.getItem(storageKey);
    if (savedId === "main" || savedId === "main9" || (isThemeDebug && styleMap[savedId])) {
      activeId = savedId;
    }
  } catch (error) {
    // Private browsing may block local storage; the default still works.
  }

  if (queryTheme && styleMap[queryTheme]) {
    activeId = queryTheme;
    if (isThemeDebug || queryTheme === "main" || queryTheme === "main9") {
      try {
        window.localStorage.setItem(storageKey, activeId);
      } catch (error) {
        activeId = queryTheme;
      }
    }
  }

  if (!styleMap[activeId]) {
    activeId = styles[0].id;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = styleMap[activeId].href;
  link.id = "site-stylesheet";
  link.setAttribute("data-style-id", activeId);
  document.head.appendChild(link);
})();
