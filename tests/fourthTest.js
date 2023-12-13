const { By, Builder, Key, until } = require("selenium-webdriver");

async function testSearch() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Open Google homepage
    await driver.get("https://www.google.com/");
    // Wait for the Google homepage to load
    await driver.wait(until.titleIs("Google"), 10000);

    // Navigate to the website of "Primăria Itești, Bacău"
    await driver.get("https://comunaitestibacau.ro/");
    // Wait for the target page to load
    await driver.wait(until.titleIs("Primăria Itești, Bacău"), 10000);

    // Perform a Google search for "Primaria Itesti"
    let searchBox = await driver.findElement(By.name("q"));
    await searchBox.sendKeys("Primaria Itesti", Key.RETURN);

    // Wait for the search results page to load
    await driver.wait(until.titleContains("Primaria Itesti"), 10000);

    // Check if the first search result contains "Primaria Itesti"
    let firstResult = await driver.findElement(
      By.css("#search div.g:nth-child(1) div.rc div.r a")
    );
    let firstResultText = await firstResult.getText();

    if (firstResultText.includes("Primaria Itesti")) {
      console.log("Test passed: The first result is about Primaria Itesti.");
    } else {
      console.log(
        "Test failed: The first result is NOT about Primaria Itesti."
      );
    }
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Call the testSearch function to execute the test
testSearch();
