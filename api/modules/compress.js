const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

async function compress(file, quality, qualityMin, qualityMax) {

	const compressedFile = await imagemin.buffer(file, {
		plugins: [
			imageminMozjpeg({
				quality: quality
			}),
			imageminPngquant({
				quality: [qualityMin, qualityMax]
			})
		]
	});
	
	return compressedFile;
};

module.exports = { compress };