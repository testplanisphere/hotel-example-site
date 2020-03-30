package starhotel.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class RoomPage {

  private WebDriver driver;

  public RoomPage(WebDriver driver) {
    this.driver = driver;
  }

  public String getHeader() {
    var header = driver.findElement(By.tagName("h5"));
    return header.getText();
  }
}
