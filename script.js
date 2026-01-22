/* ==================================================
   FORMULÁRIO PROFISSIONAL (TEMPLATE PREMIUM)
   - Validação
   - Feedback de erro/sucesso
   - Envio via WhatsApp
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  // Se algum elemento não existir, não roda (evita erros)
  if (!form || !successMessage) return;

  // Cria mensagem de erro (Bootstrap Alert)
  const errorMessage = document.createElement("div");
  errorMessage.className = "alert alert-danger mt-3 d-none";
  errorMessage.id = "errorMessage";
  errorMessage.innerText = "❌ Ocorreu um erro. Verifique os dados e tente novamente.";
  form.appendChild(errorMessage);

  // Botão submit
  const submitBtn = form.querySelector("button[type='submit']");

  // Função de validação de email simples
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Função para validar telefone (aceita 10 a 15 dígitos)
  const isValidPhone = (phone) => {
    const onlyNumbers = phone.replace(/\D/g, "");
    return onlyNumbers.length >= 10 && onlyNumbers.length <= 15;
  };

  // Mostrar alertas
  const showSuccess = (message) => {
    successMessage.innerHTML = `✅ ${message}`;
    successMessage.classList.remove("d-none");
    errorMessage.classList.add("d-none");
  };

  const showError = (message) => {
    errorMessage.innerHTML = `❌ ${message}`;
    errorMessage.classList.remove("d-none");
    successMessage.classList.add("d-none");
  };

  const resetAlerts = () => {
    successMessage.classList.add("d-none");
    errorMessage.classList.add("d-none");
  };

  // Evento submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    resetAlerts();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Validações
    if (nome.length < 3) {
      showError("Por favor, digite seu nome completo.");
      return;
    }

    if (!isValidEmail(email)) {
      showError("Digite um e-mail válido.");
      return;
    }

    if (!isValidPhone(telefone)) {
      showError("Digite um telefone válido com DDD (ex: 11999999999).");
      return;
    }

    if (mensagem.length < 5) {
      showError("Digite uma mensagem mais completa.");
      return;
    }

    // Loading no botão
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Enviando...";
    submitBtn.disabled = true;

    // ✅ NÚMERO DO WHATSAPP (coloque o número do médico aqui)
    const whatsappNumber = "5511910526709";

    // Mensagem formatada para WhatsApp
    const textoWhats = `
🩺 *Agendamento de Consulta - Psiquiatria*

👤 *Nome:* ${nome}
📧 *E-mail:* ${email}
📞 *Telefone:* ${telefone}

📝 *Mensagem:*
${mensagem}

✅ Gostaria de agendar uma consulta.
    `.trim();

    // Abrir WhatsApp com mensagem pronta
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      textoWhats
    )}`;

    // Mostra sucesso e redireciona para WhatsApp
    showSuccess("Mensagem pronta! Você será encaminhado para o WhatsApp agora.");

    setTimeout(() => {
      window.open(whatsappURL, "_blank");

      // Reset formulário
      form.reset();

      // Volta botão ao normal
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }, 900);

    // (Opcional) Esconde mensagem depois de alguns segundos
    setTimeout(() => {
      resetAlerts();
    }, 7000);
  });
});
