import { ready } from './global.js';
import { getSessionUser, setLoginNavbar } from './session.js';

ready(() => {
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }
});
