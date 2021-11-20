const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    confirm: './src/confirm.js',
    icon: './src/icon.js',
    index: './src/index.js',
    login: './src/login.js',
    mypage: './src/mypage.js',
    plans: './src/plans.js',
    reserve: './src/reserve.js',
    signup: './src/signup.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
};
