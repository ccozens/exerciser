/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');

const config = {
	plugins: [
		autoprefixer,
		cssnano,
		postcssPresetEnv({
			features: { 'nesting-rules': true }
		})
	]
};

module.exports = config;
