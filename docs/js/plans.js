import { ready } from './global.js';
import { getSessionUser, logout } from './session.js';

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
  fetch('plan_data.json', { cache: 'no-store' }).then((response) => {
    return response.json();
  }).then((data) => {
    const planHtml = data.filter(val => val.id !== 0)
        .map(val => genPlanHtml(val))
        .reduce((acc, cur) => acc + cur);
    document.getElementById('plan-list').innerHTML = planHtml;
  });
});

function genPlanHtml(plan) {
  return `<div class="col-12 col-md-6 col-lg-4">
<div class="card text-center">
  <div class="card-body">
    <h5 class="card-title">${plan.name}</h5>
      <ul class="list-unstyled">
        <li>大人1名${plan.roomBill}円</li>
        <li>1名様から</li>
        <li>${plan.room}</li>
      </ul>
      <a href="./reserve.html?plan-id=${plan.id}" class="btn btn-primary" target="_brank">このプランを見る</a>
    </div>
  </div>
</div>`
}
