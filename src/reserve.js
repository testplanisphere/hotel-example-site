import {ready, redirectToTop} from './lib/global.js';
import {formatCurrency, formatDateShort, parseDate, formatDateISO} from './lib/formater.js';
import {getLocale, getAdditionalPlanPrice} from './lib/i18n.js';
import {getSessionUser, getUser, canDisplayPlan, genTransactionId} from './lib/session.js';
import {resetCustomValidity, setValidityMessage, validateDateInput} from './lib/validation.js';
import {calcTotalBill} from './lib/billing.js';
import {t} from './lib/messages.js';

ready(function() {
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
  const params = location.search.match(/^\?plan-id=(\d+)$/);
  if (!params || params.length !== 2) {
    redirectToTop();
    return;
  }
  const planId = parseInt(params[1], 10);

  // fetch selected plan data
  const url = location.origin + '/data/' + getLocale() + '/plan_data.json?' + (new Date()).getTime();
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    let plan = null;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === planId) {
        plan = data[i];
        break;
      }
    }
    if (!plan || !canDisplayPlan(plan, user)) {
      redirectToTop();
      return;
    }
    // set initialize values
    document.getElementById('plan-name').textContent = plan.name;
    document.getElementById('plan-desc').textContent =
        t('reserve.planDescLong', formatCurrency(plan.roomBill), plan.minHeadCount, plan.maxHeadCount, plan.maxTerm);
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
    dateInput.value = formatDateShort(tomorrow);
    const total = calcTotalBill(plan.roomBill, tomorrow, plan.minTerm, plan.minHeadCount, false, false, false, getAdditionalPlanPrice());
    totalBillOutput.textContent = formatCurrency(total);
    if (plan.roomPage) {
      const roomInfo = document.getElementById('room-info');
      roomInfo.classList.add('embed-responsive', 'embed-responsive-1by1');
      roomInfo.innerHTML =
          '<iframe class="embed-responsive-item" src="./rooms/' + plan.roomPage + '" title="' + t('reserve.roomInfo') + '" name="room"></iframe>';
    }
  });
  xhr.open('GET', url);
  xhr.send();

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
        calcTotalBill(roomBill, date, term, headCount, breakfastInput.checked, earlyCheckInInput.checked, sightseeingInput.checked, getAdditionalPlanPrice());
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
  contactSelect.addEventListener('change', function(event) {
    if (event.target.value === 'no') {
      emailInput.disabled = true;
      emailInput.required = false;
      emailInput.parentElement.classList.remove('d-block');
      emailInput.parentElement.classList.add('d-none');
      telInput.disabled = true;
      telInput.required = false;
      telInput.parentElement.classList.remove('d-block');
      telInput.parentElement.classList.add('d-none');
    } else if (event.target.value === 'email') {
      emailInput.disabled = false;
      emailInput.required = true;
      emailInput.parentElement.classList.remove('d-none');
      emailInput.parentElement.classList.add('d-block');
      telInput.disabled = true;
      telInput.required = false;
      telInput.parentElement.classList.remove('d-block');
      telInput.parentElement.classList.add('d-none');
    } else if (event.target.value === 'tel') {
      emailInput.disabled = true;
      emailInput.required = false;
      emailInput.parentElement.classList.remove('d-block');
      emailInput.parentElement.classList.add('d-none');
      telInput.disabled = false;
      telInput.required = true;
      telInput.parentElement.classList.remove('d-none');
      telInput.parentElement.classList.add('d-block');
    }
  });

  // Setup calc total function
  const inputs = [dateInput, termInput, headCountInput, breakfastInput, earlyCheckInInput, sightseeingInput];
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', function(event) {
      resetCustomValidity(event.target);
      if (event.target.id === 'date' && dateInput.checkValidity()) {
        const dateMessage = validateDateInput(parseDate(dateInput.value));
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
  }

  // Setup submit event
  reserveForm.addEventListener('submit', function(event) {
    resetCustomValidity(dateInput, termInput, headCountInput, usernameInput, emailInput, telInput);
    const dateValue = parseDate(dateInput.value);
    if (dateInput.checkValidity()) {
      const dateMessage = validateDateInput(dateValue);
      if (dateMessage) {
        dateInput.setCustomValidity(dateMessage);
      }
    }
    if (reserveForm.checkValidity()) {
      const reservation = {
        'roomBill': parseInt(roomBillHidden.value, 10),
        'planName': planNameHidden.value,
        'date': formatDateISO(dateValue),
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
      document.cookie = 'transaction=' + transactionId;
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidityMessage(dateInput, termInput, headCountInput, usernameInput, emailInput, telInput);
      reserveForm.classList.add('was-validated');
    }
  });
});
