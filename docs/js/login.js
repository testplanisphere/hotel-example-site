import { ready, redirectToTop } from './lib/global.js';
import { isValidUser, getSessionUser, login } from './lib/session.js';
import { resetCustomValidity, setValidityMessage } from './lib/validation.js';

const session = getSessionUser();
if (session) {
  redirectToTop();
}
ready(() => {

  // Collect input elements
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Setup submit event
  loginForm.addEventListener('submit', (event) => {
    resetCustomValidity(emailInput, passwordInput);

    // Check user
    if (emailInput.checkValidity() && passwordInput.checkValidity()) {
      if (!isValidUser(emailInput.value, passwordInput.value)) {
        emailInput.setCustomValidity('メールアドレスまたはパスワードが違います。');
        passwordInput.setCustomValidity('メールアドレスまたはパスワードが違います。');
      }
    }

    // submit or error
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
