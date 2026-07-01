// ============================================
//  Scroll Progress Bar - External script for CSP compliance
// ============================================

(function () {
  function setupScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  setupScrollProgress();
  document.addEventListener("astro:after-swap", setupScrollProgress);
})();
