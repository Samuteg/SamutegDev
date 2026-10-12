// Hamburger menu for mobile navigation
(function () {
    var btn = document.getElementById("hamburger-btn");
    var links = document.getElementById("nav-links");
    if (!btn || !links) return;

    var sync = function (expanded) {
        btn.setAttribute("aria-expanded", String(expanded));
        btn.setAttribute("aria-label", expanded ? "Fechar menu" : "Abrir menu");
        links.classList.toggle("open", expanded);
    };
    btn.addEventListener("click", function () {
        sync(btn.getAttribute("aria-expanded") !== "true");
    });
    links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
            sync(false);
        });
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") sync(false);
    });
})();
