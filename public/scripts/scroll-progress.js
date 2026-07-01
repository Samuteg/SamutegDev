// ============================================
//  Scroll Progress Bar - External script for CSP compliance
// ============================================

(function () {
  function setupScrollProgress() {
    var progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    var updateProgress = function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      var progress = Math.min((scrollTop / docHeight) * 100, 100);
      progressBar.style.width = progress + "%";
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  setupScrollProgress();
  document.addEventListener("astro:after-swap", setupScrollProgress);
})();
