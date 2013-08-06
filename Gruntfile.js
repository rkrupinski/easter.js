module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | MIT license | http://github.com/rkrupinski/easter.js */\n'
			},
			dist: {
				src: '<%= pkg.name.split(\'.\').shift() %>.js',
				dest: '<%= pkg.name.split(\'.\').shift() %>.min.js'
			}
		},
		jshint: {
			dist: '<%= pkg.name.split(\'.\').shift() %>.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', [
		'jshint',
		'uglify'
	]);

};