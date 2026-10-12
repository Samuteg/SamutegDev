// Share buttons: copiar link para a área de transferência
(function () {
    document.querySelectorAll("[data-copy-link]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var url = btn.getAttribute("data-copy-link");
            var done = function (msg) {
                var el = btn.querySelector(".copy-feedback");
                if (el) {
                    el.textContent = msg;
                    setTimeout(function () {
                        el.textContent = "";
                    }, 2000);
                }
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(
                    function () {
                        done("Link copiado!");
                    },
                    function () {
                        done("Falha ao copiar");
                    },
                );
            } else {
                var tmp = document.createElement("textarea");
                tmp.value = url;
                document.body.appendChild(tmp);
                tmp.select();
                try {
                    document.execCommand("copy");
                    done("Link copiado!");
                } catch (e) {
                    done("Falha ao copiar");
                }
                document.body.removeChild(tmp);
            }
        });
    });
})();
