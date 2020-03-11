import { ready, formatCurrency } from './lib/global.js';
import { getSessionUser, getUser, setLoginNavbar } from './lib/session.js';

ready(() => {

  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }
  const user = getUser(session);

  // fetch plan data
  fetch('./data/plan_data.json', { cache: 'no-store' }).then((response) => {
    return response.json();
  }).then((data) => {
    const planHtml = data.filter(val => displayPlan(val, user))
        .map(val => genPlanHtml(val))
        .reduce((acc, cur) => acc + cur);
    document.getElementById('plan-list').innerHTML = planHtml;
  });
});

function displayPlan(plan, user) {
  if (plan.id === 0) {
    return false;
  }
  if (plan.only) {
    if (plan.only === 'menber' && user) {
      return true;
    } else if (plan.only === 'premium' && user && user.rank === 'premium') {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function genPlanHtml(plan) {
  return `<div class="col-12 col-md-6 col-lg-4">
<div class="card text-center">
  <div class="card-body">
    <h5 class="card-title">${plan.name}</h5>
      <ul class="list-unstyled">
        <li>大人1名${formatCurrency(plan.roomBill)}</li>
        <li>${plan.minHeadCount}名様から</li>
        <li>${plan.room}</li>
      </ul>
      <a href="./reserve.html?plan-id=${plan.id}" class="btn btn-primary" target="_brank">このプランで予約</a>
    </div>
  </div>
</div>`
}
