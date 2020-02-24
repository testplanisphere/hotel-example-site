import { ready, getUser, getSessionUser, logout } from './global.js';

const DISPLAY_SEX = new Map([
  ['0', '未登録'],
  ['1', '男性'],
  ['2', '女性'],
  ['9', 'その他'],
]);

history.replaceState(null, '', 'mypage.html');

ready(() => {
  const session = getSessionUser();
  if (session === '') {
    location.assign(location.href.replace('mypage.html', 'index.html'));
  }
  const user = getUser(session);
  document.getElementById('email').textContent = user.email;
  document.getElementById('username').textContent = user.username;
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
  document.getElementById('sex').textContent = DISPLAY_SEX.get(user.sex);
  if (user.birthday !== '') {
    document.getElementById('birthday').textContent = user.birthday;
  } else {
    document.getElementById('birthday').textContent = '未登録';
  }
  
  document.getElementById('logout-form').addEventListener('submit', (event) => {
    logout();
  });
});