const Page = require('./page');

class ConfirmPage extends Page {

  get totalBill() { return $('#total-bill'); }
  get planName() { return $('#plan-name'); }
  get term() { return $('#term'); }
  get headCount() { return $('#head-count'); }
  get plans() { return $('#plans'); }
  get username() { return $('#username'); }
  get contact() { return $('#contact'); }
  get comment() { return $('#comment'); }
  get confirmButton() { return $('button[data-target="#success-modal"]'); }
  get successModal() { return $('#success-modal'); }
  get modalMessage() { return $('#success-modal > div > div > .modal-body'); }
  get closeButton() { return $('#success-modal > div > div > div > button'); }

  confirm() {
    this.confirmButton.click();
    this.successModal.waitForDisplayed();
  }

  close() {
    this.closeButton.click();
  }

}

module.exports = new ConfirmPage();
