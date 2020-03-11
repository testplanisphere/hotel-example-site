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

  public String getEmail() {
    var email = driver.findElement(By.id("email"));
    return email.getText();
  }

  public String getUsername() {
    var username = driver.findElement(By.id("username"));
    return username.getText();
  }

  public String getRank() {
    var rank = driver.findElement(By.id("rank"));
    return rank.getText();
  }

  public String getAddress() {
    var address = driver.findElement(By.id("address"));
    return address.getText();
  }

  public String getTel() {
    var tel = driver.findElement(By.id("tel"));
    return tel.getText();
  }

  public String getGender() {
    var gender = driver.findElement(By.id("gender"));
    return gender.getText();
  }

  public String getBirthday() {
    var birthday = driver.findElement(By.id("birthday"));
    return birthday.getText();
  }

  public String getNotification() {
    var notification = driver.findElement(By.id("notification"));
    return notification.getText();
  }

  public void deleteUser() {
    var deleteButton = driver.findElement(By.cssSelector("#delete-form > button"));
    deleteButton.click();
  }
}
