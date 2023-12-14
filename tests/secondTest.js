const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

async function downloadFirstZIPDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://comunaitestibacau.ro/");

    let documentSection = await driver.wait(
      until.elementLocated(By.id("header-menu__item-link-363")),
      5000
    );

    await documentSection.click();

    await driver.sleep(5000);

    let zipLink = await driver.wait(
      until.elementLocated(By.css('a[href$=".zip"]')),
      5000
    );

    const downloadDirectory = path.join(
      process.env.HOME || process.env.USERPROFILE,
      "Downloads"
    );

    const initialFileCount = fs.readdirSync(downloadDirectory).length;

    await driver.executeScript("arguments[0].click();", zipLink);

    await driver.wait(async () => {
      const currentFileCount = fs.readdirSync(downloadDirectory).length;
      return currentFileCount > initialFileCount;
    }, 90000);

    console.log("Pass: Download Successful");
  } finally {
    await driver.quit();
  }
}

downloadFirstZIPDocument();
