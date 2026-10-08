// Hamburger menu for mobile navigation
var setupHamburger = function () {
    var btn = document.getElementById("hamburger-btn");
    var links = document.getElementById("nav-links");
    if (!btn || !links) return;
    var sync = function (expanded) {
        btn.setAttribute("aria-expanded", String(expanded));
        btn.setAttribute("aria-label", expanded ? "Fechar menu" : "Abrir menu");
        links.classList.toggle("open", expanded);
    };
    var toggle = function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        sync(!expanded);
    };
    var close = function () {
        sync(false);
    };
    btn.removeEventListener("click", toggle);
    btn.addEventListener("click", toggle);
    links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", close);
    });
    document.removeEventListener("keydown", setupHamburger._onKey);
    setupHamburger._onKey = function (e) {
        if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", setupHamburger._onKey);
};
setupHamburger();
document.addEventListener("astro:after-swap", setupHamburger);
