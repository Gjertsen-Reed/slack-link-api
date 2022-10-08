
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
      // devtools: true,
    }
  );
  const page = await browser.newPage();
 

  await page.goto('https://slack.co-m m/signin');
  // await page.goto('https://operationspark.slack.com/');

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

  

  const workspaces = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#get_started_app_root > div.p-refreshed_page > div.p-workspaces_view__container > div > section > div > div.p-expanding_workspace_list > div.p-expanding_workspace_list__workspaces.p-expanding_workspace_list__workspaces--no_toggle > a > div > div.p-workspace_info__content > div.p-workspace_info__title'))
      .map(el => el.textContent);
  });

  console.log(workspaces);
  fs.writeFile('workspaces.txt', workspaces.join('\r\n'));


  await page.click('#get_started_app_root > div.p-refreshed_page > div.p-workspaces_view__container > div > section > div > div.p-expanding_workspace_list > div.p-expanding_workspace_list__workspaces.p-expanding_workspace_list__workspaces--no_toggle > a:nth-child(1)');

  
  // const newPage = await browser.newPage();
  // await newPage.goto(newPage.url(), { waitUntil: 'load' });
  
  




  // await browser.close();


 
})();


