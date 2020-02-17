const PRESET_USER = new Map([
  ["email", "ichiro@example.com"],
  ["password", "password"]
]);

function ready(handler) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handler);
  } else {
    handler();
  }
}

function isValidUser(email, password) {
  return (PRESET_USER.get("email") === email && PRESET_USER.get("password") === password)
}

export { PRESET_USER, ready, isValidUser };