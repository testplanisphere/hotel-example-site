const Page = require('./page');

class TopPage extends Page {

  get loginLink() { return $('=ログイン'); }
  get signupLink() { return $('=会員登録'); }
  get planLink() { return $('=宿泊予約'); }

  open() {
    super.open('');
  }

}

module.exports = new TopPage();
