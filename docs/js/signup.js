import { ready, resetCustomValidity, setCustomValidityMessage, getUser, getSessionUser, login } from './global.js';

ready(() => {
  const session = getSessionUser();
  if (session !== '') {
    location.assign(location.href.replace('signup.html', 'index.html'));
  }
  const signupForm = document.getElementById('signup-form');
  signupForm.addEventListener('submit', (event) => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmationInput = document.getElementById('password-confirmation');
    const usernameInput = document.getElementById('username');
    const addressInput = document.getElementById('address');
    const telInput = document.getElementById('tel');
    const sexSelect = document.getElementById('sex');
    const birthdayInput = document.getElementById('birthday');
    resetCustomValidity(emailInput, passwordInput, passwordConfirmationInput, usernameInput, addressInput, telInput, sexSelect, birthdayInput);
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
    if (signupForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setCustomValidityMessage(emailInput, passwordInput, passwordConfirmationInput, usernameInput, addressInput, telInput, sexSelect, birthdayInput);
      signupForm.classList.add('was-validated');
    } else {
      const newUser = {
        'email': emailInput.value,
        'password': passwordInput.value,
        'username': usernameInput.value,
        'address': addressInput.value,
        'tel': telInput.value,
        'sex': sexSelect.options[sexSelect.selectedIndex].value,
        'birthday': birthdayInput.value,
      };
      localStorage.setItem(newUser.email, JSON.stringify(newUser));
      login(newUser.email);
    }
  });
});
