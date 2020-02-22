import { ready, getUser, login } from './global.js';

ready(() => {
  const form = document.getElementById('signup-form');
  form.addEventListener('submit', (event) => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmationInput = document.getElementById('password-confirmation');
    const usernameInput = document.getElementById('username');
    const telInput = document.getElementById('tel');
    emailInput.setCustomValidity('');
    passwordInput.setCustomValidity('');
    passwordConfirmationInput.setCustomValidity('');
    usernameInput.setCustomValidity('');
    telInput.setCustomValidity('');
    if (emailInput.checkValidity()) {
      const user = getUser(emailInput.value);
      if (user !== null) {
        emailInput.setCustomValidity('このメールアドレスはすでに登録済みです。');
      }
    }
    if (passwordInput.checkValidity() && passwordConfirmationInput.checkValidity()) {
      if (passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setCustomValidity('入力されたパスワードと一致しません。');
      }
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById('email-message').textContent = emailInput.validationMessage;
      document.getElementById('password-message').textContent = passwordInput.validationMessage;
      document.getElementById('password-confirmation-message').textContent = passwordConfirmationInput.validationMessage;
      document.getElementById('username-message').textContent = usernameInput.validationMessage;
      document.getElementById('tel-message').textContent = telInput.validationMessage;
      form.classList.add('was-validated');
    } else {
      const newUser = {
        'email': emailInput.value,
        'password': passwordInput.value,
        'username': usernameInput.value,
        'tel': telInput.value,
      };
      localStorage.setItem(newUser.email, JSON.stringify(newUser));
      login(newUser.email);
    }
  });
});


