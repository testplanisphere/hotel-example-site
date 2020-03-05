import { ready } from './global.js';
import { isValidUser, getSessionUser, login } from './session.js';
import { resetCustomValidity, setValidityMessage } from './validation.js';

const session = getSessionUser();
if (session) {
  location.assign(location.href.replace('login.html', 'index.html'));
}
ready(() => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  loginForm.addEventListener('submit', (event) => {
    resetCustomValidity(emailInput, passwordInput);
    if (emailInput.checkValidity() && passwordInput.checkValidity()) {
      if (!isValidUser(emailInput.value, passwordInput.value)) {
        emailInput.setCustomValidity('メールアドレスまたはパスワードが違います。');
        passwordInput.setCustomValidity('メールアドレスまたはパスワードが違います。');
      }
    }
    if (loginForm.checkValidity()) {
      login(emailInput.value);
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidityMessage(emailInput, passwordInput);
      loginForm.classList.add('was-validated');
    }
  });
});
