import { ready } from './lib/global.js';
import { getSessionUser, setLoginNavbar } from './lib/session.js';


history.replaceState(null, '', 'index.html');
ready(() => {

  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }
});
