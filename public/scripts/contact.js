// Contact Form Enhancements (About page)
// - Honeypot validation
// - AJAX submit (Formspree supports JSON)
// - Success/Error UI feedback

(() => {
    const form = document.getElementById("contact-form");
    const statusEl = document.getElementById("contact-status");
    const submitBtn = form?.querySelector(".contact-submit");

    if (!form || !statusEl || !submitBtn) return;

    function showStatus(message, type = "success") {
        statusEl.textContent = message;
        statusEl.className = "form-status visible " + type;
        if (type === "success") {
            setTimeout(() => {
                statusEl.classList.remove("visible");
            }, 6000);
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
        statusEl.classList.remove("visible");

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
        }
    });
})();
