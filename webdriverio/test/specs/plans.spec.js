const TopPage = require('../pageobjects/top.page');
const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const PlansPage = require('../pageobjects/plans.page');

describe('プラン一覧画面テスト', () => {
  afterEach(() => {
    browser.deleteCookies();
  });

  it('未ログイン状態でプラン一覧が表示されること', () =>{
    TopPage.open();
    TopPage.goToPlansPage();
    const planTitles = PlansPage.getPlanTitles();

    expect(planTitles).toHaveLength(7);
    expect(planTitles[0]).toHaveText('お得な特典付きプラン');
    expect(planTitles[1]).toHaveText('素泊まり');
    expect(planTitles[2]).toHaveText('出張ビジネスプラン');
    expect(planTitles[3]).toHaveText('エステ・マッサージプラン');
    expect(planTitles[4]).toHaveText('貸し切り露天風呂プラン');
    expect(planTitles[5]).toHaveText('カップル限定プラン');
    expect(planTitles[6]).toHaveText('テーマパーク優待プラン');
  });

  it('一般会員でログイン状態でプラン一覧が表示されること', () =>{
    TopPage.open();
    TopPage.goToLoginPage();
    LoginPage.email.setValue('sakura@example.com');
    LoginPage.password.setValue('pass1234');
    LoginPage.submit();
    MyPage.goToPlansPage();
    const planTitles = PlansPage.getPlanTitles();

    expect(planTitles).toHaveLength(9);
    expect(planTitles[0]).toHaveText('お得な特典付きプラン');
    expect(planTitles[1]).toHaveText('ディナー付きプラン');
    expect(planTitles[2]).toHaveText('お得なプラン');
    expect(planTitles[3]).toHaveText('素泊まり');
    expect(planTitles[4]).toHaveText('出張ビジネスプラン');
    expect(planTitles[5]).toHaveText('エステ・マッサージプラン');
    expect(planTitles[6]).toHaveText('貸し切り露天風呂プラン');
    expect(planTitles[7]).toHaveText('カップル限定プラン');
    expect(planTitles[8]).toHaveText('テーマパーク優待プラン');
  });

  it('プレミアム会員でログイン状態でプラン一覧が表示されること', () =>{
    TopPage.open();
    TopPage.goToLoginPage();
    LoginPage.email.setValue('ichiro@example.com');
    LoginPage.password.setValue('password');
    LoginPage.submit();
    MyPage.goToPlansPage();
    const planTitles = PlansPage.getPlanTitles();

    expect(planTitles).toHaveLength(10);
    expect(planTitles[0]).toHaveText('お得な特典付きプラン');
    expect(planTitles[1]).toHaveText('プレミアムプラン');
    expect(planTitles[2]).toHaveText('ディナー付きプラン');
    expect(planTitles[3]).toHaveText('お得なプラン');
    expect(planTitles[4]).toHaveText('素泊まり');
    expect(planTitles[5]).toHaveText('出張ビジネスプラン');
    expect(planTitles[6]).toHaveText('エステ・マッサージプラン');
    expect(planTitles[7]).toHaveText('貸し切り露天風呂プラン');
    expect(planTitles[8]).toHaveText('カップル限定プラン');
    expect(planTitles[9]).toHaveText('テーマパーク優待プラン');
  });
});