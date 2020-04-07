const MyPage = require('../pageobjects/my.page');
const SignupPage = require('../pageobjects/signup.page');
const TopPage = require('../pageobjects/top.page');

describe('登録画面テスト', () => {
  afterEach(() => {
    browser.deleteCookies();
  });

  it('ユーザの新規登録ができること', () => {
    TopPage.open();
    TopPage.goToSignupPage();
    SignupPage.email.setValue('new-user@gmail.com');
    SignupPage.password.setValue('password');
    SignupPage.passwordConfirmation.setValue('password');
    SignupPage.username.setValue('新規ユーザ１');
    SignupPage.rankNormal.click();
    SignupPage.address.setValue('神奈川県横浜市港区');
    SignupPage.tel.setValue('01234567891');
    SignupPage.gender.selectByVisibleText('女性');
    SignupPage.setBirthday('2000-01-01');
    SignupPage.setNotification(true);
    SignupPage.submit();

    expect(MyPage.header).toHaveText('マイページ');
  });

  it('必須項目を未入力にするとエラーとなること', () => {
    TopPage.open();
    TopPage.goToSignupPage();
    SignupPage.email.setValue('');
    SignupPage.password.setValue('');
    SignupPage.passwordConfirmation.setValue('');
    SignupPage.username.setValue('');
    SignupPage.rankPremium.click();
    SignupPage.address.setValue('');
    SignupPage.tel.setValue('');
    SignupPage.gender.selectByVisibleText('回答しない');
    SignupPage.setBirthday('2000-01-01');
    SignupPage.setNotification(false);
    SignupPage.submit();

    expect(SignupPage.emailMessage).toHaveText('このフィールドを入力してください。');
    expect(SignupPage.passwordMessage).toHaveText('このフィールドを入力してください。');
    expect(SignupPage.passwordConfirmationMessage).toHaveText('このフィールドを入力してください。');
    expect(SignupPage.usernameMessage).toHaveText('このフィールドを入力してください。');
    expect(SignupPage.addressMessage).toHaveText('');
    expect(SignupPage.telMessage).toHaveText('');
    expect(SignupPage.genderMessage).toHaveText('');
    expect(SignupPage.birthdayMessage).toHaveText('');
  });

  it('指定のフォーマット外の入力でエラーとなること', () => {
    TopPage.open();
    TopPage.goToSignupPage();
    SignupPage.email.setValue('a');
    SignupPage.password.setValue('1234567');
    SignupPage.passwordConfirmation.setValue('1');
    SignupPage.username.setValue('テストテスト');
    SignupPage.rankNormal.click();
    SignupPage.address.setValue('千葉県千葉市');
    SignupPage.tel.setValue('1234567890');
    SignupPage.gender.selectByVisibleText('その他');
    SignupPage.setBirthday('2000-01-01');
    SignupPage.setNotification(true);
    SignupPage.submit();

    expect(SignupPage.emailMessage).toHaveText('メールアドレスを入力してください。');
    expect(SignupPage.passwordMessage).toHaveText('8文字以上で入力してください。');
    expect(SignupPage.passwordConfirmationMessage).toHaveText('8文字以上で入力してください。');
    expect(SignupPage.usernameMessage).toHaveText('');
    expect(SignupPage.addressMessage).toHaveText('');
    expect(SignupPage.telMessage).toHaveText('指定されている形式で入力してください。');
    expect(SignupPage.genderMessage).toHaveText('');
    expect(SignupPage.birthdayMessage).toHaveText('');
  });

  it('登録済みのメールアドレスはエラーとなること', () => {
    TopPage.open();
    TopPage.goToSignupPage();
    SignupPage.email.setValue('new-user@gmail.com');
    SignupPage.password.setValue('password');
    SignupPage.passwordConfirmation.setValue('password');
    SignupPage.username.setValue('新規ユーザ１');
    SignupPage.rankNormal.click();
    SignupPage.address.setValue('神奈川県横浜市港区');
    SignupPage.tel.setValue('01234567891');
    SignupPage.gender.selectByVisibleText('女性');
    SignupPage.setBirthday('2000-01-01');
    SignupPage.setNotification(true);
    SignupPage.submit();

    expect(SignupPage.emailMessage).toHaveText('このメールアドレスはすでに登録済みです。');
  });

  it('入力パスワードが一致しないとエラーとなること', () => {
    TopPage.open();
    TopPage.goToSignupPage();
    SignupPage.email.setValue('new-user@gmail.com');
    SignupPage.password.setValue('password');
    SignupPage.passwordConfirmation.setValue('123456789');
    SignupPage.rankNormal.click();
    SignupPage.address.setValue('神奈川県横浜市港区');
    SignupPage.tel.setValue('01234567891');
    SignupPage.gender.selectByVisibleText('男性');
    SignupPage.setBirthday('2000-01-01');
    SignupPage.setNotification(true);
    SignupPage.submit();

    expect(SignupPage.passwordConfirmationMessage).toHaveText('入力されたパスワードと一致しません。');
  });
});
