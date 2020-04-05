const Page = require('./page');

class PlansPage extends Page {

  get loading() { return $('#plan-list > div[role="status"]'); }
  get cardTitles() { return $$('.card-title'); }

  getPlanTitles() {
    this.loading.waitForExist({reverse: true});
    return this.cardTitles;
  }

}

module.exports = new PlansPage();
