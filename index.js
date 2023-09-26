const puppeteer = require('puppeteer');
const dataList = require('./dataList');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let i = 0; i < dataList.length; i++) {
    await download(page, dataList[i]);
    await delay(1000);
    const pages = await browser.pages();
    for (let j = 0; j < pages.length; j++) {
      if (pages[j] !== page) await pages[j].close()
    }
  }

  console.log('下載完成')
})();

async function download(page, url) {
  await page.goto('https://ytmp3.nu/oZdI/');
  await page.waitForSelector('#url')
  await page.type('#url', url);
  await page.click('body > form > div:nth-child(2) > input[type=submit]:nth-child(2)');
  await page.waitForSelector('body > form > div:nth-child(2) > a:nth-child(1)', { timeout: 1_000 * 60 * 60 });
  await page.click('body > form > div:nth-child(2) > a:nth-child(1)');
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}