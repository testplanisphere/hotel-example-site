package starhotel;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import starhotel.pages.TopPage;

@DisplayName("ログイン画面テスト")
class LoginTest {

  private static final String URL = "https://takeya0x86.github.io/automation-testing-practice/";

  private static WebDriver driver;

  @BeforeAll
  static void initAll() {
    driver = new ChromeDriver();
  }

  @AfterEach
  void tearDown() {
    driver.manage().deleteAllCookies();
  }

  @AfterAll
  static void tearDownAll() {
    driver.quit();
  }

  @Test
  @DisplayName("定義済みユーザでログインができること")
  void testLoginSuccess() {
    driver.get(URL);

    var topPage = new TopPage(driver);
    var loginPage = topPage.goToLoginPage();
    var myPage = loginPage.doLogin("ichiro@example.com", "password");
    assertEquals("マイページ", myPage.getHeaderText());
  }

  @Test
  @DisplayName("未入力でエラーとなること")
  void testLoginFailBlank() {
    driver.get(URL);

    var topPage = new TopPage(driver);
    var loginPage = topPage.goToLoginPage();
    loginPage.doLogin("", "");
    assertAll("エラーメッセージ",
        () -> assertEquals("このフィールドを入力してください。", loginPage.getEmailMessage()),
        () -> assertEquals("このフィールドを入力してください。", loginPage.getPasswordMessage())
    );


  }

  @Test
  @DisplayName("未登録のユーザでエラーとなること")
  void testLoginFailUnregister() {
    driver.get(URL);

    var topPage = new TopPage(driver);
    var loginPage = topPage.goToLoginPage();
    loginPage.doLogin("error@example.com", "error");
    assertAll("エラーメッセージ",
        () -> assertEquals("メールアドレスまたはパスワードが違います。", loginPage.getEmailMessage()),
        () -> assertEquals("メールアドレスまたはパスワードが違います。", loginPage.getPasswordMessage())
    );
  }

}
