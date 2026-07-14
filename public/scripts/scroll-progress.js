// Reading progress bar fixed at top of viewport
var setupScrollProgress = function () {
    var progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    var updateProgress = function () {
        var scrollTop = window.scrollY;
        var docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) {
            progressBar.style.width = "0%";
            return;
        }
        var progress = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.width = progress + "%";
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
};

setupScrollProgress();
document.addEventListener("astro:after-swap", setupScrollProgress);
