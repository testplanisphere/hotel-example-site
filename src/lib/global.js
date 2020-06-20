/**
 * Onready event handler
 * @param {function(): void} handler
 */
export function ready(handler) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handler);
  } else {
    handler();
  }
}

/**
 * Redirect to top page
 */
export function redirectToTop() {
  let path;
  if (location.pathname.split('/').length === 2) {
    path = location.pathname.replace(/(\/.+\.html)/, '/index.html');
  } else {
    path = location.pathname.replace(/(\/.+)(\/.+\.html)/, '$1/index.html');
  }
  location.assign(location.origin + path);
}
