module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		strip_code: {
			dist: {
				src: 'src/easter.ts',
				dest: '.tmp/easter.ts'
			}
		},
		typescript: {
			options: {
				target: 'ES5'
			},
			dist: {
				src: ['.tmp/easter.ts'],
				dest: '.tmp/easter.js'
			},
			test: {
				src: ['src/easter.ts'],
				dest: '.tmp/easter.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | MIT license | http://github.com/rkrupinski/easter.js */\n'
			},
			dist: {
				src: '.tmp/easter.js',
				dest: 'dist/easter.js'
			}
		},
		umd: {
			dist: {
				options: {
					src: '.tmp/easter.js',
					dest: '.tmp/easter.js',
					globalAlias: 'easter',
					objectToExport: 'factory'
				}
			}
		},
		clean: {
			tmp: ['.tmp', 'dist']
		}
	});

	grunt.registerTask('test', [
		'clean',
		'typescript:test',
		'umd',
		'karma'
	]);

	grunt.registerTask('default', [
		'clean',
		'strip_code',
		'typescript:dist',
		'umd',
		'uglify'
	]);

};