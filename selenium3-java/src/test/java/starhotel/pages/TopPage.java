package starhotel.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class TopPage {

  private WebDriver driver;

  public TopPage(WebDriver driver) {
    this.driver = driver;
  }

  public LoginPage goToLoginPage() {
    var loginLink = driver.findElement(By.linkText("ログイン"));
    loginLink.click();
    return new LoginPage(driver);
  }
}
