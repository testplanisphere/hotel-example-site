package starhotel;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static starhotel.Utils.BASE_URL;
import static starhotel.Utils.getNewWindowHandle;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.openqa.selenium.WebDriver;
import starhotel.pages.PlansPage;

@TestMethodOrder(OrderAnnotation.class)
@DisplayName("宿泊予約画面テスト")
class ReserveTest {

  private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

  private static WebDriver driver;

  private String originalHandle;

  @BeforeAll
  static void initAll() {
    driver = Utils.createWebDriver();
  }

  @BeforeEach
  void init() {
    originalHandle = driver.getWindowHandle();
  }

  @AfterEach
  void tearDown() {
    driver.close();
    driver.switchTo().window(originalHandle);
    driver.manage().deleteAllCookies();
  }

  @AfterAll
  static void tearDownAll() {
    driver.quit();
  }

  @Test
  @Order(1)
  @DisplayName("画面表示時の初期値が設定されていること")
  void testPageInitValue() {
    driver.get(BASE_URL + "/plans.html");
    var originalHandles = driver.getWindowHandles();

    var plansPage = new PlansPage(driver);
    var reservePage = plansPage.clickPlanByTitle("お得な特典付きプラン");
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);

    var tomorrow = formatter.format(LocalDate.now().plusDays(1));

    assertAll("初期表示値",
        () -> assertEquals("お得な特典付きプラン", reservePage.getPlanName()),
        () -> assertEquals(tomorrow, reservePage.getReserveDate()),
        () -> assertEquals("1", reservePage.getReserveTerm()),
        () -> assertEquals("1", reservePage.getHeadCount())
    );
  }

  @Test
  @Order(2)
  @DisplayName("入力値が空白でエラーとなること")
  void testBlankInputOne() {
    driver.get(BASE_URL + "/plans.html");
    var originalHandles = driver.getWindowHandles();

    var plansPage = new PlansPage(driver);
    var reservePage = plansPage.clickPlanByTitle("お得な特典付きプラン");
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);

    reservePage.setReserveDate("");
    reservePage.setReserveTerm("");
    reservePage.setHeadCount("");
    reservePage.setUsername("");  // フォーカス移動

    assertAll("エラーメッセージ",
        () -> assertEquals("このフィールドを入力してください。", reservePage.getReserveDateMessage()),
        () -> assertEquals("このフィールドを入力してください。", reservePage.getReserveTermMessage()),
        () -> assertEquals("このフィールドを入力してください。", reservePage.getHeadCountMessage())
    );
  }

  @Test
  @Order(3)
  @DisplayName("不正な入力値でエラーとなること_小")
  void testInvalidInputSmall() {
    driver.get(BASE_URL + "/plans.html");
    var originalHandles = driver.getWindowHandles();

    var plansPage = new PlansPage(driver);
    var reservePage = plansPage.clickPlanByTitle("お得な特典付きプラン");
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);

    var today = formatter.format(LocalDate.now());

    reservePage.setReserveDate(today);
    reservePage.setReserveTerm("0");
    reservePage.setHeadCount("0");
    reservePage.setUsername("テスト太郎"); // フォーカス移動

    assertAll("エラーメッセージ",
        () -> assertEquals("翌日以降の日付を入力してください。", reservePage.getReserveDateMessage()),
        () -> assertEquals("1以上の値を入力してください。", reservePage.getReserveTermMessage()),
        () -> assertEquals("1以上の値を入力してください。", reservePage.getHeadCountMessage())
    );
  }

  @Test
  @Order(4)
  @DisplayName("不正な入力値でエラーとなること_大")
  void testInvalidInputBig() {
    driver.get(BASE_URL + "/plans.html");
    var originalHandles = driver.getWindowHandles();

    var plansPage = new PlansPage(driver);
    var reservePage = plansPage.clickPlanByTitle("お得な特典付きプラン");
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);

    var after90 = formatter.format(LocalDate.now().plusDays(91));

    reservePage.setReserveDate(after90);
    reservePage.setReserveTerm("10");
    reservePage.setHeadCount("10");
    reservePage.setUsername("テスト太郎"); // フォーカス移動

    assertAll("エラーメッセージ",
        () -> assertEquals("3ヶ月以内の日付を入力してください。", reservePage.getReserveDateMessage()),
        () -> assertEquals("9以下の値を入力してください。", reservePage.getReserveTermMessage()),
        () -> assertEquals("9以下の値を入力してください。", reservePage.getHeadCountMessage())
    );
  }

  @Test
  @Order(5)
  @DisplayName("不正な入力値でエラーとなること_文字列")
  void testInvalidInputOther() {
    driver.get(BASE_URL + "/plans.html");
    var originalHandles = driver.getWindowHandles();

    var plansPage = new PlansPage(driver);
    var reservePage = plansPage.clickPlanByTitle("お得な特典付きプラン");
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);

    reservePage.setReserveDate("12/3//345");
    reservePage.setReserveTerm("a");
    reservePage.setHeadCount("a");
    reservePage.setUsername("テスト太郎"); // フォーカス移動

    assertAll("エラーメッセージ",
        () -> assertEquals("有効な値を入力してください。", reservePage.getReserveDateMessage()),
        () -> assertEquals("このフィールドを入力してください。", reservePage.getReserveTermMessage()),
        () -> assertEquals("このフィールドを入力してください。", reservePage.getHeadCountMessage())
    );
  }
}
