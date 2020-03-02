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
  fetch('plan_data.json').then((response) => {
    return response.json();
  }).then((data) => {
    let planHtml = '';
    for (const plan of data) {
      if (plan.id === 0) {
        continue;
      }
      planHtml += `<div class="col-12 col-md-6 col-lg-4">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">${plan.name}</h5>
          <ul class="list-unstyled">
            <li>大人1名${plan.roomBill}円</li>
            <li>1名様から</li>
            <li>${plan.room}</li>
          </ul>
          <a href="#" class="btn btn-primary">このプランを見る</a>
        </div>
      </div>
    </div>`
    }
    document.getElementById('plan-list').innerHTML = planHtml;
  });
});
