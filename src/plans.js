import {ready} from './lib/global.js';
import {formatCurrency} from './lib/formater.js';
import {getLocale} from './lib/i18n.js';
import {getSessionUser, getUser, setLoginNavbar, canDisplayPlan} from './lib/session.js';
import {t} from './lib/messages.js';

ready(function() {
  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }
  const user = getUser(session);

  // fetch plan data
  const url = location.origin + '/data/' + getLocale() + '/plan_data.json';
  fetch(url, {cache: 'no-store'}).then(function(response) {
    return response.json();
  }).then(function(data) {
    const planHtml = data.filter(function(val) {
      return val.id !== 0 && canDisplayPlan(val, user);
    }).map(function(val) {
      return genPlanHtml(val);
    }).reduce(function(acc, cur) {
      return acc + cur;
    });
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
    header = '<div class="card-header">' + t('plans.premiumOnly') + '</div>';
  } else if (plan.only === 'member') {
    header = '<div class="card-header">' + t('plans.memberOnly') + '</div>';
  }
  return '<div class="col-12 col-md-6 col-lg-4">' +
'<div class="card text-center shadow-sm mb-3">' + 
  header + 
  '<div class="card-body">' +
    '<h5 class="card-title">' + plan.name + '</h5>' +
      '<ul class="list-unstyled">' +
        '<li>' + t('plans.oneAdult', formatCurrency(plan.roomBill)) + '</li>' +
        '<li>' + t('plans.minHeadCount', plan.minHeadCount) + '</li>' +
        '<li>' + plan.room + '</li>' +
      '</ul>' +
      '<a href="./reserve.html?plan-id=' + plan.id + '" class="btn btn-primary" target="_blank">' + t('plans.reserveLink') + '</a>' +
    '</div>' +
  '</div>' +
'</div>';
}
