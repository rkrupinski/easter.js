module.exports = function(config) {
	config.set({
		frameworks: [
			'jasmine'
		],
		browsers: [
			'PhantomJS'
		],
		files: [
			'.tmp/easter.js',
			'test/**/*.js'
		],
		reporters: [
			'dots',
			'coverage'
		],
		preprocessors: {
			'.tmp/easter.js': ['coverage']
		},
		singleRun: true
	});
};
