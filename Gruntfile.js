module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | MIT license | http://github.com/rkrupinski/easter.js */\n'
			},
			dist: {
				src: '<%= pkg.name %>',
				dest: '<%= pkg.name.split(\'.\').shift() %>.min.js'
			}
		},
		jshint: {
			dist: '<%= pkg.name %>'
		},
		jasmine: {
			dist: {
				options: {
					specs: 'test/*.js',
					helpers: [
						'test/helpers/*.js'
					]
				},
				src: '<%= pkg.name %>'

			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', [
		'jshint',
		'jasmine'
	]);

	grunt.registerTask('default', [
		'test',
		'uglify'
	]);

};