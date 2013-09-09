module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', 'test/**/*.js', '<%= pkg.name %>']
		},
		strip_code: {
			dist: {
				src: '<%= pkg.name %>',
				dest: 'tmp/<%= pkg.name %>'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | MIT license | http://github.com/rkrupinski/easter.js */\n'
			},
			dist: {
				src: 'tmp/<%= pkg.name %>',
				dest: '<%= pkg.name.split(\'.\').shift() %>.min.js'
			}
		},
		clean: ['tmp']
	});

	grunt.registerTask('test', [
		'jshint',
	]);

	grunt.registerTask('default', [
		'test',
		'strip_code',
		'uglify',
		'clean'
	]);

};