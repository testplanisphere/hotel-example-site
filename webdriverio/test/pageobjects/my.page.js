const Page = require('./page');

class MyPage extends Page {

  get header() { return $('<h2>'); }

}

module.exports = new MyPage();
