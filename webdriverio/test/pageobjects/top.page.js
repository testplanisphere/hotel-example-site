const Page = require('./page');

class TopPage extends Page {

  get loginLink() { return $('=ログイン'); }

  open() {
    super.open('');
  }

}

module.exports = new TopPage();
