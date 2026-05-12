(function () {
  const scriptUrl = document.currentScript && document.currentScript.src
    ? new URL(document.currentScript.src, window.location.href)
    : new URL("assets/js/theme-init.js", window.location.href);
  const cssBaseUrl = new URL("../css/", scriptUrl);

  const styles = [
    { id: "main", name: "Basis", href: new URL("main.css", cssBaseUrl).href },
    { id: "main2", name: "Alternatief", href: new URL("main2.css", cssBaseUrl).href },
    { id: "main3", name: "Design 3", href: new URL("main3.css", cssBaseUrl).href },
    { id: "main4", name: "Design 4", href: new URL("main4.css", cssBaseUrl).href },
    { id: "main5", name: "Design 5", href: new URL("main5.css", cssBaseUrl).href },
    { id: "main6", name: "Design 6", href: new URL("main6.css", cssBaseUrl).href },
    { id: "main7", name: "Design 7", href: new URL("main7.css", cssBaseUrl).href },
    { id: "main8", name: "Design 8", href: new URL("main8.css", cssBaseUrl).href }
  ];
  const storageKey = "volpa-active-style";

  window.VOLPA_THEME_STYLES = styles;
  window.VOLPA_THEME_STORAGE_KEY = storageKey;

  const styleMap = Object.fromEntries(styles.map((style) => [style.id, style]));
  const params = new URLSearchParams(window.location.search);
  const queryTheme = params.get("theme");

  let activeId = styles[0].id;

  if (queryTheme && styleMap[queryTheme]) {
    activeId = queryTheme;
    try {
      window.localStorage.setItem(storageKey, activeId);
    } catch (error) {
      activeId = queryTheme;
    }
  } else {
    try {
      activeId = window.localStorage.getItem(storageKey) || styles[0].id;
    } catch (error) {
      activeId = styles[0].id;
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
