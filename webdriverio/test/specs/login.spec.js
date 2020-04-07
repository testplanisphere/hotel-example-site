const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const TopPage = require('../pageobjects/top.page');

describe('ログイン画面テスト', () => {
  afterEach(() => {
    browser.deleteCookies();
  });

  it('定義済みユーザでログインができること', () => {
    TopPage.open();
    TopPage.goToLoginPage();
    LoginPage.email.setValue('ichiro@example.com');
    LoginPage.password.setValue('password');
    LoginPage.submit();

    expect(MyPage.header).toHaveText('マイページ');
  });

  it('未入力でエラーとなること', () => {
    TopPage.open();
    TopPage.goToLoginPage();
    LoginPage.email.setValue('');
    LoginPage.password.setValue('');
    LoginPage.submit();

    expect(LoginPage.emailMessage).toHaveText('このフィールドを入力してください。');
    expect(LoginPage.passwordMessage).toHaveText('このフィールドを入力してください。');
  });

  it('未登録のユーザでエラーとなること', () => {
    TopPage.open();
    TopPage.goToLoginPage();
    LoginPage.email.setValue('error@example.com');
    LoginPage.password.setValue('error');
    LoginPage.submit();

    expect(LoginPage.emailMessage).toHaveText('メールアドレスまたはパスワードが違います。');
    expect(LoginPage.passwordMessage).toHaveText('メールアドレスまたはパスワードが違います。');
  });
});
