package starhotel.pages;

import static starhotel.Utils.sleep;

import java.util.regex.Pattern;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ConfirmPage {

  private WebDriver driver;

  private WebDriverWait wait;

  public ConfirmPage(WebDriver driver) {
    this.driver = driver;
    this.wait = new WebDriverWait(driver, 10);
    if (!this.driver.getTitle().equals("宿泊予約確認 | STAR HOTEL - テスト自動化デモサイト")) {
      throw new IllegalStateException("現在のページが間違っています: " + this.driver.getTitle());
    }
  }

  public String getTotalBill() {
    wait.until(ExpectedConditions.textMatches(By.id("total-bill"), Pattern.compile(".+")));
    var totalBill = driver.findElement(By.id("total-bill"));
    return totalBill.getText();
  }

  public String getPlanName() {
    wait.until(ExpectedConditions.textMatches(By.id("plan-name"), Pattern.compile(".+")));
    var planName = driver.findElement(By.id("plan-name"));
    return planName.getText();
  }

  public String getTerm() {
    wait.until(ExpectedConditions.textMatches(By.id("term"), Pattern.compile(".+")));
    var term = driver.findElement(By.id("term"));
    return term.getText();
  }

  public String getHeadCount() {
    wait.until(ExpectedConditions.textMatches(By.id("head-count"), Pattern.compile(".+")));
    var headCount = driver.findElement(By.id("head-count"));
    return headCount.getText();
  }

  public String getPlans() {
    wait.until(ExpectedConditions.textMatches(By.id("plans"), Pattern.compile(".+")));
    var plans = driver.findElement(By.id("plans"));
    return plans.getText();
  }

  public String getUsername() {
    wait.until(ExpectedConditions.textMatches(By.id("username"), Pattern.compile(".+")));
    var username = driver.findElement(By.id("username"));
    return username.getText();
  }

  public String getContact() {
    wait.until(ExpectedConditions.textMatches(By.id("contact"), Pattern.compile(".+")));
    var contact = driver.findElement(By.id("contact"));
    return contact.getText();
  }

  public String getComment() {
    wait.until(ExpectedConditions.textMatches(By.id("comment"), Pattern.compile(".+")));
    var comment = driver.findElement(By.id("comment"));
    return comment.getText();
  }

  public void doConfirm() {
    var confirmButton = driver.findElement(By.cssSelector("button[data-target=\"#success-modal\"]"));
    confirmButton.click();
    sleep(2000);
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("success-modal")));
  }

  public String getModalMessage() {
    var modalMessage = driver.findElement(By.cssSelector("#success-modal > div > div > .modal-body"));
    return modalMessage.getText();
  }

  public void close() {
    var closeButton = driver.findElement(By.cssSelector("#success-modal > div > div > div > button"));
    closeButton.click();
  }
}
