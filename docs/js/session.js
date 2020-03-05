const PRESET_USERS = [
  {
    'email': 'ichiro@example.com',
    'password': 'password',
    'username': '山田一郎',
    'rank': 'premium',
    'address': '東京都豊島区池袋',
    'tel': '01234567891',
    'gender': '1',
    'birthday': '',
    'notification': true,
  },
  {
    'email': 'sakura@example.com',
    'password': 'pass1234',
    'username': '松本さくら',
    'rank': 'normal',
    'address': '神奈川県横浜市鶴見区大黒ふ頭',
    'tel': '',
    'gender': '2',
    'birthday': '2000-04-01',
    'notification': false,
  },
  {
    'email': 'jun@example.com',
    'password': 'pa55w0rd!',
    'username': '林潤',
    'rank': 'premium',
    'address': '大阪府大阪市北区梅田',
    'tel': '01212341234',
    'gender': '9',
    'birthday': '1988-12-17',
    'notification': false,
  },
  {
    'email': 'yoshiki@example.com',
    'password': 'pass-pass',
    'username': '木村良樹',
    'rank': 'normal',
    'address': '',
    'tel': '01298765432',
    'gender': '0',
    'birthday': '1992-08-31',
    'notification': true,
  },
];

/**
 * @param {string} email 
 * @param {string} password 
 * @returns {boolean}
 */
export function isValidUser(email, password) {
  const user = getUser(email);
  return (user && user.password === password);
}

/**
 * @param {string} email 
 * @returns {object}
 */
export function getUser(email) {
  let user = PRESET_USERS.find(val => val.email === email);
  if (user) {
    return user;
  }
  user = localStorage.getItem(email);
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

/**
 * @returns {string}
 */
export function getSessionUser() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, '$1');
}

/**
 * @param {string} email 
 */
export function login(email) {
  document.cookie = `session=${email}; max-age=630720000`;
}

export function logout() {
  document.cookie = 'session=; max-age=0';
}
