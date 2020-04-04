package starhotel;

import static java.time.DayOfWeek.FRIDAY;
import static java.time.DayOfWeek.SATURDAY;
import static java.time.DayOfWeek.SUNDAY;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static starhotel.Utils.BASE_URL;
import static starhotel.Utils.getNewWindowHandle;
import static starhotel.Utils.sleep;

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
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import starhotel.pages.ReservePage;
import starhotel.pages.ReservePage.Contact;
import starhotel.pages.RoomPage;
import starhotel.pages.TopPage;

@TestMethodOrder(OrderAnnotation.class)
@DisplayName("宿泊予約画面テスト")
class ReserveTest {

  private static DateTimeFormatter shortFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

  private static DateTimeFormatter longFormatter = DateTimeFormatter.ofPattern("yyyy年M月d日");

  private static WebDriver driver;

  private static WebDriverWait wait;

  private String originalHandle;

  @BeforeAll
  static void initAll() {
    driver = Utils.createWebDriver();
    wait = new WebDriverWait(driver, 10);
  }

  @BeforeEach
  void init() {
    originalHandle = driver.getWindowHandle();
  }

  @AfterEach
  void tearDown() {
    if (driver.getWindowHandles().size() > 1) {
      driver.close();
    }
    driver.switchTo().window(originalHandle);
    driver.manage().deleteAllCookies();
  }

  @AfterAll
  static void tearDownAll() {
    driver.quit();
  }

  @Test
  @Order(1)
  @DisplayName("画面表示時の初期値が設定されていること_未ログイン")
  void testPageInitValue() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var originalHandles = driver.getWindowHandles();

    var plansPage = topPage.goToPlansPage();
    plansPage.openPlanByTitle("お得な特典付きプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    var tomorrow = shortFormatter.format(LocalDate.now().plusDays(1));

    assertAll("初期表示値",
        () -> assertEquals("お得な特典付きプラン", reservePage.getPlanName()),
        () -> assertEquals(tomorrow, reservePage.getReserveDate()),
        () -> assertEquals("1", reservePage.getReserveTerm()),
        () -> assertEquals("1", reservePage.getHeadCount())
    );

    driver.switchTo().frame("room");
    var roomPage = new RoomPage(driver);
    assertEquals("スタンダードツイン", roomPage.getHeader());
    driver.switchTo().defaultContent();
  }

  @Test
  @Order(2)
  @DisplayName("画面表示時の初期値が設定されていること_ログイン済み")
  void testPageInitValueLogin() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var loginPage = topPage.goToLoginPage();
    var myPage = loginPage.doLogin("ichiro@example.com", "password");
    var originalHandles = driver.getWindowHandles();

    var plansPage = myPage.goToPlansPage();
    plansPage.openPlanByTitle("プレミアムプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    var tomorrow = shortFormatter.format(LocalDate.now().plusDays(1));

    assertAll("初期表示値",
        () -> assertEquals("プレミアムプラン", reservePage.getPlanName()),
        () -> assertEquals(tomorrow, reservePage.getReserveDate()),
        () -> assertEquals("1", reservePage.getReserveTerm()),
        () -> assertEquals("2", reservePage.getHeadCount()),
        () -> assertEquals("山田一郎", reservePage.getUsername()),
        () -> assertEquals("ichiro@example.com", reservePage.getEmail()),
        () -> assertEquals("01234567891", reservePage.getTel())
    );

    driver.switchTo().frame("room");
    var roomPage = new RoomPage(driver);
    assertEquals("プレミアムツイン", roomPage.getHeader());
    driver.switchTo().defaultContent();
  }

  @Test
  @Order(3)
  @DisplayName("入力値が空白でエラーとなること")
  void testBlankInputOne() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var originalHandles = driver.getWindowHandles();

