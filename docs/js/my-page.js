import { ready, getUser, getSessionUser } from './global.js';

history.replaceState(null, '', 'my-page.html');
ready(() => {
  const session = getSessionUser();
  if (session === null) {
    return;
  }
  const user = getUser(session);
  document.getElementById('email').textContent = user.email;
  document.getElementById('username').textContent = user.username;
  document.getElementById('tel').textContent = user.tel;
});