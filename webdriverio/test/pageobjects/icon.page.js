const Page = require('./page');

class IconPage extends Page {

  get icon() { return $('#icon'); }
  get zoom() { return $('#zoom'); }
  get color() { return $('#color'); }
  get submitButton() { return $('#icon-form > button'); }
  get iconMessage() { return $('#icon ~ .invalid-feedback'); }

  submit() {
    this.submitButton.click();
  }
}

module.exports = new IconPage();
