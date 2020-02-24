import { ready, resetCustomValidity, setCustomValidityMessage, isValidUser, login } from './global.js';

ready(() => {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', (event) => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    resetCustomValidity(emailInput, passwordInput);
    if (emailInput.checkValidity() && passwordInput.checkValidity()) {
      if (!isValidUser(emailInput.value, passwordInput.value)) {
        emailInput.setCustomValidity('メールアドレスまたはパスワードが違います。');
        passwordInput.setCustomValidity('メールアドレスまたはパスワードが違います。');
      }
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setCustomValidityMessage(emailInput, passwordInput);
      form.classList.add('was-validated');
    } else {
      login(emailInput.value);
    }
  });
});


