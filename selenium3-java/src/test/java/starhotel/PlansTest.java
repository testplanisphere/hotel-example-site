package starhotel;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
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
import starhotel.pages.TopPage;

@TestMethodOrder(OrderAnnotation.class)
@DisplayName("プラン一覧画面テスト")
class PlansTest {

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
  @DisplayName("未ログイン状態でプラン一覧が表示されること")
  void testPlanListNotLogin() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);

    var plansPage = topPage.goToPlansPage();
    var planTitles = plansPage.getPlanTitles();

    assertAll("プラン一覧",
        () -> assertEquals(5, planTitles.size()),
        () -> assertEquals("お得な特典付きプラン", planTitles.get(0)),
        () -> assertEquals("ディナー付プラン", planTitles.get(1)),
        () -> assertEquals("素泊まり", planTitles.get(2)),
        () -> assertEquals("出張ビジネスプラン", planTitles.get(3)),
        () -> assertEquals("エステ・マッサージプラン", planTitles.get(4))
    );
  }

  @Test
  @Order(2)
  @DisplayName("一般会員でログイン状態でプラン一覧が表示されること")
  void testPlanListLoginNormal() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var loginPage = topPage.goToLoginPage();
    var myPage = loginPage.doLogin("sakura@example.com", "pass1234");

    var plansPage = myPage.goToPlansPage();
    var planTitles = plansPage.getPlanTitles();

    assertAll("プラン一覧",
        () -> assertEquals(6, planTitles.size()),
        () -> assertEquals("お得な特典付きプラン", planTitles.get(0)),
        () -> assertEquals("ディナー付プラン", planTitles.get(1)),
        () -> assertEquals("お得なプラン", planTitles.get(2)),
        () -> assertEquals("素泊まり", planTitles.get(3)),
        () -> assertEquals("出張ビジネスプラン", planTitles.get(4)),
        () -> assertEquals("エステ・マッサージプラン", planTitles.get(5))
    );
  }

  @Test
  @Order(3)
  @DisplayName("プレミアム会員でログイン状態でプラン一覧が表示されること")
  void testPlanListLoginPremium() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var loginPage = topPage.goToLoginPage();
    var myPage = loginPage.doLogin("ichiro@example.com", "password");

    var plansPage = myPage.goToPlansPage();
    var planTitles = plansPage.getPlanTitles();

    assertAll("プラン一覧",
        () -> assertEquals(7, planTitles.size()),
        () -> assertEquals("お得な特典付きプラン", planTitles.get(0)),
        () -> assertEquals("プレミアムプラン", planTitles.get(1)),
        () -> assertEquals("ディナー付プラン", planTitles.get(2)),
        () -> assertEquals("お得なプラン", planTitles.get(3)),
        () -> assertEquals("素泊まり", planTitles.get(4)),
        () -> assertEquals("出張ビジネスプラン", planTitles.get(5)),
        () -> assertEquals("エステ・マッサージプラン", planTitles.get(6))
    );
  }

}
