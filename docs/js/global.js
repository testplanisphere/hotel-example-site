const ERROR_MESSAGES = new Map([
  ['valueMissing', 'このフィールドを入力してください。'],
  ['typeMismatch', 'メールアドレスを入力してください。'],
  ['patternMismatch', '指定されている形式で入力してください。'],
  ['tooLong', '文字以内で入力してください。'],
  ['tooShort', '文字以上で入力してください。'],
]);

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

export function ready(handler) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handler);
  } else {
    handler();
  }
}

export function resetCustomValidity(...inputs) {
  inputs.forEach(input => input.setCustomValidity(''));
}

export function setCustomValidityMessage(...inputs) {
  inputs.forEach((input) => {
    document.getElementById(`${input.id}-message`).textContent = getErrorMessege(input);
  });
}

function getErrorMessege(input) {
  if (input.validity.customError) {
    return input.validationMessage;
  } else if (input.validity.valueMissing) {
    return ERROR_MESSAGES.get('valueMissing');
  } else if (input.validity.typeMismatch) {
    return ERROR_MESSAGES.get('typeMismatch');
  } else if (input.validity.patternMismatch) {
    return ERROR_MESSAGES.get('patternMismatch');
  } else if (input.validity.tooLong) {
    return input.maxLength + ERROR_MESSAGES.get('tooLong');
  } else if (input.validity.tooShort) {
    return input.minLength + ERROR_MESSAGES.get('tooShort');
  }
}

export function isValidUser(email, password) {
  const user = getUser(email);
  return (user !== null && user.password === password);
}

export function getUser(email) {
  if (PRESET_USER.email === email) {
    return PRESET_USER;
  }
  const user = localStorage.getItem(email);
  if (user !== null) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

export function getSessionUser() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, '$1');
}

export function login(email) {
  document.cookie = `session=${email}; max-age=630720000`;
}

export function logout() {
  document.cookie = 'session=; max-age=0';
}
