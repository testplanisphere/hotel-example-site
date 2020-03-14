package starhotel;

import java.util.ArrayList;
import java.util.Collection;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

public class Utils {

  public static final String BASE_URL = "https://takeya0x86.github.io/automation-testing-practice";

  private Utils() {
    throw new AssertionError();
  }

  public static WebDriver createWebDriver() {
    var githubActions = Boolean.parseBoolean(System.getenv("GITHUB_ACTIONS"));
    var browser = System.getenv("BROWSER");
    if (browser == null) {
      browser = "chrome";
    }
    WebDriver driver;
    switch (browser) {
      case "chrome": {
        var options = new ChromeOptions();
        if (githubActions) {
          options.setHeadless(true);
        }
        driver = new ChromeDriver(options);
        break;
      }
      case "firefox": {
        var options = new FirefoxOptions();
        if (githubActions) {
          options.setHeadless(true);
        }
        driver = new FirefoxDriver(options);
        break;
      }
      default:
        throw new RuntimeException(browser + " is not support.");
    }
    driver.manage().window().setSize(new Dimension(1920, 1080));
    return driver;
  }

  public static String getNewWindowHandle(Collection<String> handlesBeforeOpen, Collection<String> handlesAfterOpen) {
    var handles = new ArrayList<>(handlesAfterOpen);
    handles.removeAll(handlesBeforeOpen);
    if (handles.isEmpty()) {
      throw new RuntimeException("新しいウィンドウが見つかりません");
    } else if (handles.size() > 1) {
      throw new RuntimeException("新しいウィンドウが複数あります");
    } else {
      return handles.get(0);
    }
  }

  public static void sleep(long millis) {
    try {
      Thread.sleep(millis);
    } catch (InterruptedException ign) {
      // ignore
    }
  }
}
