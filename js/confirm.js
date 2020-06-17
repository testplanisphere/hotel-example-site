import {ready, redirectToTop} from './lib/global.js';
import {formatCurrency, formatDateLong, parseDateISO} from './lib/formater.js';
import {getTransactionId, deleteTransactionId} from './lib/session.js';
import {calcTotalBill} from './lib/billing.js';
import {t} from './lib/messages.js';

history.replaceState(null, '', 'confirm.html');

ready(() => {
  // load data
  const transactionId = getTransactionId();
  if (!transactionId) {
    redirectToTop();
    return;
  }
  const data = sessionStorage.getItem(transactionId);
  if (!data) {
    redirectToTop();
    return;
  }
  const reservation = JSON.parse(data);
  deleteTransactionId();
  sessionStorage.removeItem(transactionId);

  // create contents
  const reserveDate = parseDateISO(reservation.date);
  const endDate = new Date(reserveDate.getFullYear(), reserveDate.getMonth(), reserveDate.getDate() + reservation.term);
  const totalBill = calcTotalBill(reservation.roomBill, reserveDate, reservation.term,
      reservation.headCount, reservation.breakfast, reservation.earlyCheckIn, reservation.sightseeing);

  // set result
  document.getElementById('total-bill').textContent = t('reserve.totalBill', formatCurrency(totalBill));
  document.getElementById('plan-name').textContent = reservation.planName;
  document.getElementById('plan-desc').textContent = t('reserve.planDescShort', formatCurrency(reservation.roomBill));
  document.getElementById('term').textContent = t('reserve.term', formatDateLong(reserveDate), formatDateLong(endDate), reservation.term);
  document.getElementById('head-count').textContent = t('reserve.headCount', reservation.headCount);
  let plansHtml = '';
  if (reservation.breakfast) {
    plansHtml += `<li>${t('reserve.breakfast')}</li>`;
  }
  if (reservation.earlyCheckIn) {
    plansHtml += `<li>${t('reserve.earlyCheckIn')}</li>`;
  }
  if (reservation.sightseeing) {
    plansHtml += `<li>${t('reserve.sightseeing')}</li>`;
  }
  if (plansHtml.length > 0) {
    plansHtml = `<ul>${plansHtml}</ul>`;
  } else {
    plansHtml = t('reserve.none');
  }
  document.getElementById('plans').innerHTML = plansHtml;
  document.getElementById('username').textContent = t('reserve.username', reservation.username);
  let contactText = '';
  if (reservation.contact === 'no') {
    contactText += t('reserve.contact.no');
  } else if (reservation.contact === 'email') {
    contactText += t('reserve.contact.email', reservation.email);
  } else if (reservation.contact === 'tel') {
    contactText += t('reserve.contact.tel', reservation.tel);
  }
  document.getElementById('contact').textContent = contactText;
  document.getElementById('comment').textContent = reservation.comment ? reservation.comment : t('reserve.none');

  $('#success-modal').on('hidden.bs.modal', function() {
    window.close();
  });
});
