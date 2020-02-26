module.exports = {
	map: false,
	plugins: [
		require('autoprefixer')(),
		require('postcss-flexbugs-fixes')(),
		require('cssnano')(),
	],
};
