package starhotel;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static starhotel.Utils.BASE_URL;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import starhotel.pages.LoginPage;

@TestMethodOrder(OrderAnnotation.class)
@DisplayName("リダイレクトテスト")
class RedirectionTest {

  private static WebDriver driver;

  private static WebDriverWait wait;

  @BeforeAll
  static void initAll() {
    driver = Utils.createWebDriver();
    wait = new WebDriverWait(driver, 10);
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
  @DisplayName("未ログインでマイページからトップへリダイレクトすること")
  void testMyPageToTop() {
    driver.get(BASE_URL + "/mypage.html");
    wait.until(ExpectedConditions.urlContains("index.html"));
    assertTrue(driver.getCurrentUrl().endsWith("index.html"));
  }

  @Test
  @Order(2)
  @DisplayName("ログイン済みでログイン画面からトップへリダイレクトすること")
  void testLoginPageToTop() {
    driver.get(BASE_URL + "/login.html");

    var loginPage = new LoginPage(driver);
    loginPage.doLogin("ichiro@example.com", "password");

    driver.get(BASE_URL + "/login.html");
    wait.until(ExpectedConditions.urlContains("index.html"));
    assertTrue(driver.getCurrentUrl().endsWith("index.html"));
  }

  @Test
  @Order(3)
  @DisplayName("ログイン済みで登録画面からトップへリダイレクトすること")
  void testSignupPageToTop() {
    driver.get(BASE_URL + "/login.html");

    var loginPage = new LoginPage(driver);
    loginPage.doLogin("ichiro@example.com", "password");

    driver.get(BASE_URL + "/signup.html");
    wait.until(ExpectedConditions.urlContains("index.html"));
    assertTrue(driver.getCurrentUrl().endsWith("index.html"));
  }

  @Test
  @Order(4)
  @DisplayName("存在しないプランIDでトップへリダイレクトすること")
  void testNoPlanPageToTop() {
    driver.get(BASE_URL + "/reserve.html?plan-id=100");
    wait.until(ExpectedConditions.urlContains("index.html"));
    assertTrue(driver.getCurrentUrl().endsWith("index.html"));
  }

  @Test
  @Order(5)
  @DisplayName("不正なプランIDでトップへリダイレクトすること1")
  void testInvalidPlanPageToTop() {
    driver.get(BASE_URL + "/reserve.html?plan-id=abc");
    wait.until(ExpectedConditions.urlContains("index.html"));
    assertTrue(driver.getCurrentUrl().endsWith("index.html"));
  }

  @Test
  @Order(6)
  @DisplayName("不正なプランIDでトップへリダイレクトすること2")
  void testInvalidParamPlanPageToTop() {
    driver.get(BASE_URL + "/reserve.html");
    wait.until(ExpectedConditions.urlContains("index.html"));
    assertTrue(driver.getCurrentUrl().endsWith("index.html"));
  }
}
