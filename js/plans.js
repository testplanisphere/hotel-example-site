import {ready, formatCurrency} from './lib/global.js';
import {getSessionUser, getUser, setLoginNavbar, canDisplayPlan} from './lib/session.js';

ready(() => {
  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }
  const user = getUser(session);

  // fetch plan data
  fetch('./data/plan_data.json', {cache: 'no-store'}).then((response) => {
    return response.json();
  }).then((data) => {
    const planHtml = data.filter((val) => val.id !== 0 && canDisplayPlan(val, user))
        .map((val) => genPlanHtml(val))
        .reduce((acc, cur) => acc + cur);
    document.getElementById('plan-list').innerHTML = planHtml;
  });
});

/**
 * Generate plan HTML
 * @param {onject} plan plan data
 * @return {string} plan HTML
 */
function genPlanHtml(plan) {
  let header = '';
  if (plan.only === 'premium') {
    header = '<div class="card-header">❤️プレミアム会員限定❤️</div>'
  } else if (plan.only === 'member') {
    header = '<div class="card-header">会員限定</div>'
  }
  return `<div class="col-12 col-md-6 col-lg-4">
<div class="card text-center shadow-sm mb-3">
  ${header}
  <div class="card-body">
    <h5 class="card-title">${plan.name}</h5>
      <ul class="list-unstyled">
        <li>大人1名${formatCurrency(plan.roomBill)}</li>
        <li>${plan.minHeadCount}名様から</li>
        <li>${plan.room}</li>
      </ul>
      <a href="./reserve.html?plan-id=${plan.id}" class="btn btn-primary" target="_blank">このプランで予約</a>
    </div>
  </div>
</div>`;
}
