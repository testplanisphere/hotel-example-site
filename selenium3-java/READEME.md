## selenium3-java

### 概要

#### フレームワーク

[Selenium WebDriver](https://www.selenium.dev/)

#### プログラミング言語

Java

#### テスティングフレームワーク

[JUnit 5](https://junit.org/junit5/)

#### ビルドツール

[Gradle](https://gradle.org/)

### 実行方法

#### 必須環境

* JDK 11以上
* Google Chrome
* [ChromeDriver](https://chromedriver.chromium.org/downloads)

Firefoxで実行する場合

* Mozilla Firefox
* [geckodriver](https://github.com/mozilla/geckodriver/releases)

ChromeDriver、geckodriverはダウンロード・展開して環境変数`PATH`の通った場所においてください。


#### Windows

```
gradlew.bat cleanTest test
```

#### macOS/Linux

```
./gradlew cleanTest test
```

#### Firefoxの場合

```
BROWSER=firefox ./gradlew cleanTest test
```