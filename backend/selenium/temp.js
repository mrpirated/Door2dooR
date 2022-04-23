const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  driver
    .get('https://www.goibibo.com/')
    .then(() => {
      return driver
        .findElement(By.className('sc-iJKOTD iipKRx fswWidgetPlaceholder'))
        .click();
    })
    .then(() => {
      return driver
        .findElement(
          By.xpath(
            '/html/body/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/div/div[2]/div/input'
          )
        )
        .sendKeys('Mumbai');
    })
    .then(() => {
      return driver.findElement(By.id('autoSuggest-list'));
    })
    .then(() => {
      return driver
        .findElement(
          By.xpath(
            '/html/body/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/div/div[2]/ul/li[1]'
          )
        )
        .click();
    });
  //   try {
  //     await driver.get('https://www.goibibo.com/');
  //     await driver
  //       .findElement(By.className('sc-iJKOTD iipKRx fswWidgetPlaceholder'))
  //       .click();
  //     await driver
  //       .findElement(
  //         By.xpath(
  //           '/html/body/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/div/div[2]/div/input'
  //         )
  //       )
  //       .sendKeys('Mumbai');

  //     await driver;
  //     let list = driver.findElement(By.id(''));
  //     console.log(list);
  //     // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
  //     // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  //   } finally {
  //     // await driver.quit();
  //   }
})();
