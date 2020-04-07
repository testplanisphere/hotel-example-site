module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "plugins": [
      "wdio"
    ],
    "extends": "plugin:wdio/recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
    }
};