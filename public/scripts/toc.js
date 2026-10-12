// Table of Contents for blog posts
// Works without SSR `headings` (glob loader returns []):
// generates slugs for h2/h3 inside #prose-content, builds the list and observes.
(function () {
    function slugify(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/-+/g, "-");
    }
    var aside = document.querySelector("[data-toc]");
    var list = document.querySelector("[data-toc-list]");
    if (!aside || !list) return;
    var prose = document.getElementById("prose-content");
    var heads = prose ? prose.querySelectorAll("h2, h3") : [];
    var seen = {};
    // Se o SSR já renderizou itens, apenas garante ids nos headings.
    if (list.children.length > 0) {
        heads.forEach(function (h) {
            if (!h.id) {
                var base = slugify(h.textContent || "secao") || "secao";
                var n = (seen[base] = (seen[base] || 0) + 1);
                h.id = n > 1 ? base + "-" + n : base;
            }
        });
    } else {
        heads.forEach(function (h) {
            var base = slugify(h.textContent || "secao") || "secao";
            var n = (seen[base] = (seen[base] || 0) + 1);
            var id = h.id || (n > 1 ? base + "-" + n : base);
            h.id = id;
            var li = document.createElement("li");
            li.className = "toc-item toc-depth-" + (h.tagName === "H3" ? 3 : 2);
            var a = document.createElement("a");
            a.href = "#" + id;
            a.setAttribute("data-toc-link", id);
            a.textContent = h.textContent;
            li.appendChild(a);
            list.appendChild(li);
        });
    }
    if (list.children.length === 0) {
        aside.setAttribute("data-empty", "true");
        return;
    }
    var links = list.querySelectorAll("[data-toc-link]");
    if (!("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) {
        map[a.getAttribute("data-toc-link")] = a;
    });
    var obs = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (e) {
                var a = map[e.target.id];
                if (!a) return;
                if (e.isIntersecting) {
                    links.forEach(function (l) {
                        l.classList.remove("toc-active");
                    });
                    a.classList.add("toc-active");
                }
            });
        },
        { rootMargin: "-20% 0px -70% 0px" },
    );
    Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) obs.observe(el);
    });
})();
