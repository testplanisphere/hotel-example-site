import { ready, getSessionUser, logout } from './global.js';

ready(() => {
  const session = getSessionUser();
  if (session) {
    document.getElementById('signup-holder').innerHTML = '<a class="nav-link" href="./mypage.html">マイページ</a>';
    document.getElementById('login-holder').innerHTML
        = '<form action="./index.html" class="form-inline" id="logout-form" novalidate><button type="submit" class="btn btn-outline-success my-2 my-sm-0">ログアウト</button></form>';
    document.getElementById('logout-form').addEventListener('submit', (event) => {
      logout();
    });
  }
});
