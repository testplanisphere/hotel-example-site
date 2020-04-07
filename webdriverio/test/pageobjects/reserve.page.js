const Page = require('./page');

class ReservePage extends Page {
  get reserveDate() { return $('#date'); }
  get datePickerClose() { return $('.ui-datepicker-close'); }
  get reserveTerm() { return $('#term'); }
  get headCount() { return $('#head-count'); }
  get breakfastPlan() { return $('#breakfast'); }
  get earlyCheckInPlan() { return $('#early-check-in'); }
  get sightseeingPlan() { return $('#sightseeing'); }
  get username() { return $('#username'); }
  get contact() { return $('#contact'); }
  get email() { return $('#email'); }
  get tel() { return $('#tel'); }
  get comment() { return $('#comment'); }
  get submitButton() { return $('button[data-test="submit-button"]') }
  get roomFrame() { return $('iframe[name="room"]'); }
  get planName() { return $('#plan-name'); }
  get reserveDateMessage() { return $('#date ~ .invalid-feedback'); }
  get reserveTermMessage() { return $('#term ~ .invalid-feedback'); }
  get headCountMessage() { return $('#head-count ~ .invalid-feedback'); }
  get usernameMessage() { return $('#username ~ .invalid-feedback'); }
  get emailMessage() { return $('#email ~ .invalid-feedback'); }
  get telMessage() { return $('#tel ~ .invalid-feedback'); }

  setReserveDate(value) {
    this.reserveDate.setValue(value);
    this.datePickerClose.click();
  }

  setBreakfastPlan(checked) {
    if (this.breakfastPlan.isSelected() !== checked) {
      this.breakfastPlan.click();
    }
  }

  setEarlyCheckInPlan(checked) {
    if (this.earlyCheckInPlan.isSelected() !== checked) {
      this.earlyCheckInPlan.click();
    }
  }

  setSightseeingPlan(checked) {
    if (this.sightseeingPlan.isSelected() !== checked) {
      this.sightseeingPlan.click();
    }
  }

  submit() {
    this.submitButton.click();
  }
}

module.exports = new ReservePage();
