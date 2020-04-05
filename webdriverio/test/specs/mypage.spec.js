const path = require('path');
const TopPage = require('../pageobjects/top.page');
const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const SignupPage = require('../pageobjects/signup.page');
const IconPage = require('../pageobjects/icon.page');

describe('マイページテスト', () => {
  afterEach(() => {
    browser.deleteCookies();
  });

  it('定義済みユーザの情報が表示されること_ichiro', () => {
    TopPage.open();
    TopPage.loginLink.click();
    LoginPage.email.setValue('ichiro@example.com');
    LoginPage.password.setValue('password');
    LoginPage.submit();

    expect(MyPage.email).toHaveText('ichiro@example.com');
    expect(MyPage.username).toHaveText('山田一郎');
    expect(MyPage.rank).toHaveText('プレミアム会員');
    expect(MyPage.address).toHaveText('東京都豊島区池袋');
    expect(MyPage.tel).toHaveText('01234567891');
    expect(MyPage.gender).toHaveText('男性');
    expect(MyPage.birthday).toHaveText('未登録');
    expect(MyPage.notification).toHaveText('受け取る');
  });

  it('定義済みユーザの情報が表示されること_sakura', () => {
    TopPage.open();
    TopPage.loginLink.click();
    LoginPage.email.setValue('sakura@example.com');
    LoginPage.password.setValue('pass1234');
    LoginPage.submit();

    expect(MyPage.email).toHaveText('sakura@example.com');
    expect(MyPage.username).toHaveText('松本さくら');
    expect(MyPage.rank).toHaveText('一般会員');
    expect(MyPage.address).toHaveText('神奈川県横浜市鶴見区大黒ふ頭');
    expect(MyPage.tel).toHaveText('未登録');
    expect(MyPage.gender).toHaveText('女性');
    expect(MyPage.birthday).toHaveText('2000-04-01');
    expect(MyPage.notification).toHaveText('受け取らない');
  });

  it('定義済みユーザの情報が表示されること_jun', () => {
    TopPage.open();
    TopPage.loginLink.click();
    LoginPage.email.setValue('jun@example.com');
    LoginPage.password.setValue('pa55w0rd!');
    LoginPage.submit();

    expect(MyPage.email).toHaveText('jun@example.com');
    expect(MyPage.username).toHaveText('林潤');
    expect(MyPage.rank).toHaveText('プレミアム会員');
    expect(MyPage.address).toHaveText('大阪府大阪市北区梅田');
    expect(MyPage.tel).toHaveText('01212341234');
    expect(MyPage.gender).toHaveText('その他');
    expect(MyPage.birthday).toHaveText('1988-12-17');
    expect(MyPage.notification).toHaveText('受け取らない');
  });

  it('定義済みユーザの情報が表示されること_yoshiki', () => {
    TopPage.open();
    TopPage.loginLink.click();
    LoginPage.email.setValue('yoshiki@example.com');
    LoginPage.password.setValue('pass-pass');
    LoginPage.submit();

    expect(MyPage.email).toHaveText('yoshiki@example.com');
    expect(MyPage.username).toHaveText('木村良樹');
    expect(MyPage.rank).toHaveText('一般会員');
    expect(MyPage.address).toHaveText('未登録');
    expect(MyPage.tel).toHaveText('01298765432');
    expect(MyPage.gender).toHaveText('未登録');
    expect(MyPage.birthday).toHaveText('1992-08-31');
    expect(MyPage.notification).toHaveText('受け取る');
  });

  it('新規登録したユーザの情報が表示されること', () => {
    TopPage.open();
    TopPage.signupLink.click();
    SignupPage.email.setValue('new-user@gmail.com');
    SignupPage.password.setValue('11111111');
    SignupPage.passwordConfirmation.setValue('11111111');
    SignupPage.username.setValue('田中花子');
    SignupPage.rankNormal.click();
    SignupPage.address.setValue('神奈川県横浜市港区');
    SignupPage.tel.setValue('09876543211');
    SignupPage.gender.selectByVisibleText('女性');
    SignupPage.setBirthday('2000-01-01');
    SignupPage.setNotification(false);
    SignupPage.submit();

    expect(MyPage.email).toHaveText('new-user@gmail.com');
    expect(MyPage.username).toHaveText('田中花子');
    expect(MyPage.rank).toHaveText('一般会員');
    expect(MyPage.address).toHaveText('神奈川県横浜市港区');
    expect(MyPage.tel).toHaveText('09876543211');
    expect(MyPage.gender).toHaveText('女性');
    expect(MyPage.birthday).toHaveText('2000-01-01');
    expect(MyPage.notification).toHaveText('受け取らない');
  });

  it.skip('アイコン設定で画像以外のファイルはエラーとなること', () => {
    TopPage.open();
    TopPage.loginLink.click();
    LoginPage.email.setValue('new-user@gmail.com');
    LoginPage.password.setValue('11111111');
    LoginPage.submit();
    MyPage.iconLink.click();
    const filePath = path.join(__dirname, '..', 'uploadfiles', 'dummy.txt');
    IconPage.icon.setValue(filePath);

    expect(IconPage.iconMessage).toHaveText('画像ファイルを選択してください');
  });

  it.skip('アイコン設定で10KBを越えるファイルはエラーとなること', () => {
    TopPage.open();
    TopPage.loginLink.click();
    LoginPage.email.setValue('new-user@gmail.com');
    LoginPage.password.setValue('11111111');
    LoginPage.submit();
    MyPage.iconLink.click();
    const filePath = path.join(__dirname, '..', 'uploadfiles', '240x240_12.png');
    IconPage.icon.setValue(filePath);

    expect(IconPage.iconMessage).toHaveText('ファイルサイズは10KB以下にしてください。');
  });

  it.skip('設定したアイコンがマイページに表示されること', () => {
    TopPage.open();
    TopPage.loginLink.click();
    LoginPage.email.setValue('new-user@gmail.com');
    LoginPage.password.setValue('11111111');
    LoginPage.submit();
    MyPage.iconLink.click();
    const filePath = path.join(__dirname, '..', 'uploadfiles', '240x240_01.png');
    IconPage.icon.setValue(filePath);
    IconPage.zoom.setValue(80);
    IconPage.color.setValue('#000000');
    IconPage.submit();

    expect(MyPage.iconImage).toExist();
    expect(MyPage.iconImage).toHaveAttribute('width', '70');
    expect(MyPage.iconImage).toHaveProperty('backgroundColor', '#000000');
  });

  it('新規登録したユーザが削除できること', () => {
    TopPage.open();
    TopPage.loginLink.click();
    LoginPage.email.setValue('new-user@gmail.com');
    LoginPage.password.setValue('11111111');
    LoginPage.submit();
    MyPage.delete();

    expect(browser.getAlertText()).toBe('退会すると全ての情報が削除されます。\nよろしいですか？');
    browser.acceptAlert();
    browser.pause(1000);
    expect(browser.getAlertText()).toBe('退会処理を完了しました。ご利用ありがとうございました。');
    browser.acceptAlert();
    expect(browser).toHaveUrl('index.html', {containing: true});
  });
});