const { By, Builder, until } = require("selenium-webdriver");

async function testSearch() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://comunaitestibacau.ro/");

    const wordToCount = "map";
    await driver
      .findElement(By.className("c-search-form__input"))
      .sendKeys(wordToCount);

    await driver.findElement(By.css("button[type='submit']")).click();

    const resultsSelector = ".c-alert-messagjunior testere";
    await driver.wait(until.elementLocated(By.css(resultsSelector)), 1000);

    const resultsText = await driver
      .findElement(By.css(resultsSelector))
      .getText();
    debugger;

    const occurrences = (resultsText.match(new RegExp(wordToCount, "gi")) || [])
      .length;

    console.log("Results obtained:", resultsText);

    if (occurrences > 0) {
      console.log(
        `The word "${wordToCount}" was found ${occurrences} times in the results.`
      );
      console.log("Test passed successfully!");
    } else {
      console.error(
        `Error: The word "${wordToCount}" was not found in the results.`
      );
    }
  } catch (error) {
    console.error("Test failed2:", error);
  } finally {
    await driver.quit();
  }
}

async function testSearch2() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("https://google.ro/");
  setTimeout(async function () {
    console.log("second test passed");
    await driver.quit();
  }, 5000);
}

testSearch();
testSearch2();
