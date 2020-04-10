import {ready, redirectToTop, formatCurrency, formatDate, parseDate} from './lib/global.js';
import {getSessionUser, getUser, canDisplayPlan, genTransactionId} from './lib/session.js';
import {resetCustomValidity, setValidityMessage, validateDateInput} from './lib/validation.js';
import {calcTotalBill} from './lib/billing.js';

ready(() => {
  // Check login
  const session = getSessionUser();
  const user = getUser(session);

  // Collect input elements
  const reserveForm = document.getElementById('reserve-form');
  const planIdHidden = document.getElementById('plan-id-hidden');
  const planNameHidden = document.getElementById('plan-name-hidden');
  const roomBillHidden = document.getElementById('room-bill-hidden');
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
  fetch('./data/plan_data.json', {cache: 'no-store'}).then((response) => {
    return response.json();
  }).then((data) => {
    const plan = data.find((val) => val.id === planId);
    if (!plan || !canDisplayPlan(plan, user)) {
      return Promise.reject(new Error());
    }
    // set initialize values
    document.getElementById('plan-name').textContent = plan.name;
    document.getElementById('plan-desc').textContent =
        `お一人様1泊${formatCurrency(plan.roomBill)}〜、土日は25%アップ。${plan.minHeadCount}名様〜${plan.maxHeadCount}名様、最長${plan.maxTerm}泊`;
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
    if (plan.roomPage) {
      const roomInfo = document.getElementById('room-info');
      roomInfo.classList.add('embed-responsive', 'embed-responsive-1by1');
      roomInfo.innerHTML = `<iframe class="embed-responsive-item" src="./rooms/${plan.roomPage}" title="部屋情報" name="room"></iframe>`;
    }
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
    onSelect: function() {
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
        const dateMessage = validateDateInput(dateInput.value);
        if (dateMessage) {
          dateInput.setCustomValidity(dateMessage);
        }
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
      const dateMessage = validateDateInput(dateInput.value);
      if (dateMessage) {
        dateInput.setCustomValidity(dateMessage);
      }
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
        'tel': telInput.value,
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
