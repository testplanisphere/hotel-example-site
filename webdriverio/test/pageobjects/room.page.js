const Page = require('./page');

class RoomPage extends Page {
  get header() { return $('<h5>'); }
}

module.exports = new RoomPage();
