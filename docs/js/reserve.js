import { ready } from './lib/global.js';
import { getSessionUser, setLoginNavbar } from './lib/session.js';
import { resetCustomValidity, setValidityMessage } from './lib/validation.js';

ready(() => {

  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }

  // Collect input elements
  const reserveForm = document.getElementById('reserve-form');
  const planIdHidden = document.getElementById('plan-id');
  const roomBillHidden = document.getElementById('room-bill');
  const dateInput = document.getElementById('date');
  const termInput = document.getElementById('term');
  const headCountInput = document.getElementById('head-count');
  const usernameInput = document.getElementById('username');
  const contactSelect = document.getElementById('contact');
  const emailInput = document.getElementById('email');
  const telInput = document.getElementById('tel');

  // Get URL params
  const params = new URLSearchParams(document.location.search.substring(1));
  const planId = parseInt(params.get('plan-id'), 10);
  if (isNaN(planId)) {
    location.assign(location.href.replace('reserve.html', 'index.html'));
  }

  // fetch selected plan data
  fetch('plan_data.json', { cache: 'no-store' }).then((response) => {
    return response.json();
  }).then((data) => {
    const plan = data.find(val => val.id === planId);
    if (!plan) {
      return Promise.reject();
    }
    document.getElementById('plan-name').textContent = plan.name;
    planIdHidden.value = plan.planId;
    roomBillHidden.value = plan.roomBill;
    termInput.min = plan.minTerm;
    termInput.max = plan.maxTerm;
    termInput.value = plan.minTerm;
    headCountInput.min = plan.minHeadCount;
    headCountInput.max = plan.maxHeadCount;
    headCountInput.value = plan.minHeadCount;
  }).catch(() => {
    location.assign(location.href.replace('reserve.html', 'index.html'));
  });

  // Setup datepicker
  $('#date').datepicker({
    showButtonPanel: true,
    maxDate: 90,
    minDate: 1,
  });

  // Setup contant select
  contactSelect.addEventListener('change', (event) => {
    if (event.target.value === 'no') {
      emailInput.disabled = true;
      emailInput.required = false;
      emailInput.parentElement.classList.replace('d-block', 'd-none');
      telInput.disabled = true;
      telInput.required = false;
      telInput.parentElement.classList.replace('d-block', 'd-none');
    } else if (event.target.value === 'email') {
      emailInput.disabled = false;
      emailInput.required = true;
      emailInput.parentElement.classList.replace('d-none', 'd-block');
      telInput.disabled = true;
      telInput.required = false;
      telInput.parentElement.classList.replace('d-block', 'd-none');
    } else if (event.target.value === 'tel') {
      emailInput.disabled = true;
      emailInput.required = false;
      emailInput.parentElement.classList.replace('d-block', 'd-none');
      telInput.disabled = false;
      telInput.required = true;
      telInput.parentElement.classList.replace('d-none', 'd-block');
    }
  });

  // Setup submit event
  reserveForm.addEventListener('submit', (event) => {
    resetCustomValidity(dateInput, termInput, headCountInput, usernameInput, emailInput, telInput);
    if (reserveForm.checkValidity()) {
      // tbd      
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidityMessage(dateInput, termInput, headCountInput, usernameInput, emailInput, telInput);
      reserveForm.classList.add('was-validated');
    }
  });
});
