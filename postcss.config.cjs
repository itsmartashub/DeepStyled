// postcss.config.cjs
module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-preset-env')({
			stage: 1,
			features: {
				'logical-properties-and-values': true,
				'has-pseudo-class': true,
				'is-pseudo-class': true,
				'not-pseudo-class': true,
			},
			browsers: 'last 2 versions',
			preserve: true, // Preserve original CSS
			enableClientSidePolyfills: true, // Enable client-side polyfills
		}),
	],
}
