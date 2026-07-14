// Hamburger menu for mobile navigation
var setupHamburger = function () {
    var btn = document.getElementById("hamburger-btn");
    var links = document.getElementById("nav-links");
    if (!btn || !links) return;
    var toggle = function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        links.classList.toggle("open");
    };
    btn.removeEventListener("click", toggle);
    btn.addEventListener("click", toggle);
    links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
            btn.setAttribute("aria-expanded", "false");
            links.classList.remove("open");
        });
    });
};
setupHamburger();
document.addEventListener("astro:after-swap", setupHamburger);
