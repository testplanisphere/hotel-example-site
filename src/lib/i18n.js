const MESSAGES = {
  'ja': require('../../data/ja/message.json'),
  'en-US': require('../../data/en-US/message.json'),
};

const PRESET_USERS = {
  'ja': require('../../data/ja/user.json'),
  'en-US': require('../../data/en-US/user.json'),
};

const CURRENCY_FORMATTER = {
  'ja': new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY', currencyDisplay: 'name'}),
  'en-US': new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', currencyDisplay: 'symbol'}),
};

const DATE_LONG_FORMATTER = {
  'ja': new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: 'long', day: 'numeric'}),
  'en-US': new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
};

const DATE_SHORT_FORMATTER = {
  'ja': new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}),
  'en-US': new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}),
};

const DATE_SHORT_PARSER = {
  'ja': function(dateString) {
    const arr = dateString.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
    if (!arr || arr.length !== 4) {
      return null;
    }
    const year = parseInt(arr[1], 10);
    const month = parseInt(arr[2], 10);
    const date = parseInt(arr[3], 10);
    return new Date(year, month - 1, date);
  },
  'en-US': function(dateString) {
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

const ADDITIONAL_PLAN_PRICE = {
  'ja': 1000,
  'en-US': 10.00,
};

/**
 * Get current page locale
 * @returns {string} locale
 */
export function getLocale() {
  return document.getElementsByTagName('html')[0].lang;
}

/**
 * Get localized messages
 * @param {string} locale 
 * @returns {object}
 */
export function getMessages(locale = getLocale()) {
  return MESSAGES[locale];
}

/**
 * Get preset users
 * @param {string} locale 
 * @returns {object}
 */
export function getPresetUsers(locale = getLocale()) {
  return PRESET_USERS[locale];
}

/**
 * Get currency formater
 * @param {string} locale 
 * @returns {Intl.NumberFormat}
 */
export function getCurrencyFormatter(locale = getLocale()) {
  return CURRENCY_FORMATTER[locale];
}

/**
 * Get date long formatter
 * @param {string} locale 
 * @returns {Intl.DateTimeFormat}
 */
export function getDateLongFormatter(locale = getLocale()) {
  return DATE_LONG_FORMATTER[locale];
}

/**
 * Get date short fomatter
 * @param {string} locale 
 * @returns {Intl.DateTimeFormat}
 */
export function getDateShortFormatter(locale = getLocale()) {
  return DATE_SHORT_FORMATTER[locale];
}

/**
 * Get date short parser
 * @param {string} locale 
 * @returns {Function}
 */
export function getDateShortParser(locale = getLocale()) {
  return DATE_SHORT_PARSER[locale];
}

/**
 * Get additional plan price
 * @param {string} locale
 * @returns {number}
 */
export function getAdditionalPlanPrice(locale = getLocale()) {
  return ADDITIONAL_PLAN_PRICE[locale];
}
