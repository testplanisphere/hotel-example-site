package starhotel.pages;

import java.time.LocalDate;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

public class SignupPage {

  public enum Rank { プレミアム会員, 一般会員 }

  public enum Gender {
    回答しない("0"), 男性("1"), 女性("2"), その他("9");

    private final String value;

    Gender(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }
  }

  private WebDriver driver;

  public SignupPage(WebDriver driver) {
    this.driver = driver;
    if (!this.driver.getTitle().equals("会員登録 | STAR HOTEL - テスト自動化デモサイト")) {
      throw new IllegalStateException("現在のページが間違っています: " + this.driver.getTitle());
    }
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

  public void setRank(Rank rank) {
    switch (rank) {
      case プレミアム会員:
        var premium = driver.findElement(By.id("rank-premium"));
        premium.click();
        break;
      case 一般会員:
        var normal = driver.findElement(By.id("rank-normal"));
        normal.click();
        break;
      default:
        throw new AssertionError();
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

  public void setGender(Gender gender) {
    var genderSelect = new Select(driver.findElement(By.id("gender")));
    genderSelect.selectByValue(gender.getValue());
  }

  public void setBirthday(LocalDate birthday) {
    var birthdayInput = driver.findElement(By.id("birthday"));
    ((JavascriptExecutor) driver)
        .executeScript("arguments[0].value = arguments[1]", birthdayInput, birthday.toString());
  }

  public void setNotification(boolean checked) {
    var notificationCheck = driver.findElement(By.id("notification"));
    if (notificationCheck.isSelected() != checked) {
      notificationCheck.click();
    }
  }

  public MyPage goToMyPage() {
    var signUpButton = driver.findElement(By.cssSelector("#signup-form > button"));
    signUpButton.click();
    return new MyPage(driver);
  }

  public void goToMyPageExpectingFailure() {
    var signUpButton = driver.findElement(By.cssSelector("#signup-form > button"));
    signUpButton.click();
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

  public String getGenderMessage() {
    var genderMessage = driver.findElement(By.cssSelector("#gender ~ .invalid-feedback"));
    return genderMessage.getText();
  }

  public String getBirthdayMessage() {
    var birthdayMessage = driver.findElement(By.cssSelector("#birthday ~ .invalid-feedback"));
    return birthdayMessage.getText();
  }
}
