import {getMessages} from './i18n.js';

/**
 * Get translated message
 * @param {string} key
 * @param {...string} params
 * @return {string} 
 */
export function t(key, ...params) {
  let messageStore = getMessages();
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
