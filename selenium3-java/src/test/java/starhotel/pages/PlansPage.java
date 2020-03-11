package starhotel.pages;

import static starhotel.Utils.getNewWindowHandle;

import java.util.List;
import java.util.stream.Collectors;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PlansPage {

  private WebDriver driver;

  private WebDriverWait wait;

  public PlansPage(WebDriver driver) {
    this.driver = driver;
    this.wait = new WebDriverWait(driver, 10);
  }

  public List<String> getPlanTitles() {
    wait.until(ExpectedConditions.numberOfElementsToBe(By.cssSelector("#plan-list > div[role=\"status\"]"), 0));
    var plans = driver.findElements(By.className("card-title"));
    return plans.stream().map(WebElement::getText).collect(Collectors.toList());
  }

  public ReservePage clickPlanByTitle(String title) {
    wait.until(ExpectedConditions.numberOfElementsToBe(By.cssSelector("#plan-list > div[role=\"status\"]"), 0));
    var plans = driver.findElements(By.className("card"));
    plans.stream()
        .filter(elm -> title.equals(elm.findElement(By.className("card-title")).getText()))
        .findFirst()
        .ifPresent(elm -> elm.findElement(By.tagName("a")).click());
    wait.until(ExpectedConditions.numberOfWindowsToBe(2));
    return new ReservePage(driver);
  }
}
