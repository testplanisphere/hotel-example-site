import { ready, isValidUser } from "./global.js";

ready(function() {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", function(event) {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    emailInput.setCustomValidity("");
    passwordInput.setCustomValidity("");
    if (emailInput.checkValidity() && passwordInput.checkValidity()) {
      if (!isValidUser(emailInput.value, passwordInput.value)) {
        emailInput.setCustomValidity("メールアドレスまたはパスワードが違います。");
        passwordInput.setCustomValidity("メールアドレスまたはパスワードが違います。");
      }
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById("email-message").textContent = emailInput.validationMessage;
      document.getElementById("password-message").textContent = passwordInput.validationMessage;
      form.classList.add("was-validated");
    }
  });
});


