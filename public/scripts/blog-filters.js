// SSG-safe filters: the static HTML always contains ALL posts;
// this enhances ?tag= + live search client-side
// (Astro.url.searchParams is empty at build time).
(function () {
    var params = new URLSearchParams(window.location.search);
    var active = params.get("tag");
    var grid = document.querySelector("[data-posts-grid]");
    var status = document.querySelector("[data-tag-status]");
    var searchInput = document.querySelector("[data-search-input]");
    if (!grid) return;

    var ACTIVE = ["border-primary", "bg-primary", "text-primary-foreground"];
    var IDLE = ["border-input", "text-muted-foreground"];

    function paintPills() {
        document.querySelectorAll("[data-tag-pill]").forEach(function (link) {
            var isActive =
                link.getAttribute("data-tag-filter") === active ||
                ((active === null || active === "") && link.getAttribute("data-tag-filter") === "");
            link.classList.remove.apply(link.classList, ACTIVE.concat(IDLE));
            link.classList.add.apply(link.classList, isActive ? ACTIVE : IDLE);
            if (isActive) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
        });
    }

    function applyFilters() {
        var q = searchInput ? searchInput.value.trim().toLowerCase() : "";
        var cards = Array.from(grid.querySelectorAll("[data-post-card]"));
        var visible = 0;
        cards.forEach(function (card) {
            var tags = (card.getAttribute("data-post-tags") || "").split(",").filter(Boolean);
            var text = card.getAttribute("data-search-text") || "";
            var tagOk = !active || tags.indexOf(active) !== -1;
            var searchOk = !q || text.indexOf(q) !== -1;
            var show = tagOk && searchOk;
            card.style.display = show ? "" : "none";
            if (show) visible++;
        });
        if (status) {
            status.textContent = visible === 1 ? "1 artigo para explorar" : visible + " artigos para explorar";
        }
    }

    paintPills();
    applyFilters();
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }
})();
