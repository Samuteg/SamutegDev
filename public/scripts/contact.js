// Contact Form Enhancements (About page)
// - Honeypot validation
// - AJAX submit (Formspree supports JSON)
// - Success/Error UI feedback

(() => {
    const form = document.getElementById("contact-form");
    const statusEl = document.getElementById("contact-status");
    const submitBtn = form?.querySelector('button[type="submit"]');

    if (!form || !statusEl || !submitBtn) return;

    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    function showStatus(message, type = "success") {
        statusEl.textContent = message;
        statusEl.classList.remove("hidden");
        statusEl.style.display = "block";
        if (type === "success") {
            statusEl.style.background = "color-mix(in srgb, var(--primary) 12%, transparent)";
            statusEl.style.border = "1px solid var(--primary)";
            statusEl.style.color = "var(--primary)";
            setTimeout(() => {
                statusEl.classList.add("hidden");
                statusEl.style.display = "none";
            }, 6000);
        } else {
            statusEl.style.background = "rgba(220, 38, 38, 0.15)";
            statusEl.style.border = "1px solid #dc2626";
            statusEl.style.color = "#f87171";
        }
    }

    function validateForm() {
        let valid = true;
        form.querySelectorAll("[required]").forEach((field) => {
            if (!field.value.trim()) {
                field.setAttribute("aria-invalid", "true");
                field.style.borderColor = "#dc2626";
                valid = false;
            } else {
                field.setAttribute("aria-invalid", "false");
                field.style.borderColor = "";
            }
        });
        // Honeypot
        const gotcha = form.querySelector('[name="_gotcha"]');
        if (gotcha && gotcha.checked) return false;
        return valid;
    }

    form.querySelectorAll("input, textarea").forEach((field) => {
        field.addEventListener("input", () => {
            field.setAttribute("aria-invalid", "false");
            field.style.borderColor = "";
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showStatus("Por favor, preencha todos os campos obrigatórios.", "error");
            return;
        }

        submitBtn.disabled = true;
        if (btnText) btnText.style.display = "none";
        if (btnLoading) btnLoading.style.display = "inline";
        statusEl.classList.add("hidden");

        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                showStatus("Mensagem enviada com sucesso! Obrigado pelo contato.");
                form.reset();
                setTimeout(() => {
                    const nextInput = form.querySelector('[name="_next"]');
                    const nextUrl = nextInput?.value;
                    if (nextUrl) window.location.href = nextUrl;
                }, 2000);
            } else {
                let errorMsg = "Ocorreu um erro ao enviar. Tente novamente.";
                try {
                    const data = await response.json();
                    if (data.errors) {
                        errorMsg = data.errors.map((err) => err.message).join(", ");
                    }
                } catch (_) {}
                showStatus(errorMsg, "error");
            }
        } catch (err) {
            showStatus("Erro de conexão. Verifique sua internet e tente novamente.", "error");
        } finally {
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = "";
            if (btnLoading) btnLoading.style.display = "none";
        }
    });
})();
