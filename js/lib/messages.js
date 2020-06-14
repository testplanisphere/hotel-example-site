import {getLocale} from './global.js';
import {MESSAGES as MESSAGES_JA} from '../../data/ja/message.js';

const MESSAGES = {
  'ja': MESSAGES_JA,
};

/**
 * Get translated message
 * @param {string} key
 * @param {...string} params
 * @return {string} 
 */
export function t(key, ...params) {
  let messageStore = MESSAGES[getLocale()];
  const keys = key.split('.');
  let message;
  for (const k of keys) {
    message = messageStore[k];
    if (typeof message === 'string') {
      break;
    } else {
      messageStore = messageStore[k];
    }
  }
  for (const p of params) {
    message = message.replace('{}', p);
  }
  return message;
}
