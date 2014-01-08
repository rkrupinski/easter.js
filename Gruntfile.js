module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'easter.js'
			]
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		strip_code: {
			dist: {
				src: 'easter.js',
				dest: '.tmp/easter.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | MIT license | http://github.com/rkrupinski/easter.js */\n'
			},
			dist: {
				src: '.tmp/easter.js',
				dest: 'easter.min.js'
			}
		},
		clean: ['.tmp']
	});

	grunt.registerTask('test', [
		'jshint',
		'karma'
	]);

	grunt.registerTask('default', [
		'test',
		'strip_code',
		'uglify',
		'clean'
	]);

};