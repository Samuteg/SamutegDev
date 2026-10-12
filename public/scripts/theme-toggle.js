// Theme toggle button
(function () {
    var handleToggleClick = function () {
        var element = document.documentElement;
        var isDark = element.getAttribute("data-theme") === "dark";
        var newTheme = isDark ? "light" : "dark";

        element.setAttribute("data-theme", newTheme);
        element.classList.toggle("dark", newTheme === "dark");
        try {
            window.localStorage.setItem("theme", newTheme);
        } catch (e) {
            // storage indisponível — o toggle ainda funciona para a sessão
        }
    };

    var themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", handleToggleClick);
    }
})();
