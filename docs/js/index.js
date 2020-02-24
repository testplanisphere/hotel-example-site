import { ready, getSessionUser, logout } from './global.js';

ready(() => {
  const session = getSessionUser();
  if (session === '') {
    document.getElementById('signup-holder')
        .insertAdjacentHTML('afterbegin', '<a class="nav-link" href="./signup.html">会員登録</a>');
    document.getElementById('login-holder')
        .insertAdjacentHTML('afterbegin', '<a class="btn btn-outline-secondary my-2 my-sm-0" href="./login.html" role="button">ログイン</a>');
  } else {
    document.getElementById('signup-holder')
        .insertAdjacentHTML('afterbegin', '<a class="nav-link" href="./mypage.html">マイページ');
    document.getElementById('login-holder')
        .insertAdjacentHTML('afterbegin', '<form action="./index.html" class="form-inline" id="logout-form"><button type="submit" class="btn btn-outline-success my-2 my-sm-0">ログアウト</button></form>');
  }

  document.getElementById('logout-form').addEventListener('submit', (event) => {
    logout();
  });
});