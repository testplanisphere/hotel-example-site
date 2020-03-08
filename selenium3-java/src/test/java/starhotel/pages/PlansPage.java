package starhotel.pages;

import static java.util.stream.Collectors.toList;

import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class PlansPage {

  private WebDriver driver;

  public PlansPage(WebDriver driver) {
    this.driver = driver;
  }

  public List<String> getPlanTitles() {
    var plans = driver.findElements(By.className("card-title"));
    return plans.stream().map(WebElement::getText).collect(toList());
  }


}
