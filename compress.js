const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

async function compress(file) {
	const compressedFile = await imagemin.buffer(file, {
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.4, 0.6]
			})
		]
	});
	return compressedFile;
};

module.exports = { compress };