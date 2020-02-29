package starhotel;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import starhotel.pages.LoginPage;
import starhotel.pages.TopPage;

@TestMethodOrder(OrderAnnotation.class)
@DisplayName("ログイン画面テスト")
class LoginTest {

  private static final String URL = "https://takeya0x86.github.io/automation-testing-practice/login.html";

  private static WebDriver driver;

  @BeforeAll
  static void initAll() {
    var options = new ChromeOptions();
    options.setHeadless(true);
    driver = new ChromeDriver(options);
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
  @Order(1)
  @DisplayName("定義済みユーザでログインができること")
  void testLoginSuccess() {
    driver.get(URL);

    var loginPage = new LoginPage(driver);
    var myPage = loginPage.doLogin("ichiro@example.com", "password");
    assertEquals("マイページ", myPage.getHeaderText());
  }

  @Test
  @Order(2)
  @DisplayName("未入力でエラーとなること")
  void testLoginFailBlank() {
    driver.get(URL);

    var loginPage = new LoginPage(driver);
    loginPage.doLogin("", "");
    assertAll("エラーメッセージ",
        () -> assertEquals("このフィールドを入力してください。", loginPage.getEmailMessage()),
        () -> assertEquals("このフィールドを入力してください。", loginPage.getPasswordMessage())
    );


  }

  @Test
  @Order(3)
  @DisplayName("未登録のユーザでエラーとなること")
  void testLoginFailUnregister() {
    driver.get(URL);

    var loginPage = new LoginPage(driver);
    loginPage.doLogin("error@example.com", "error");
    assertAll("エラーメッセージ",
        () -> assertEquals("メールアドレスまたはパスワードが違います。", loginPage.getEmailMessage()),
        () -> assertEquals("メールアドレスまたはパスワードが違います。", loginPage.getPasswordMessage())
    );
  }

}
