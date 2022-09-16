// const puppeteer = require('puppeteer');
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra');

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

/*
// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
*/


const fs = require('fs/promises');
require('dotenv').config();
const { GMAIL, GPASS } = process.env;
(async () => {
  const browser = await puppeteer.launch(
    {
      headless: false,
      slowMo: 150,
    // args: ['--start-fullscreen'],
    }
  );
  const page = await browser.newPage();

  // await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9,hy;q=0.8' });
  // await page.setViewport({ width: 1900, height: 1200});

  await page.goto('https://slack.com/signin');

  await page.click('#google_login_button');


  await page.waitForSelector('input[type="email"]');
  await page.type('#identifierId', GMAIL);

  await Promise.all([
    page.waitForNavigation(),
    page.click('#identifierNext > div > button')
  ]);

  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', GPASS);

  await Promise.all([
    page.waitForNavigation(),
    page.click('#passwordNext > div > button')
  ]);

  // interface Workspaces {
  //  [index: number]: string;
  // }

  const workspaces = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#get_started_app_root > div.p-refreshed_page > div.p-workspaces_view__container > div > section > div > div.p-expanding_workspace_list > div.p-expanding_workspace_list__workspaces.p-expanding_workspace_list__workspaces--no_toggle > a > div > div.p-workspace_info__content > div.p-workspace_info__title'))
      .map(el => el.textContent);
  });

  console.log(workspaces);
  fs.writeFile('workspaces.txt', workspaces.join('\r\n'));


  await browser.close();


 
})();


// await page.click('#identifierNext > div > button');
// await page.waitForNavigation();

// await page.type('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', GPASS);

// await page.click('#passwordNext > div > button');
// await page.waitForNavigation();