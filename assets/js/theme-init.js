(function () {
  const styles = [
    // Voeg nieuwe designs hier toe, bijvoorbeeld:
    // { id: "main3", name: "Concept 3", href: "assets/css/main3.css" }
    { id: "main", name: "Basis", href: "assets/css/main.css" },
    { id: "main2", name: "Alternatief", href: "assets/css/main2.css" }
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
