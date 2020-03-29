/**
 * @param {function(): void} handler 
 */
export function ready(handler) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handler);
  } else {
    handler();
  }
}

export function redirectToTop() {
  const path = location.pathname.replace(/(\/.+)(\/.+\.html)/, '$1/index.html');
  location.assign(`${location.origin}${path}`);
}

const currencyFormatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', currencyDisplay: 'name' });
/**
 * @param {number} num
 * @returns {string}
 */
export function formatCurrency(num) {
  return currencyFormatter.format(num);
}

const dateLongFormatter = new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
/**
 * @param {Date} date 
 * @returns {string}
 */
export function formatDateLong(date) {
  return dateLongFormatter.format(date);
}

/**
 * @param {string} dateString
 * @returns {Date}
 */
export function parseDate(dateString) {
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
 * @param {string} dateString
 * @returns {Date}
 */
export function parseDateISO(dateString) {
  const arr = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!arr || arr.length !== 4) {
    return null;
  }
  const year = parseInt(arr[1], 10);
  const month = parseInt(arr[2], 10);
  const date = parseInt(arr[3], 10);
  return new Date(year, month - 1, date);
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
 * @param {Date} date
 * @returns {string} 
 */
export function formatDate(date) {
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
}
