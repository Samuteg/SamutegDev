// Theme detection — runs before first paint to prevent FOUC
// Must NOT use defer/async, loaded in <head> as external script
// Default: dark mode (per design spec — violet editorial identity)
(function () {
    var theme = (function () {
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
            return localStorage.getItem("theme");
        }
        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            return "light";
        }
        return "dark";
    })();

    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.classList.remove("dark");
    }

    window.localStorage.setItem("theme", theme);
})();
