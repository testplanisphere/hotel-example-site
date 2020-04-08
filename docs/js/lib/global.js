/**
 * Onready event handler
 * @param {function(): void} handler
 */
export function ready(handler) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handler);
  } else {
    handler();
  }
}

/**
 * Redirect to top page
 */
export function redirectToTop() {
  let path;
  if (location.pathname.split('/').length === 2) {
    path = location.pathname.replace(/(\/.+\.html)/, '/index.html');
  } else {
    path = location.pathname.replace(/(\/.+)(\/.+\.html)/, '$1/index.html');
  }
  location.assign(`${location.origin}${path}`);
}

const currencyFormatter = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY', currencyDisplay: 'name'});
/**
 * Format currency to XXXX円
 * @param {number} num
 * @return {string} XXXX円
 */
export function formatCurrency(num) {
  return currencyFormatter.format(num);
}

const dateLongFormatter = new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: 'long', day: 'numeric'});
/**
 * Format date to yyyy年MM月dd日
 * @param {Date} date
 * @return {string} yyyy年MM月dd日
 */
export function formatDateLong(date) {
  return dateLongFormatter.format(date);
}

/**
 * Parse date from yyyy/MM/dd
 * @param {string} dateString
 * @return {Date} date
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
 * Parse date from yyyy-MM-dd
 * @param {string} dateString
 * @return {Date} date
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
 * Pad zero
 * @param {number} number
 * @return {string} 0X string
 */
function pad(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

/**
 * Format date to yyyy/MM/dd
 * @param {Date} date
 * @return {string} yyyy/MM/dd
 */
export function formatDate(date) {
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
}
