import {ready, redirectToTop, formatDateLong, parseDateISO} from './lib/global.js';
import {getUser, getSessionUser, logout} from './lib/session.js';
import {t} from './lib/messages.js';

const DISPLAY_GENDER = new Map([
  ['0', t('user.gender.unregistered')],
  ['1', t('user.gender.male')],
  ['2', t('user.gender.female')],
  ['9', t('user.gender.other')],
]);

history.replaceState(null, '', 'mypage.html');
const session = getSessionUser();
if (!session) {
  redirectToTop();
}
ready(() => {
  // load user data
  const user = getUser(session);
  if (!user) {
    return;
  }

  // set user data
  document.getElementById('email').textContent = user.email;
  document.getElementById('username').textContent = user.username;
  if (user.rank === 'premium') {
    document.getElementById('rank').textContent = t('user.rank.premium');
  } else if (user.rank === 'normal') {
    document.getElementById('rank').textContent = t('user.rank.normal');
  }
  document.getElementById('address').textContent = user.address ? user.address : t('user.unregistered');
  document.getElementById('tel').textContent = user.tel ? user.tel : t('user.unregistered');
  document.getElementById('gender').textContent = DISPLAY_GENDER.get(user.gender);
  document.getElementById('birthday').textContent =
      user.birthday ? formatDateLong(parseDateISO(user.birthday)) : t('user.unregistered');
  document.getElementById('notification').textContent = user.notification ? t('user.notification.true') : t('user.notification.false');

  // set icon
  if (user.icon) {
    const img = document.createElement('img');
    img.classList.add('img-thumbnail');
    img.src = user.icon.image;
    img.width = user.icon.width;
    img.height = user.icon.height;
    img.style.backgroundColor = user.icon.color;
    const iconHolder = document.getElementById('icon-holder');
    iconHolder.innerHTML = '';
    iconHolder.appendChild(img);
  }

  document.getElementById('logout-form').addEventListener('submit', () => {
    logout();
  });

  if (!user.preset) {
    const iconLink = document.getElementById('icon-link');
    iconLink.classList.remove('disabled');
    iconLink.removeAttribute('tabindex');
    iconLink.removeAttribute('aria-disabled');
    document.querySelector('#delete-form > button').disabled = false;
    document.getElementById('delete-form').addEventListener('submit', (event) => {
      if (confirm(t('user.deleteConfirm'))) {
        logout();
        localStorage.removeItem(user.email);
        alert(t('user.deleteComplete'));
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }
});
