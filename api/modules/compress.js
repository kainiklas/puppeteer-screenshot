const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

async function compress(file, quality, minQuality, maxQuality) {

	const compressedFile = await imagemin.buffer(file, {
		plugins: [
			imageminMozjpeg({
				quality: quality
			}),
			imageminPngquant({
				quality: [minQuality, maxQuality]
			})
		]
	});
	
	return compressedFile;
};

module.exports = { compress };