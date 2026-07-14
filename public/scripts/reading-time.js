// Reading time calculator for blog posts
var setupBlogPostFeatures = function () {
    var proseEl = document.getElementById("prose-content");
    var readingTimeEl = document.getElementById("reading-time");
    if (proseEl && readingTimeEl) {
        var text = proseEl.innerText || proseEl.textContent || "";
        var words = text.trim().split(/\s+/).length;
        var minutes = Math.max(1, Math.ceil(words / 200));
        readingTimeEl.textContent = minutes + " min read";
    }
};

setupBlogPostFeatures();
document.addEventListener("astro:after-swap", setupBlogPostFeatures);
