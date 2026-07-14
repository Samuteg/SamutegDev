// Theme detection — runs before first paint to prevent FOUC
// Must NOT use defer/async, loaded in <head> as external script
(function () {
    var theme = (function () {
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
            return localStorage.getItem("theme");
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    })();

    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }

    window.localStorage.setItem("theme", theme);
})();
