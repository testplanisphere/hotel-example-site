import { ready, getUser, getSessionUser, logout } from './global.js';

const DISPLAY_GENDER = new Map([
  ['0', '未登録'],
  ['1', '男性'],
  ['2', '女性'],
  ['9', 'その他'],
]);

history.replaceState(null, '', 'mypage.html');
const session = getSessionUser();
if (session === '') {
  location.assign(location.href.replace('mypage.html', 'index.html'));
}
ready(() => {
  const user = getUser(session);
  document.getElementById('email').textContent = user.email;
  document.getElementById('username').textContent = user.username;
  if (user.rank === 'premium') {
    document.getElementById('rank').textContent = 'プレミアム会員';
  } else if (user.rank === 'normal') {
    document.getElementById('rank').textContent = '通常会員';
  }
  if (user.address !== '') {
    document.getElementById('address').textContent = user.address;
  } else {
    document.getElementById('address').textContent = '未登録';
  }
  if (user.tel !== '') {
    document.getElementById('tel').textContent = user.tel;
  } else {
    document.getElementById('tel').textContent = '未登録';
  }
  document.getElementById('gender').textContent = DISPLAY_GENDER.get(user.gender);
  if (user.birthday !== '') {
    document.getElementById('birthday').textContent = user.birthday;
  } else {
    document.getElementById('birthday').textContent = '未登録';
  }
  document.getElementById('notification').textContent = user.notification ? '受け取る' : '受け取らない'
  
  document.getElementById('logout-form').addEventListener('submit', (event) => {
    logout();
  });
});
