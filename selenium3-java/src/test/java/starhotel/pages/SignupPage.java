package starhotel.pages;

import java.time.LocalDate;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

public class SignupPage {

  public enum Rank { PREMIUM, NORMAL }

  private WebDriver driver;

  public SignupPage(WebDriver driver) {
    this.driver = driver;
  }

  public void setEmail(String email) {
    var emailInput = driver.findElement(By.id("email"));
    emailInput.clear();
    emailInput.sendKeys(email);
  }

  public void setPassword(String password) {
    var passwordInput = driver.findElement(By.id("password"));
    passwordInput.clear();
    passwordInput.sendKeys(password);
  }

  public void setPasswordConfirmation(String password) {
    var passwordConfirmationInput = driver.findElement(By.id("password-confirmation"));
    passwordConfirmationInput.clear();
    passwordConfirmationInput.sendKeys(password);
  }

  public void setUsername(String username) {
    var usernameInput = driver.findElement(By.id("username"));
    usernameInput.clear();
    usernameInput.sendKeys(username);
  }

  public void selectRank(Rank rank) {
    switch (rank) {
      case PREMIUM:
        var premium = driver.findElement(By.id("rank-premium"));
        premium.click();
        break;
      case NORMAL:
        var normal = driver.findElement(By.id("rank-normal"));
        normal.click();
        break;
    }
  }

  public void setAddress(String address) {
    var addressInput = driver.findElement(By.id("address"));
    addressInput.clear();
    addressInput.sendKeys(address);
  }

  public void setTel(String tel) {
    var telInput = driver.findElement(By.id("tel"));
    telInput.clear();
    telInput.sendKeys(tel);
  }

  public void selectSex(String sex) {
    var sexSelect = new Select(driver.findElement(By.id("sex")));
    sexSelect.selectByVisibleText(sex);
  }

  public void setBirthday(LocalDate birthday) {
    var birthdayInput = driver.findElement(By.id("birthday"));
    birthdayInput.clear();
    birthdayInput.sendKeys(Integer.toString(birthday.getYear()));
    birthdayInput.sendKeys(Keys.TAB);
    birthdayInput.sendKeys(Integer.toString(birthday.getMonth().getValue()));
    birthdayInput.sendKeys(Keys.TAB);
    birthdayInput.sendKeys(Integer.toString(birthday.getDayOfMonth()));
  }

  public void checkNotification(boolean check) {
    var notificationCheck = driver.findElement(By.id("notification"));
    if (check) {
      if (!notificationCheck.isSelected()) {
        notificationCheck.click();
      }
    } else {
      if (notificationCheck.isSelected()) {
        notificationCheck.click();
      }
    }
  }

  public MyPage goToMyPage() {
    var signUpButton = driver.findElement(By.cssSelector("#signup-form > button"));
    signUpButton.click();
    return new MyPage(driver);
  }

  public String getEmailMessage() {
    var emailMessage = driver.findElement(By.cssSelector("#email ~ .invalid-feedback"));
    return emailMessage.getText();
  }

  public String getPasswordMessage() {
    var passwordMessage = driver.findElement(By.cssSelector("#password ~ .invalid-feedback"));
    return passwordMessage.getText();
  }

  public String getPasswordConfirmationMessage() {
    var passwordConfirmationMessage = driver.findElement(By.cssSelector("#password-confirmation ~ .invalid-feedback"));
    return passwordConfirmationMessage.getText();
  }

  public String getUsernameMessage() {
    var usernameMessage = driver.findElement(By.cssSelector("#username ~ .invalid-feedback"));
    return usernameMessage.getText();
  }

  public String getAddressMessage() {
    var addressMessage = driver.findElement(By.cssSelector("#address ~ .invalid-feedback"));
    return addressMessage.getText();
  }

  public String getTelMessage() {
    var telMessage = driver.findElement(By.cssSelector("#tel ~ .invalid-feedback"));
    return telMessage.getText();
  }

  public String getSexMessage() {
    var sexMessage = driver.findElement(By.cssSelector("#sex ~ .invalid-feedback"));
    return sexMessage.getText();
  }

  public String getBirthdayMessage() {
    var birthdayMessage = driver.findElement(By.cssSelector("#birthday ~ .invalid-feedback"));
    return birthdayMessage.getText();
  }
}
