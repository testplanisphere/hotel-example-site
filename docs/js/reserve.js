import { ready, formatCurrency } from './lib/global.js';
import { getSessionUser, setLoginNavbar } from './lib/session.js';
import { resetCustomValidity, setValidityMessage } from './lib/validation.js';
import { calcTotalBill } from './lib/billing.js';

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
  const breakfastInput = document.getElementById('breakfast');
  const earlyCheckInInput = document.getElementById('early-check-in');
  const sightseeingInput = document.getElementById('sightseeing');
  const usernameInput = document.getElementById('username');
  const contactSelect = document.getElementById('contact');
  const emailInput = document.getElementById('email');
  const telInput = document.getElementById('tel');
  const totalBillOutput = document.getElementById('total-bill');

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
    // set initialize values
    document.getElementById('plan-name').textContent = plan.name;
    planIdHidden.value = plan.planId;
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
    location.assign(location.href.replace('reserve.html', 'index.html'));
  });

  const updateTotalBill = function() {
    const date = parseDate(dateInput.value);
    if (!date) {
      return;
    }
    const roomBill = parseInt(roomBillHidden.value, 10);
    const term = parseInt(termInput.value, 10);
    const headCount = parseInt(headCountInput.value, 10);
    const totalBill = calcTotalBill(roomBill, date, term, headCount, breakfastInput.checked, earlyCheckInInput.checked, sightseeingInput.checked);
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

  // Setup calc total function
  [dateInput, termInput, headCountInput, breakfastInput, earlyCheckInInput, sightseeingInput].forEach((input) => {
    input.addEventListener('change', (event) => {
      updateTotalBill();
    });
  }); 

  // Setup submit event
  reserveForm.addEventListener('submit', (event) => {
    resetCustomValidity(dateInput, termInput, headCountInput, usernameInput, emailInput, telInput);
    if (dateInput.checkValidity()) {
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
  return number;
}