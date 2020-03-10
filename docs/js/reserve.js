import { ready, redirectToTop, formatCurrency } from './lib/global.js';
import { getSessionUser, getUser } from './lib/session.js';
import { resetCustomValidity, setValidityMessage } from './lib/validation.js';
import { calcTotalBill } from './lib/billing.js';

ready(() => {

  // Check login
  const session = getSessionUser();
  const user = getUser(session);

  // Collect input elements
  const reserveForm = document.getElementById('reserve-form');
  const planIdHidden = document.getElementById('plan-id');
  const planNameHidden = document.getElementById('plan-name');
  const roomBillHidden = document.getElementById('room-bill');
  const dateInput = document.getElementById('date');
  const termInput = document.getElementById('term');
  const headCountInput = document.getElementById('head-count');
  const breakfastInput = document.getElementById('breakfast');
  const earlyCheckInInput = document.getElementById('early-check-in');
  const sightseeingInput = document.getElementById('sightseeing');
  const usernameInput = document.getElementById('username');
  const contactSelect = document.getElementById('contact');
  const emailInput = document.getElementById('email');
  const telInput = document.getElementById('tel');
  const commentTextArea = document.getElementById('comment');
  const totalBillOutput = document.getElementById('total-bill');

  // Get URL params
  const params = new URLSearchParams(location.search);
  const planId = parseInt(params.get('plan-id'), 10);
  if (isNaN(planId)) {
    redirectToTop();
  }

  // fetch selected plan data
  fetch('./data/plan_data.json', { cache: 'no-store' }).then((response) => {
    return response.json();
  }).then((data) => {
    const plan = data.find(val => val.id === planId);
    if (!plan) {
      return Promise.reject();
    }
    // set initialize values
    document.getElementById('plan-name').textContent = plan.name;
    document.getElementById('plan-desc').textContent = `お一人様1泊${formatCurrency(plan.roomBill)}〜、土日は25%アップ`;
    planIdHidden.value = plan.id;
    planNameHidden.value = plan.name;
    roomBillHidden.value = plan.roomBill;
    termInput.min = plan.minTerm;
    termInput.max = plan.maxTerm;
    termInput.value = plan.minTerm;
    headCountInput.min = plan.minHeadCount;
    headCountInput.max = plan.maxHeadCount;
    headCountInput.value = plan.minHeadCount;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = formatDate(tomorrow);
    const total = calcTotalBill(plan.roomBill, tomorrow, plan.minTerm, plan.minHeadCount, false, false, false);
    totalBillOutput.textContent = formatCurrency(total);
  }).catch(() => {
    redirectToTop();
  });

  // set login user data
  if (user) {
    usernameInput.value = user.username;
    emailInput.value = user.email;
    telInput.value = user.tel;
  }

  const updateTotalBill = function() {
    const date = parseDate(dateInput.value);
    if (!date) {
      return;
    }
    const roomBill = parseInt(roomBillHidden.value, 10);
    const term = parseInt(termInput.value, 10);
    const headCount = parseInt(headCountInput.value, 10);
    const totalBill = 
    　　　　calcTotalBill(roomBill, date, term, headCount, breakfastInput.checked, earlyCheckInInput.checked, sightseeingInput.checked);
    totalBillOutput.textContent = formatCurrency(totalBill);
  };

  // Setup datepicker
  $('#date').datepicker({
    showButtonPanel: true,
    maxDate: 90,
    minDate: 1,
    onSelect: function(dateText, inst) {
      updateTotalBill();
    },
  });

  // Setup contact select
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

  // Setup calc total function
  [dateInput, termInput, headCountInput, breakfastInput, earlyCheckInInput, sightseeingInput].forEach((input) => {
    input.addEventListener('change', (event) => {
      resetCustomValidity(event.target);
      if (event.target.id === 'date' && dateInput.checkValidity()) {
        validateDateInput(dateInput);
      }
      if (dateInput.checkValidity() && termInput.checkValidity() && headCountInput.checkValidity()) {
        dateInput.parentElement.classList.remove('was-validated');
        termInput.parentElement.classList.remove('was-validated');
        headCountInput.parentElement.classList.remove('was-validated');
        updateTotalBill();
      } else {
        totalBillOutput.textContent = '-';
        setValidityMessage(dateInput, termInput, headCountInput);
        event.target.parentElement.classList.add('was-validated');
      }
    });
  }); 

  // Setup submit event
  reserveForm.addEventListener('submit', (event) => {
    resetCustomValidity(dateInput, termInput, headCountInput, usernameInput, emailInput, telInput);
    if (dateInput.checkValidity()) {
      validateDateInput(dateInput);
    }
    if (reserveForm.checkValidity()) {
      const reservation = {
        'roomBill': parseInt(roomBillHidden.value, 10),
        'planName': planNameHidden.value,
        'date': dateInput.value.replace(/\//g, '-'),
        'term': parseInt(termInput.value, 10),
        'headCount': parseInt(headCountInput.value, 10),
        'breakfast': breakfastInput.checked,
        'earlyCheckIn': earlyCheckInInput.checked,
        'sightseeing': sightseeingInput.checked,
        'username': usernameInput.value,
        'contact': contactSelect.options[contactSelect.selectedIndex].value,
        'email': emailInput.value,
        'tel':telInput.value,
        'comment': commentTextArea.value,
      };
      const transactionId = genTransactionId();
      sessionStorage.setItem(transactionId, JSON.stringify(reservation));
      document.cookie = `transaction=${transactionId}`;
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidityMessage(dateInput, termInput, headCountInput, usernameInput, emailInput, telInput);
      reserveForm.classList.add('was-validated');
    }
  });
});

/**
 * @param {HTMLInputElement} dateInput 
 */
function validateDateInput(dateInput) {
  const date = parseDate(dateInput.value);
  if (!date) {
    dateInput.setCustomValidity('有効な値を入力してください。');
  } else {
    const now = new Date();
    const after90 = new Date();
    after90.setDate(after90.getDate() + 90);
    if (date.getTime() < now.getTime()) {
      dateInput.setCustomValidity('翌日以降の日付を入力してください。');
    } else if (date.getTime() > after90.getTime()) {
      dateInput.setCustomValidity('3ヶ月以内の日付を入力してください。');
    }
  }
}

/**
 * @param {string} dateString
 * @returns {Date}
 */
function parseDate(dateString) {
  const arr = dateString.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!arr || arr.length !== 4) {
    return null;
  }
  const year = parseInt(arr[1], 10);
  const month = parseInt(arr[2], 10);
  const date = parseInt(arr[3], 10);
  return new Date(year, month - 1, date);
}

/**
 * @param {Date} date
 * @returns {string} 
 */
function formatDate(date) {
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`
}

/**
 * @param {number} number 
 * @returns {string}
 */
function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return '' + number;
}

/**
 * @returns {string}
 */
function genTransactionId() {
  return (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000) + '';
}