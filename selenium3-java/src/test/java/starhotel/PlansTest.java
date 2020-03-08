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
import starhotel.pages.PlansPage;

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
    driver.get(BASE_URL + "/plans.html");

    var plansPage = new PlansPage(driver);
    var planTitles = plansPage.getPlanTitles();

    assertAll("プラン一覧",
        () -> assertEquals(3, planTitles.size()),
        () -> assertEquals("お得な特典付きプラン", planTitles.get(0)),
        () -> assertEquals("プレミアムプラン", planTitles.get(1)),
        () -> assertEquals("朝食付プラン", planTitles.get(2))
    );
  }

}
