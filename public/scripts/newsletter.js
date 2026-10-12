// Newsletter form (homepage) — AJAX para o Formspree com honeypot
(function () {
    var form = document.getElementById("newsletter-form");
    var statusEl = document.getElementById("newsletter-status");
    if (!form || !statusEl) return;
    var submitBtn = form.querySelector('button[type="submit"]');

    function showStatus(message) {
        statusEl.textContent = message;
        statusEl.classList.remove("hidden");
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        // Honeypot: se preenchido, finge sucesso silenciosamente
        var gotcha = form.querySelector('[name="_gotcha"]');
        if (gotcha && gotcha.checked) return;

        var email = form.querySelector('[name="email"]');
        if (!email || !email.value.trim() || !email.checkValidity()) {
            email.setAttribute("aria-invalid", "true");
            email.classList.add("border-destructive");
            showStatus("Informe um email válido.");
            return;
        }
        email.setAttribute("aria-invalid", "false");
        email.classList.remove("border-destructive");

        submitBtn.disabled = true;
        submitBtn.classList.add("btn-loading");
        submitBtn.textContent = "Enviando";

        try {
            var res = await fetch("https://formspree.io/f/mgojzqob", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ email: email.value, _subject: "Nova inscrição na newsletter" }),
            });
            if (!res.ok) throw new Error("Falha ao inscrever");
            form.reset();
            showStatus("Inscrição confirmada! Obrigado.");
        } catch (err) {
            showStatus("Falha ao inscrever. Tente novamente.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove("btn-loading");
            submitBtn.textContent = "Inscrever";
        }
    });
})();
