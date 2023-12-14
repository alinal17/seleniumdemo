const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function scrollAndCheckSchoolDumbrava() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://comunaitestibacau.ro/");

    let contactButton = await driver.wait(
      until.elementLocated(By.id("header-menu__item-link-583")),
      5000
    );

    await contactButton.click();

    for (let i = 0; i < 5; i++) {
      await driver.executeScript("window.scrollBy(0, 300);");
      await driver.sleep(1000);
    }

    const pageText = await driver.findElement(By.tagName("body")).getText();
    assert.ok(
      pageText.includes("Scoala Dumbrava"),
      "Page does not contain 'Scoala Dumbrava'"
    );

    console.log("Pass: Page Scrolled Down and Contains 'Scoala Dumbrava'");
  } catch (error) {
    console.error("Fail: " + error.message);
  } finally {
    await driver.quit();
  }
}

scrollAndCheckSchoolDumbrava();
