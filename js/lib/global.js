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

/**
 * Get current page locale
 * @returns {string} locale
 */
export function getLocale() {
  return document.getElementsByTagName('html')[0].lang;
}

const CURRENCY_FORMATTER = {
  'ja': new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY', currencyDisplay: 'name'}),
  'en-US': new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', currencyDisplay: 'symbol'}),
};
/**
 * Format currency
 * @param {number} num
 * @return {string} formated text
 */
export function formatCurrency(num) {
  return CURRENCY_FORMATTER[getLocale()].format(num);
}

const DATE_LONG_FORMATTER = {
  'ja': new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: 'long', day: 'numeric'}),
  'en-US': new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
};
/**
 * Format date (long format)
 * @param {Date} date
 * @return {string} formated text
 */
export function formatDateLong(date) {
  return DATE_LONG_FORMATTER[getLocale()].format(date);
}

const DATE_SHORT_PARSER = {
  'ja': (dateString) => {
    const arr = dateString.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
    if (!arr || arr.length !== 4) {
      return null;
    }
    const year = parseInt(arr[1], 10);
    const month = parseInt(arr[2], 10);
    const date = parseInt(arr[3], 10);
    return new Date(year, month - 1, date);
  },
  'en-US': (dateString) => {
    const arr = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!arr || arr.length !== 4) {
      return null;
    }
    const year = parseInt(arr[3], 10);
    const month = parseInt(arr[1], 10);
    const date = parseInt(arr[2], 10);
    return new Date(year, month - 1, date);
  },
};
/**
 * Parse date from yyyy/MM/dd
 * @param {string} dateString
 * @return {Date} date
 */
export function parseDate(dateString) {
  return DATE_SHORT_PARSER[getLocale()](dateString);
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
 * Format date to ISO-format
 * @param {Date} date 
 * @returns {string} string
 */
export function formatDateISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Parse date from ISO-format
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

const DATE_SHORT_FORMATTER = {
  'ja': new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}),
  'en-US': new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}),
};
/**
 * Format date (short format)
 * @param {Date} date
 * @return {string} formated text
 */
export function formatDateShort(date) {
  return DATE_SHORT_FORMATTER[getLocale()].format(date);
}
