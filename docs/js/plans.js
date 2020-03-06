import { ready, formatCurrency } from './global.js';
import { getSessionUser, setLoginNavbar } from './session.js';

ready(() => {
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
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
        <li>大人1名${formatCurrency(plan.roomBill)}</li>
        <li>${plan.minHeadCount}名様から</li>
        <li>${plan.room}</li>
      </ul>
      <a href="./reserve.html?plan-id=${plan.id}" class="btn btn-primary" target="_brank">このプランで予約</a>
    </div>
  </div>
</div>`
}
