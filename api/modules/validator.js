const { URL } = require('url');
const { timingSafeEqual } = require('crypto');

function getUrlFromPath(str) {
    let url = str.slice(1);
    if (!url.startsWith('http')) {
        return 'https://' + url;
    }
    return url;
}

function isValidUrl(str) {
    try {
        const url = new URL(str);
        return url.hostname.includes('.');
    } catch (e) {
        console.error(e.message);
        return false;
    }
}

function compare(a, b) {
    try {
        return timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8"));
    } catch {
        return false;
    }
};

module.exports = { getUrlFromPath, isValidUrl, compare };