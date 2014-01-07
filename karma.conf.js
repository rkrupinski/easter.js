module.exports = function(config) {
	config.set({
		frameworks: [
			'jasmine'
		],
		browsers: [
			'PhantomJS'
		],
		files: [
			'easter.js',
			'test/**/*.js'
		],
		reporters: [
			'dots',
			'coverage'
		],
		preprocessors: {
			'easter.js': ['coverage']
		},
		singleRun: true
	});
};
