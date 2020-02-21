export const PRESET_USER = new Map([
  ['email', 'ichiro@example.com'],
  ['password', 'password'],
  ['name', '山田一郎'],
  ['tel', '01234567891'],
]);

export function ready(handler) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handler);
  } else {
    handler();
  }
}

export function isValidUser(email, password) {
  return (PRESET_USER.get('email') === email && PRESET_USER.get('password') === password);
}
