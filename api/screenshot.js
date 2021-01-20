const { parse } = require('url');
const { getScreenshot } = require('./modules/chromium');
const { getUrlFromPath, isValidUrl, compare } = require('./modules/validator');
const { compress } = require('./modules/compress');

const SECRET_KEY = process.env.SECRET_KEY;

const defaultFullPage = process.env.fullPage || false;
const defaultType = process.env.type || 'png';
const defaultViewportWidth = process.env.viewportWidth || 1200;
const defaultViewportHeight = process.env.viewportHeight || 700;
const defaultDeviceScaleFactor = process.env.deviceScaleFactor || 1.0;
const defaultQuality = process.env.quality || 75;
const defaultMinQuality = process.env.qualityMin || 0.4;
const defaultMaxQuality = process.env.qualityMax || 0.6;

module.exports = async function (req, res) {

    if (!compare(req.query.key, SECRET_KEY)) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Bad ?key=</h1><p>Permission denied</p>');
        return;
    }

    try {
        const { pathname = '/' } = parse(req.url, true);
        const url = getUrlFromPath(pathname);

        // get all params
        const fullPage = req.query.type || defaultFullPage;
        const type = req.query.type || defaultType;
        const viewportWidth = parseInt(req.query.viewportWidth) || defaultViewportWidth;
        const viewportHeight = parseInt(req.query.viewportHeight) || defaultViewportHeight;
        const deviceScaleFactor = parseFloat(req.query.deviceScaleFactor) || defaultDeviceScaleFactor;
        const quality = parseInt(req.query.quality) || defaultQuality;
        let minQuality = parseFloat(req.query.minQuality) || defaultMinQuality;
        let maxQuality = parseFloat(req.query.maxQuality) || defaultMaxQuality;

        minQuality = Math.min(minQuality, maxQuality);
        maxQuality = Math.max(minQuality, maxQuality);

        if (!isValidUrl(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);

        } else {
            const file = await getScreenshot(url, type, fullPage, viewportWidth, viewportHeight, deviceScaleFactor);

            const compressedFile = await compress(file, quality, minQuality, maxQuality);

            res.statusCode = 200;
            res.setHeader('Content-Type', `image/${type}`);
            res.end(compressedFile);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(e.message);
    }
};
