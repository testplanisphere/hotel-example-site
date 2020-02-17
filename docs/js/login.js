import { ready, isValidUser } from "./global.js";

ready(function() {
  let form = document.getElementById("loginForm");
  form.addEventListener("submit", function(event) {
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
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
      document.getElementById("emailMessage").textContent = emailInput.validationMessage;
      document.getElementById("passwordMessage").textContent = passwordInput.validationMessage;
      form.classList.add("was-validated");
    }
  });
});


