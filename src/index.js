import {ready} from './lib/global.js';
import {getSessionUser, setLoginNavbar} from './lib/session.js';

ready(function() {
  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }
});
