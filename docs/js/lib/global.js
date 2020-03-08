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

/**
 * @param {string} from 
 */
export function redirectToTopFrom(from) {
  location.assign(location.href.replace(from, 'index.html'));
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
export function formatDateLong(date) {
  return dateLongFormatter.format(date);
}