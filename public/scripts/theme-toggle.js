// Theme toggle button
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

document.addEventListener("astro:after-swap", function () {
    var isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light",
    );
    setupThemeToggle();
});
