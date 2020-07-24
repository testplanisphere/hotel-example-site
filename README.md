# hotel-example-site

![selenide](https://github.com/testplanisphere/hotel-example-selenide/workflows/selenide/badge.svg)
![webdriverio](https://github.com/testplanisphere/hotel-example-webdriverio/workflows/webdriverio/badge.svg)
![capybara](https://github.com/testplanisphere/hotel-example-capybara/workflows/capybara/badge.svg)
![selenium3-java](https://github.com/testplanisphere/hotel-example-selenium3-java/workflows/selenium3-java/badge.svg)

## This site is a sandbox to practice test automation.

This site aims to learn browser automation with running automation scripts against this site as the system under test.

You can refer to this site from any places such as books and blogs under [MIT License](https://github.com/testplanisphere/hotel-example-site/blob/master/LICENSE).

It is made for learning test automation, but you can also use it to learn test design and technique.

### Site Structure

This site provides mocked booking hotel feature. It has input forms to log in, sign up, and reserve a room. The layout is mobile friendly by responsive design.

#### Terms of Use

* We confirmed sample code worked with the latest Google Chrome in June 2020.
* This site is working on GitHub pages.
* About input data
  * The data is stored in the browser's Cookie, Session Storage and Local Storage.
  * he data is NOT stored in the server side such as database.
  * Due to the specification of HTML, the contents of the form are sent as the last part of the URL. Please note that it may be left in the GitHub server's logs and other records.
* Do NOT use this site for stress testing.
* We do not take any responsibilities by using this site.

### Changelog

#### v1.1.0 (2020-04-29)

* Add example codes using Selenide and Capybara

#### v1.0.0 (2020-04-14)

* First release