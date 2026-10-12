// Theme detection — runs before first paint to prevent FOUC
// Must NOT use defer/async, loaded in <head> as external script
// Default: dark mode (per design spec — violet editorial identity)
(function () {
    var stored = null;
    try {
        stored = window.localStorage.getItem("theme");
    } catch (e) {
        // storage bloqueado (modo privado / cookies off) — segue com o padrão
    }
    var theme = stored
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";

    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.classList.remove("dark");
    }
})();
