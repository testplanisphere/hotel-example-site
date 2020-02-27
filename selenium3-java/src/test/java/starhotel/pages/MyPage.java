package starhotel.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class MyPage {

  private WebDriver driver;

  public MyPage(WebDriver driver) {
    this.driver = driver;
  }

  public String getHeaderText() {
    var header = driver.findElement(By.tagName("h2"));
    return header.getText();
  }
}