    var plansPage = topPage.goToPlansPage();
    plansPage.openPlanByTitle("お得な特典付きプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

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
  @Order(4)
  @DisplayName("不正な入力値でエラーとなること_小")
  void testInvalidInputSmall() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var originalHandles = driver.getWindowHandles();

    var plansPage = topPage.goToPlansPage();
    plansPage.openPlanByTitle("お得な特典付きプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    var today = shortFormatter.format(LocalDate.now());

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
  @Order(5)
  @DisplayName("不正な入力値でエラーとなること_大")
  void testInvalidInputBig() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var originalHandles = driver.getWindowHandles();

    var plansPage = topPage.goToPlansPage();
    plansPage.openPlanByTitle("お得な特典付きプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    var after90 = shortFormatter.format(LocalDate.now().plusDays(91));

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
  @Order(6)
  @DisplayName("不正な入力値でエラーとなること_文字列")
  void testInvalidInputOther() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var originalHandles = driver.getWindowHandles();

    var plansPage = topPage.goToPlansPage();
    plansPage.openPlanByTitle("お得な特典付きプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    reservePage.setReserveDate("12/3//345");
    reservePage.setReserveTerm("a");
    reservePage.setHeadCount("a");
    reservePage.setUsername("テスト太郎"); // フォーカス移動

    assertAll("エラーメッセージ",
        () -> assertEquals("有効な値を入力してください。", reservePage.getReserveDateMessage()),
        () -> assertFalse(reservePage.getReserveTermMessage().isEmpty()),
        () -> assertFalse(reservePage.getHeadCountMessage().isEmpty())
    );
  }

  @Test
  @Order(7)
  @DisplayName("不正な入力値でエラーとなること_確定時_メール選択")
  void testInvalidInputOnSubmitEmail() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var originalHandles = driver.getWindowHandles();

    var plansPage = topPage.goToPlansPage();
    plansPage.openPlanByTitle("お得な特典付きプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    reservePage.setUsername("");
    reservePage.setContact(Contact.メール);
    reservePage.setEmail("");
    reservePage.goToConfirmPageExpectingFailure();

    assertAll("エラーメッセージ",
        () -> assertEquals("このフィールドを入力してください。", reservePage.getUsernameMessage()),
        () -> assertEquals("このフィールドを入力してください。", reservePage.getEmailMessage())
    );
  }

  @Test
  @Order(8)
  @DisplayName("不正な入力値でエラーとなること_確定時_電話選択")
  void testInvalidInputOnSubmitTel() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var originalHandles = driver.getWindowHandles();

    var plansPage = topPage.goToPlansPage();
    plansPage.openPlanByTitle("お得な特典付きプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    reservePage.setUsername("");
    reservePage.setContact(Contact.電話);
    reservePage.setTel("");
    reservePage.goToConfirmPageExpectingFailure();

    assertAll("エラーメッセージ",
        () -> assertEquals("このフィールドを入力してください。", reservePage.getUsernameMessage()),
        () -> assertEquals("このフィールドを入力してください。", reservePage.getTelMessage())
    );
  }

  @Test
  @Order(9)
  @DisplayName("宿泊予約が完了すること_未ログイン_初期値")
  void testReserveSuccess() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var originalHandles = driver.getWindowHandles();

    var plansPage = topPage.goToPlansPage();
    plansPage.openPlanByTitle("お得な特典付きプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    var expectedStart = LocalDate.now().plusDays(1);
    var expectedEnd = LocalDate.now().plusDays(2);
    String expectedTotalBill;
    if (expectedStart.getDayOfWeek() == SUNDAY || expectedStart.getDayOfWeek() == SATURDAY) {
      expectedTotalBill = "合計 8,750円（税込み）";
    } else {
      expectedTotalBill = "合計 7,000円（税込み）";
    }
    var expectedTerm = longFormatter.format(expectedStart) + " 〜 " + longFormatter.format(expectedEnd) + " 1泊";

    reservePage.setUsername("テスト太郎");
    reservePage.setContact(Contact.希望しない);
    var confirmPage = reservePage.goToConfirmPage();

    assertAll("予約確認",
        () -> assertEquals(expectedTotalBill, confirmPage.getTotalBill()),
        () -> assertEquals("お得な特典付きプラン", confirmPage.getPlanName()),
        () -> assertEquals(expectedTerm, confirmPage.getTerm()),
        () -> assertEquals("1名様", confirmPage.getHeadCount()),
        () -> assertEquals("なし", confirmPage.getPlans()),
        () -> assertEquals("テスト太郎様", confirmPage.getUsername()),
        () -> assertEquals("希望しない", confirmPage.getContact()),
        () -> assertEquals("なし", confirmPage.getComment())
    );

    confirmPage.doConfirm();
    assertEquals("ご来館、心よりお待ちしております。", confirmPage.getModalMessage());
    confirmPage.close();
    assertTrue(wait.until(ExpectedConditions.numberOfWindowsToBe(1)));
  }

  @Test
  @Order(10)
  @DisplayName("宿泊予約が完了すること_ログイン")
  void testReserveSuccess2() {
    driver.get(BASE_URL);
    var topPage = new TopPage(driver);
    var loginPage = topPage.goToLoginPage();
    var myPage = loginPage.doLogin("ichiro@example.com", "password");
    var originalHandles = driver.getWindowHandles();

    var plansPage = myPage.goToPlansPage();
    plansPage.openPlanByTitle("プレミアムプラン");
    sleep(500);
    var newHandles = driver.getWindowHandles();
    var newHandle = getNewWindowHandle(originalHandles, newHandles);
    driver.switchTo().window(newHandle);
    var reservePage = new ReservePage(driver);

    var expectedStart = LocalDate.now().plusDays(90);
    var expectedEnd = LocalDate.now().plusDays(92);
    String expectedTotalBill;
    if (expectedStart.getDayOfWeek() == SATURDAY) {
      expectedTotalBill = "合計 112,000円（税込み）";
    } else if (expectedStart.getDayOfWeek() == SUNDAY || expectedStart.getDayOfWeek() == FRIDAY) {
      expectedTotalBill = "合計 102,000円（税込み）";
    } else {
      expectedTotalBill = "合計 92,000円（税込み）";
    }
    final var expectedTerm = longFormatter.format(expectedStart) + " 〜 " + longFormatter.format(expectedEnd) + " 2泊";

    reservePage.setReserveTerm("2");
    reservePage.setHeadCount("4");
    reservePage.setBreakfastPlan(true);
    reservePage.setEarlyCheckInPlan(true);
    reservePage.setSightseeingPlan(false);
    reservePage.setContact(Contact.メール);
    reservePage.setComment("あああ\n\nいいいいいいい\nうう");
    reservePage.setReserveDate(shortFormatter.format(expectedStart));
    var confirmPage = reservePage.goToConfirmPage();

    assertAll("予約確認",
        () -> assertEquals(expectedTotalBill, confirmPage.getTotalBill()),
        () -> assertEquals("プレミアムプラン", confirmPage.getPlanName()),
        () -> assertEquals(expectedTerm, confirmPage.getTerm()),
        () -> assertEquals("4名様", confirmPage.getHeadCount()),
        () -> assertTrue(confirmPage.getPlans().contains("朝食バイキング")),
        () -> assertTrue(confirmPage.getPlans().contains("昼からチェックインプラン")),
        () -> assertFalse(confirmPage.getPlans().contains("お得な観光プラン")),
        () -> assertEquals("山田一郎様", confirmPage.getUsername()),
        () -> assertEquals("メール：ichiro@example.com", confirmPage.getContact()),
        () -> assertEquals("あああ\n\nいいいいいいい\nうう", confirmPage.getComment())
    );

    confirmPage.doConfirm();
    assertEquals("ご来館、心よりお待ちしております。", confirmPage.getModalMessage());
    confirmPage.close();
    assertTrue(wait.until(ExpectedConditions.numberOfWindowsToBe(1)));
  }
}
