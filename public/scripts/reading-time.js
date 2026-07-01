// ============================================
//  Reading Time - External script for CSP compliance
// ============================================

function setupBlogPostFeatures() {
    const proseEl = document.getElementById("prose-content");
    const readingTimeEl = document.getElementById("reading-time");
    if (proseEl && readingTimeEl) {
        const text = proseEl.innerText || proseEl.textContent || "";
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(words / 200));
        readingTimeEl.textContent = `${minutes} min read`;
    }
}

setupBlogPostFeatures();
document.addEventListener("astro:after-swap", setupBlogPostFeatures);
