var chrome = {};
var puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  // running locally.
  puppeteer = require('puppeteer');
}

async function getScreenshot(url, type, quality, fullPage, viewportWidth, viewportHeight) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        defaultViewport: {
            width: viewportWidth,
            height: viewportHeight
        }
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => { 
        window.scrollBy(0, window.innerHeight); 
        window.scrollTo(0, 0); 
    });
    const file = await page.screenshot({ type,  quality, fullPage });
    await browser.close();
    return file;
}

module.exports = { getScreenshot };
