// ============================================
//  Theme Toggle - External script for CSP compliance
// ============================================

(function () {
  // Initialize theme on first load (before any navigation)
  function initTheme() {
    var theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }

  // Run immediately (inline script in BaseHead already does this, but this ensures toggle UI is correct)
  initTheme();

  var setupThemeToggle = function () {
    var handleToggleClick = function () {
      var element = document.documentElement;
      var isDark = element.getAttribute("data-theme") === "dark";
      var newTheme = isDark ? "light" : "dark";

      element.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };

    var themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
      themeToggleBtn.removeEventListener("click", handleToggleClick);
      themeToggleBtn.addEventListener("click", handleToggleClick);
    }
  };

  setupThemeToggle();

  // Re-attach after Astro navigation (View Transitions)
  document.addEventListener("astro:after-swap", function () {
    var theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", theme);
    setupThemeToggle();
  });
})();
