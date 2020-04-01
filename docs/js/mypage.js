import { ready, redirectToTop } from './lib/global.js';
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
  redirectToTop();
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

  document.getElementById('logout-form').addEventListener('submit', (event) => {
    logout();
  });

  if (!user.preset) {
    const iconLink = document.getElementById('icon-link');
    iconLink.classList.remove('disabled');
    iconLink.removeAttribute('tabindex');
    iconLink.removeAttribute('aria-disabled');
    document.querySelector('#delete-form > button').disabled = false;
    document.getElementById('delete-form').addEventListener('submit', (event) => {
      if (confirm('退会すると全ての情報が削除されます。\nよろしいですか？')) {
        logout();
        localStorage.removeItem(user.email);
        alert('退会処理を完了しました。ご利用ありがとうございました。')
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }
});
