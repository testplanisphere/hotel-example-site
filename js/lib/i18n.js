import {MESSAGES as MESSAGES_JA} from '../../data/ja/message.js';
import {MESSAGES as MESSAGES_EN_US} from '../../data/en-US/message.js';
import {PRESET_USERS as PRESET_USERS_JA} from '../../data/ja/user.js';
import {PRESET_USERS as PRESET_USERS_EN_US} from '../../data/en-US/user.js';

const MESSAGES = {
  'ja': MESSAGES_JA,
  'en-US': MESSAGES_EN_US,
};

const PRESET_USERS = {
  'ja': PRESET_USERS_JA,
  'en-US': PRESET_USERS_EN_US,
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
