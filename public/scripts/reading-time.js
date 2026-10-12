// Reading time calculator for blog posts
(function () {
    var proseEl = document.getElementById("prose-content");
    var readingTimeEl = document.getElementById("reading-time");
    if (!proseEl || !readingTimeEl) return;
    var text = proseEl.innerText || proseEl.textContent || "";
    var words = text.trim().split(/\s+/).length;
    var minutes = Math.max(1, Math.ceil(words / 200));
    readingTimeEl.textContent = minutes + " min de leitura";
})();
