const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

async function downloadFirstZIPDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the webpage
    await driver.get("https://comunaitestibacau.ro/");

    // Wait for the document section to be present
    let documentSection = await driver.wait(
      until.elementLocated(By.id("header-menu__item-link-363")),
      5000
    );

    // Click on the document section
    await documentSection.click();

    // Pause for a moment to allow the document menu to appear
    await driver.sleep(5000); // Adjust the time according to your needs

    // Wait for the ZIP document link to be present
    let zipLink = await driver.wait(
      until.elementLocated(By.css('a[href$=".zip"]')),
      5000
    );

    // Get the download directory
    const downloadDirectory = path.join(
      process.env.HOME || process.env.USERPROFILE,
      "Downloads"
    );

    // Get the initial number of files in the download directory
    const initialFileCount = fs.readdirSync(downloadDirectory).length;

    // Click on the zip document link using JavaScript to trigger the download
    await driver.executeScript("arguments[0].click();", zipLink);

    // Wait for the download to complete
    await driver.wait(async () => {
      const currentFileCount = fs.readdirSync(downloadDirectory).length;
      return currentFileCount > initialFileCount;
    }, 90000);

    console.log("Pass: Download Successful");
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Call the function
downloadFirstZIPDocument();
