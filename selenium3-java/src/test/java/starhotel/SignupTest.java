package starhotel;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static starhotel.Utils.BASE_URL;

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
import starhotel.pages.SignupPage.Gender;
import starhotel.pages.SignupPage.Rank;
import starhotel.pages.TopPage;

@TestMethodOrder(OrderAnnotation.class)
@DisplayName("登録画面テスト")
class SignupTest {

  private static WebDriver driver;

  @BeforeAll
  static void initAll() {
    driver = Utils.createWebDriver();
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
  @DisplayName("ユーザの新規登録ができること")
  void testSignupSuccess() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);

    var signupPage = topPage.goToSignupPage();
    signupPage.setEmail("new-user@gmail.com");
    signupPage.setPassword("password");
    signupPage.setPasswordConfirmation("password");
    signupPage.setUsername("新規ユーザ１");
    signupPage.setRank(Rank.一般会員);
    signupPage.setAddress("神奈川県横浜市港区");
    signupPage.setTel("01234567891");
    signupPage.setGender(Gender.女性);
    signupPage.setBirthday(LocalDate.parse("2000-01-01"));
    signupPage.setNotification(true);
    var myPage = signupPage.goToMyPage();

    assertEquals("マイページ", myPage.getHeaderText());
  }

  @Test
  @Order(2)
  @DisplayName("必須項目を未入力にするとエラーとなること")
  void testSignupErrorBlank() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);

    var signupPage = topPage.goToSignupPage();
    signupPage.setEmail("");
    signupPage.setPassword("");
    signupPage.setPasswordConfirmation("");
    signupPage.setUsername("");
    signupPage.setRank(Rank.プレミアム会員);
    signupPage.setAddress("");
    signupPage.setTel("");
    signupPage.setGender(Gender.未登録);
    signupPage.setBirthday(LocalDate.parse("2000-01-01"));
    signupPage.setNotification(false);
    signupPage.goToMyPageExpectingFailure();

    assertAll("エラーメッセージ",
        () -> assertEquals("このフィールドを入力してください。", signupPage.getEmailMessage()),
        () -> assertEquals("このフィールドを入力してください。", signupPage.getPasswordMessage()),
        () -> assertEquals("このフィールドを入力してください。", signupPage.getPasswordConfirmationMessage()),
        () -> assertEquals("このフィールドを入力してください。", signupPage.getUsernameMessage()),
        () -> assertEquals("", signupPage.getAddressMessage()),
        () -> assertEquals("", signupPage.getTelMessage()),
        () -> assertEquals("", signupPage.getGenderMessage()),
        () -> assertEquals("", signupPage.getBirthdayMessage())
    );
  }

  @Test
  @Order(3)
  @DisplayName("指定のフォーマット外の入力でエラーとなること")
  void testSignupErrorInvalid() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);

    var signupPage = topPage.goToSignupPage();
    signupPage.setEmail("a");
    signupPage.setPassword("1234567");
    signupPage.setPasswordConfirmation("1");
    signupPage.setUsername("テストテスト");
    signupPage.setRank(Rank.一般会員);
    signupPage.setAddress("千葉県千葉市");
    signupPage.setTel("1234567890");
    signupPage.setGender(Gender.その他);
    signupPage.setBirthday(LocalDate.parse("2000-01-01"));
    signupPage.setNotification(true);
    signupPage.goToMyPageExpectingFailure();

    assertAll("エラーメッセージ",
        () -> assertEquals("メールアドレスを入力してください。", signupPage.getEmailMessage()),
        () -> assertEquals("8文字以上で入力してください。", signupPage.getPasswordMessage()),
        () -> assertEquals("8文字以上で入力してください。", signupPage.getPasswordConfirmationMessage()),
        () -> assertEquals("", signupPage.getUsernameMessage()),
        () -> assertEquals("", signupPage.getAddressMessage()),
        () -> assertEquals("指定されている形式で入力してください。", signupPage.getTelMessage()),
        () -> assertEquals("", signupPage.getGenderMessage()),
        () -> assertEquals("", signupPage.getBirthdayMessage())
    );
  }

  @Test
  @Order(4)
  @DisplayName("登録済みのメールアドレスはエラーとなること")
  void testSignupErrorDouble() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);

    var signupPage = topPage.goToSignupPage();
    signupPage.setEmail("new-user@gmail.com");
    signupPage.setPassword("password");
    signupPage.setPasswordConfirmation("password");
    signupPage.setUsername("新規ユーザ１");
    signupPage.setRank(Rank.一般会員);
    signupPage.setAddress("神奈川県横浜市港区");
    signupPage.setTel("01234567891");
    signupPage.setGender(Gender.女性);
    signupPage.setBirthday(LocalDate.parse("2000-01-01"));
    signupPage.setNotification(true);
    signupPage.goToMyPageExpectingFailure();

    assertEquals("このメールアドレスはすでに登録済みです。", signupPage.getEmailMessage());
  }

  @Test
  @Order(5)
  @DisplayName("入力パスワードが一致しないとエラーとなること")
  void testSignupErrorUnMatchPassword() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);

    var signupPage = topPage.goToSignupPage();
    signupPage.setEmail("new-user@gmail.com");
    signupPage.setPassword("password");
    signupPage.setPasswordConfirmation("123456789");
    signupPage.setUsername("新規ユーザ１");
    signupPage.setRank(Rank.一般会員);
    signupPage.setAddress("神奈川県横浜市港区");
    signupPage.setTel("01234567891");
    signupPage.setGender(Gender.男性);
    signupPage.setBirthday(LocalDate.parse("2000-01-01"));
    signupPage.setNotification(true);
    signupPage.goToMyPageExpectingFailure();

    assertEquals("入力されたパスワードと一致しません。", signupPage.getPasswordConfirmationMessage());
  }

}
