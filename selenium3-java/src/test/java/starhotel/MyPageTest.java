package starhotel;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
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
import starhotel.pages.SignupPage;
import starhotel.pages.SignupPage.Rank;

@TestMethodOrder(OrderAnnotation.class)
@DisplayName("マイページテスト")
class MyPageTest {

  private static final String URL = "https://takeya0x86.github.io/automation-testing-practice";

  private static WebDriver driver;

  @BeforeAll
  static void initAll() {
    var options = new ChromeOptions();
    if ("true".equals(System.getenv("GITHUB_ACTIONS"))) {
      options.setHeadless(true);
    }
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
  @DisplayName("定義済みユーザの情報が表示されること")
  void testMyPageExistUser() {
    driver.get(URL + "/login.html");

    var loginPage = new LoginPage(driver);
    var myPage = loginPage.doLogin("ichiro@example.com", "password");

    assertAll("マイページ表示項目",
        () -> assertEquals("ichiro@example.com", myPage.getEmail()),
        () -> assertEquals("山田一郎", myPage.getUsername()),
        () -> assertEquals("プレミアム会員", myPage.getRank()),
        () -> assertEquals("東京都豊島区池袋", myPage.getAddress()),
        () -> assertEquals("01234567891", myPage.getTel()),
        () -> assertEquals("男性", myPage.getGender()),
        () -> assertEquals("未登録", myPage.getBirthday()),
        () -> assertEquals("受け取る", myPage.getNotification())
    );
  }

  @Test
  @Order(2)
  @DisplayName("新規登録したユーザの情報が表示されること")
  void testMyPageNewUser() {
    driver.get(URL + "/signup.html");

    var signupPage = new SignupPage(driver);
    signupPage.setEmail("new-user@gmail.com");
    signupPage.setPassword("11111111");
    signupPage.setPasswordConfirmation("11111111");
    signupPage.setUsername("田中花子");
    signupPage.selectRank(Rank.NORMAL);
    signupPage.setAddress("神奈川県横浜市港区");
    signupPage.setTel("09876543211");
    signupPage.selectGender("女性");
    signupPage.setBirthday(LocalDate.parse("2000-01-01"));
    signupPage.checkNotification(false);
    var myPage = signupPage.goToMyPage();

    assertAll("マイページ表示項目",
        () -> assertEquals("ichiro@example.com", myPage.getEmail()),
        () -> assertEquals("山田一郎", myPage.getUsername()),
        () -> assertEquals("プレミアム会員", myPage.getRank()),
        () -> assertEquals("東京都豊島区池袋", myPage.getAddress()),
        () -> assertEquals("01234567891", myPage.getTel()),
        () -> assertEquals("男性", myPage.getGender()),
        () -> assertEquals("未登録", myPage.getBirthday()),
        () -> assertEquals("受け取る", myPage.getNotification())
    );
  }

}
