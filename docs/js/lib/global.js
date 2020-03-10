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