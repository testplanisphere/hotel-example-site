import { ready, redirectToTopFrom } from './lib/global.js';
import { getUser, getSessionUser, logout } from './lib/session.js'

const DISPLAY_GENDER = new Map([
  ['0', '未登録'],
  ['1', '男性'],
  ['2', '女性'],
  ['9', 'その他'],
]);

history.replaceState(null, '', 'mypage.html');
const session = getSessionUser();
if (!session) {
  redirectToTopFrom('mypage.html');
}
ready(() => {

  // load user data
  const user = getUser(session);

  // set user data
  document.getElementById('email').textContent = user.email;
  document.getElementById('username').textContent = user.username;
  if (user.rank === 'premium') {
    document.getElementById('rank').textContent = 'プレミアム会員';
  } else if (user.rank === 'normal') {
    document.getElementById('rank').textContent = '一般会員';
  }
  document.getElementById('address').textContent = user.address ? user.address : '未登録';
  document.getElementById('tel').textContent = user.tel ? user.tel : '未登録';
  document.getElementById('gender').textContent = DISPLAY_GENDER.get(user.gender);
  document.getElementById('birthday').textContent = user.birthday ? user.birthday : '未登録';
  document.getElementById('notification').textContent = user.notification ? '受け取る' : '受け取らない';

  document.getElementById('logout-form').addEventListener('submit', (event) => {
    logout();
  });
});
