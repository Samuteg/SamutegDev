// ============================================
//  Comment Form - External script for CSP compliance
// ============================================

(function () {
  const form = document.getElementById("comment-form");
  const statusEl = document.getElementById("comment-status");
  const submitBtn = document.getElementById("comment-submit");
  const gotchaField = document.getElementById("comment-gotcha");

  // Type guards - exit early if any element is missing
  if (!form || !statusEl || !submitBtn || !gotchaField) return;

  // Helper: show status message
  function showStatus(message, type = "success") {
    statusEl.textContent = message;
    statusEl.className = `comment-status visible ${type}`;
    if (type === "success") {
      setTimeout(() => {
        statusEl.classList.remove("visible");
      }, 6000);
    }
  }

  // Helper: set field error state
  function setFieldError(field, hasError) {
    field.setAttribute("aria-invalid", String(hasError));
    if (hasError) {
      field.style.borderColor = "#dc2626";
    } else {
      field.style.borderColor = "";
    }
  }

  // Validate required fields + honeypot
  function validateForm() {
    let valid = true;
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        setFieldError(field, true);
        valid = false;
      } else {
        setFieldError(field, false);
      }
    });
    // Honeypot: if filled, it's a bot -> reject silently
    if (gotchaField.checked) {
      return false;
    }
    return valid;
  }

  // Clear errors on input
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => setFieldError(field, false));
  });

  // AJAX submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showStatus("Por favor, preencha todos os campos obrigatórios.", "error");
      return;
    }

    // Disable button & show loading
    submitBtn.disabled = true;
    statusEl.classList.remove("visible");

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        showStatus(
          "🎉 Comentário enviado com sucesso! Obrigado por participar.",
        );
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
      showStatus(
        "Erro de conexão. Verifique sua internet e tente novamente.",
        "error",
      );
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
