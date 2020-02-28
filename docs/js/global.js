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
    document.getElementById(`${input.id}-message`).textContent = input.validationMessage;
  });
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
