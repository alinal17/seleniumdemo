const { By, Builder, until } = require("selenium-webdriver");

async function testSearch() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://comunaitestibacau.ro/");

    const wordToCount = "map";
    // Find the search input and enter the word "primaria"
    await driver
      .findElement(By.className("c-search-form__input"))
      .sendKeys(wordToCount);

    // Find the search button and click it
    await driver.findElement(By.css("button[type='submit']")).click();

    // Wait for the results to load (adjust the timeout if necessary)
    const resultsSelector = ".c-alert-message";
    await driver.wait(
      until.elementLocated(By.css(resultsSelector)),
      1000 // Increase the timeout to 15 seconds or adjust as needed
    );

    // Get the text of the results
    const resultsText = await driver
      .findElement(By.css(resultsSelector))
      .getText();
    debugger;
    // Count occurrences of the word "primaria"
    const occurrences = (resultsText.match(new RegExp(wordToCount, "gi")) || [])
      .length;

    // Log the actual results and the count to the console
    console.log("Results obtained:", resultsText);

    if (occurrences > 0) {
      console.log(
        `The word "${wordToCount}" was found ${occurrences} times in the results.`
      );
      console.log("Test passed successfully!");
    } else {
      // Log an error message if the word is not found
      console.error(
        `Error: The word "${wordToCount}" was not found in the results.`
      );
    }

    // You can add assertions here if needed
    // For example, assert.include(resultsText, "Expected Text", "Text not found in results");
  } catch (error) {
    console.error("Test failed2:", error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Run the test
testSearch();
