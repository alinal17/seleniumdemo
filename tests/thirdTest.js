const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function scrollAndCheckSchoolDumbrava() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the webpage
    await driver.get("https://comunaitestibacau.ro/");

    // Wait for the contact button to be present
    let contactButton = await driver.wait(
      until.elementLocated(By.id("header-menu__item-link-583")),
      5000
    );

    // Click on the contact button
    await contactButton.click();

    // Scroll down gradually
    for (let i = 0; i < 5; i++) {
      await driver.executeScript("window.scrollBy(0, 300);");
      await driver.sleep(1000); // Adjust the delay between scrolls if needed
    }

    // Check if the page contains the text "scoala dumbrava"
    const pageText = await driver.findElement(By.tagName("body")).getText();
    assert.ok(
      pageText.includes("Scoala Dumbrava"),
      "Page does not contain 'Scoala Dumbrava'"
    );

    console.log("Pass: Page Scrolled Down and Contains 'Scoala Dumbrava'");
  } catch (error) {
    console.error("Fail: " + error.message);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Call the function
scrollAndCheckSchoolDumbrava();
