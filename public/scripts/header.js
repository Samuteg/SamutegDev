// Hamburger menu for mobile navigation
(function () {
    var btn = document.getElementById("hamburger-btn");
    var links = document.getElementById("nav-links");
    if (!btn || !links) return;

    var isOpen = function () {
        return btn.getAttribute("aria-expanded") === "true";
    };

    var sync = function (expanded) {
        btn.setAttribute("aria-expanded", String(expanded));
        btn.setAttribute("aria-label", expanded ? "Fechar menu" : "Abrir menu");
        links.classList.toggle("open", expanded);
        // Trava o scroll do fundo enquanto o menu está aberto (mobile)
        document.documentElement.classList.toggle("nav-locked", expanded);
    };

    btn.addEventListener("click", function () {
        sync(!isOpen());
    });
    links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
            sync(false);
        });
    });
    // Fecha ao tocar/clicar fora do menu
    document.addEventListener("click", function (e) {
        if (!isOpen()) return;
        if (links.contains(e.target) || btn.contains(e.target)) return;
        sync(false);
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") sync(false);
    });
    // Garante estado consistente ao girar o aparelho / voltar ao desktop
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 768 && isOpen()) sync(false);
    });
})();
