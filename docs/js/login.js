import { ready, resetCustomValidity, setValidityMessage, isValidUser, getSessionUser, login } from './global.js';

const session = getSessionUser();
if (session !== '') {
  location.assign(location.href.replace('login.html', 'index.html'));
}
ready(() => {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    resetCustomValidity(emailInput, passwordInput);
    if (emailInput.checkValidity() && passwordInput.checkValidity()) {
      if (!isValidUser(emailInput.value, passwordInput.value)) {
        emailInput.setCustomValidity('メールアドレスまたはパスワードが違います。');
        passwordInput.setCustomValidity('メールアドレスまたはパスワードが違います。');
      }
    }
    if (loginForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidityMessage(emailInput, passwordInput);
      loginForm.classList.add('was-validated');
    } else {
      login(emailInput.value);
    }
  });
});
