import puppetteer from 'puppeteer';

const { fork } = require('child_process');

jest.setTimeout(30000);
describe('Форма', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  test('Показан', async () => {
    await page.goto(baseUrl);
    const button = await page.$('#button');
    button.click();
    await page.waitForSelector('.title');
    const popoverTitle = await page.$eval('.title', (e) => e.textContent);
    expect(popoverTitle).toBe('Вот он, воздушный кексик :)');
  });

  test('Спрятан', async () => {
    const button = await page.$('#button');
    await button.click();
    await page.waitForSelector('#popover');
    const popover = await page.$eval('#popover', (e) => e.classList.contains('hidden'));
    expect(popover).toBe(true);
  });
});
