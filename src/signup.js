import {ready, redirectToTop} from './lib/global.js';
import {getUser, getSessionUser, login} from './lib/session.js';
import {resetCustomValidity, setValidityMessage} from './lib/validation.js';
import {t} from './lib/messages.js';

const session = getSessionUser();
if (session) {
  redirectToTop();
}
ready(function() {
  // Collect input elements
  const signupForm = document.getElementById('signup-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordConfirmationInput = document.getElementById('password-confirmation');
  const usernameInput = document.getElementById('username');
  const addressInput = document.getElementById('address');
  const telInput = document.getElementById('tel');
  const genderSelect = document.getElementById('gender');
  const birthdayInput = document.getElementById('birthday');

  // Setup submit event
  signupForm.addEventListener('submit', function(event) {
    resetCustomValidity(emailInput, passwordInput, passwordConfirmationInput, usernameInput,
        addressInput, telInput, genderSelect, birthdayInput);

    // Check exsists user
    if (emailInput.checkValidity()) {
      const user = getUser(emailInput.value);
      if (user) {
        emailInput.setCustomValidity(t('validation.existsMail'));
      }
    }

    // Check password
    if (passwordInput.checkValidity() && passwordConfirmationInput.checkValidity()) {
      if (passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setCustomValidity(t('validation.passwordUnmatch'));
      }
    }

    // Submit or error
    if (signupForm.checkValidity()) {
      const rankInput = document.querySelector('input[name="rank"]:checked');
      const notificationInput = document.getElementById('notification');
      const newUser = {
        'email': emailInput.value,
        'password': passwordInput.value,
        'username': usernameInput.value,
        'rank': rankInput.value,
        'address': addressInput.value,
        'tel': telInput.value,
        'gender': genderSelect.options[genderSelect.selectedIndex].value,
        'birthday': birthdayInput.value,
        'notification': notificationInput.checked,
      };

      // store user data
      localStorage.setItem(newUser.email, JSON.stringify(newUser));
      login(newUser.email);
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidityMessage(emailInput, passwordInput, passwordConfirmationInput, usernameInput,
          addressInput, telInput, genderSelect, birthdayInput);
      signupForm.classList.add('was-validated');
    }
  });
});
