import { PRESET_USER ,ready } from './global.js';

ready(() => {
  window.history.replaceState(null, '', 'my-page.html');
  document.getElementById('email').textContent = PRESET_USER.get('email');
  document.getElementById('name').textContent = PRESET_USER.get('name');
  document.getElementById('tel').textContent = PRESET_USER.get('tel');
});