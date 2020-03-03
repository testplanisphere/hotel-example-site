export const PRESET_USER = {
  'email': 'ichiro@example.com',
  'password': 'password',
  'username': '山田一郎',
  'rank': 'premium',
  'address': '東京都豊島区池袋',
  'tel': '01234567891',
  'gender': '1',
  'birthday': '',
  'notification': true,
};

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
 * @param  {...HTMLInputElement} inputs 
 */
export function resetCustomValidity(...inputs) {
  inputs.forEach(input => input.setCustomValidity(''));
}

/**
 * @param  {...HTMLInputElement} inputs 
 */
export function setValidityMessage(...inputs) {
  inputs.forEach((input) => {
    document.querySelector(`#${input.id} ~ .invalid-feedback`).textContent = getErrorMessege(input);
  });
}

/**
 * @param {HTMLInputElement} input 
 * @returns {string}
 */
function getErrorMessege(input) {
  if (input.validity.customError) {
    return input.validationMessage;
  } else if (input.validity.valueMissing) {
    return 'このフィールドを入力してください。';
  } else if (input.validity.typeMismatch) {
    if (input.type === 'email') {
      return 'メールアドレスを入力してください。';
    } else if (input.type === 'url') {
      return 'URLを入力してください。';
    } else {
      return '有効な値を入力してください。';
    }
  } else if (input.validity.badInput) {
    return '有効な値を入力してください。';
  } else if (input.validity.patternMismatch) {
    return '指定されている形式で入力してください。';
  } else if (input.validity.tooLong) {
    return `${input.maxLength}文字以内で入力してください。`;
  } else if (input.validity.tooShort) {
    return `${input.minLength}文字以上で入力してください。`;
  } else if (input.validity.rangeOverflow) {
    return `${input.max}以下の値を入力してください。`;
  } else if (input.validity.rangeUnderflow) {
    return `${input.min}以上の値を入力してください。`;
  } else if (input.validity.stepMismatch) {
    return '有効な値を入力してください。';
  }
}

/**
 * @param {string} email 
 * @param {string} password 
 * @returns {boolean}
 */
export function isValidUser(email, password) {
  const user = getUser(email);
  return (user && user.password === password);
}

/**
 * @param {string} email 
 * @returns {object}
 */
export function getUser(email) {
  if (PRESET_USER.email === email) {
    return PRESET_USER;
  }
  const user = localStorage.getItem(email);
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

/**
 * @returns {string}
 */
export function getSessionUser() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, '$1');
}

/**
 * @param {string} email 
 */
export function login(email) {
  document.cookie = `session=${email}; max-age=630720000`;
}

export function logout() {
  document.cookie = 'session=; max-age=0';
}
