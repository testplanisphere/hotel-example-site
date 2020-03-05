import { ready } from './global.js';
import { getSessionUser, logout } from './session.js';
import { resetCustomValidity, setValidityMessage } from './validation.js';

ready(() => {
  const session = getSessionUser();
  if (session) {
    document.getElementById('signup-holder').innerHTML = '<a class="nav-link" href="./mypage.html">マイページ</a>';
    document.getElementById('login-holder').innerHTML
        = '<form action="./index.html" class="form-inline" id="logout-form" novalidate><button type="submit" class="btn btn-outline-success my-2 my-sm-0">ログアウト</button></form>';
    document.getElementById('logout-form').addEventListener('submit', (event) => {
      logout();
    });
  }
  const dateInput = document.getElementById('date');
  const termInput = document.getElementById('term');
  const headCountInput = document.getElementById('head-count');
  const usernameInput = document .getElementById('username');
  const params = new URLSearchParams(document.location.search.substring(1));
  const planId = parseInt(params.get('plan-id'), 10);
  fetch('plan_data.json', { cache: 'no-store' }).then((response) => {
    return response.json();
  }).then((data) => {
    const plan = data.find(val => val.id === planId);
    document.getElementById("plan-name").textContent = plan.name;
    termInput.min = plan.minTerm;
    termInput.max = plan.maxTerm;
    termInput.value = plan.minTerm;
    headCountInput.min = plan.minHeadCount;
    headCountInput.max = plan.maxHeadCount;
    headCountInput.value = plan.minHeadCount;
  });
  const reserveForm = document.getElementById('reserve-form');
  reserveForm.addEventListener('submit', (event) => {
    resetCustomValidity(dateInput, termInput, headCountInput, usernameInput);
    if (reserveForm.checkValidity()) {
      // tbd      
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidityMessage(dateInput, termInput, headCountInput, usernameInput);
      reserveForm.classList.add('was-validated');
    }
  });
});

