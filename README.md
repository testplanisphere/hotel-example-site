# automation-testing-practice

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4ce9681-8e05-42d7-8070-c93b4f4319d4/deploy-status)](https://app.netlify.com/sites/hotel-example-site/deploys)

## このサイトはテスト自動化の学習のためのデモサイトです

Seleniumなどのブラウザテスト自動化を学習したい方が利用しやすいテスト対象サイトとして作成しています。

学習のほか、書籍やブログなどでのサンプルやデモなどにもお使いいただけます。

自動テストの学習を主目的として作成していますが、テスト設計のお題などにも使用可能です。

### サイトの構成

ホテルの予約サイトを模した作りになっています。ログイン・会員登録・ホテルの宿泊予約のそれぞれの入力フォームを用意しています。レスポンシブデザインに対応しているためモバイルブラウザでも表示できます。

#### ご利用上の注意

* 2020年4月時点でのGoogle Chrome、Mozilla Firefoxの最新版で動作確認をしています。
* **Internet Explorerでは動作しません。**
* サイトはGitHub Pagesでホストされています。
* 入力データについて
  * データはブラウザのCookieおよびSession Storage、Local Storageに保存されます。
  * DBなどサーバ側での保存はありません。
  * HTMLの仕様上、フォームへの入力内容はURLの末尾に付加されて送信されます。Githubサーバのログなどに残る可能性があるのでお気をつけください。
* JMeter、Gatlingなどサイトに負荷のかかるテストはおやめください。
* このサイトを利用することによって生じた損害などにつきましては、一切の責任を負いません。

### ローカル環境での実行方法

```
python -m http.server 9999
```

### 変更履歴

#### v1.1.0 (2020-04-29)

* サンプルコードにSelenide、Capybaraを追加

#### v1.0.0 (2020-04-14)

* 正式リリース
