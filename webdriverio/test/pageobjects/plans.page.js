const Page = require('./page');

class PlansPage extends Page {
  get loading() { return $('#plan-list > div[role="status"]'); }
  get planTitles() { return $$('.card-title'); }
  get plans() { return $$('.card'); }

  getPlanTitles() {
    this.loading.waitForExist({reverse: true});
    return this.planTitles;
  }

  openPlanByTitle(title) {
    this.loading.waitForExist({reverse: true});
    this.plans.find((elm) => elm.$('.card-title').getText() === title).$('<a>').click();
    browser.waitUntil(() => browser.getWindowHandles().length === 2);
  }
}

module.exports = new PlansPage();
