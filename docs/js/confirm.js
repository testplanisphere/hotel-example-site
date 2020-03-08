import { ready, redirectToTopFrom, formatCurrency, formatDateLong } from './lib/global.js';
import { getSessionUser, setLoginNavbar, getTransactionId, deleteTransactionId } from './lib/session.js';
import { calcTotalBill } from './lib/billing.js';

history.replaceState(null, '', 'confirm.html');

ready(() => {

  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }

  // load data
  const transactionId = getTransactionId();
  const reservation = JSON.parse(sessionStorage.getItem(transactionId));
  deleteTransactionId();
  sessionStorage.removeItem(transactionId);

  // create contents
  const reserveDate = parseDateISO(reservation.date);
  const endDate = new Date(reserveDate.getFullYear(), reserveDate.getMonth(), reserveDate.getDate() + reservation.term);
  const totalBill = calcTotalBill(reservation.roomBill, reserveDate, reservation.term, 
      reservation.headCount, reservation.breakfast, reservation.earlyCheckIn, reservation.sightseeing);

  // set result
  document.getElementById('total-bill').textContent = `合計 ${formatCurrency(totalBill)}（税込み）`;
  document.getElementById('plan-name').textContent = reservation.planName;
  document.getElementById('plan-desc').textContent = `お一人様1泊${formatCurrency(reservation.roomBill)}〜、土日は25%アップ`;
  document.getElementById('term').textContent = `期間：${formatDateLong(reserveDate)} 〜 ${formatDateLong(endDate)} ${reservation.term}泊`;
  document.getElementById('head-count').textContent = `ご人数：${reservation.headCount}名様`;
  let plansHtml = '';
  if (reservation.breakfast) {
    plansHtml += '<li>朝食バイキング</li>';
  }
  if (reservation.earlyCheckIn) {
    plansHtml += '<li>昼からチェックインプラン</li>';
  }
  if (reservation.sightseeing) {
    plansHtml += '<li>お得な観光プラン</li>';
  }
  if (plansHtml.length > 0) {
    plansHtml = `追加プラン<ul>${plansHtml}</ul>`;
  } else {
    plansHtml = '追加プラン：なし';
  }
  document.getElementById('plans').innerHTML = plansHtml;
  document.getElementById('username').textContent = `お名前：${reservation.username}様`;
  let contactText = '確認のご連絡：';
  if (reservation.contact === 'no') {
    contactText += '希望しない';
  } else if (reservation.contact === 'email') {
    contactText += `メール：${reservation.email}`;
  } else if (reservation.contact === 'tel') {
    contactText += `電話：${reservation.tel}`;
  }
  document.getElementById('contact').textContent = contactText;
  document.getElementById('comment').textContent = reservation.comment;
});

/**
 * @param {string} dateString
 * @returns {Date}
 */
function parseDateISO(dateString) {
  const arr = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!arr || arr.length !== 4) {
    return null;
  }
  const year = parseInt(arr[1], 10);
  const month = parseInt(arr[2], 10);
  const date = parseInt(arr[3], 10);
  return new Date(year, month - 1, date);
}