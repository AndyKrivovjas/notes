module.exports = function(grunt) {

	var forEach = require("for-each");


	var assetsDir 	= 'assets/';
	var bowerDir 	= assetsDir + 'bower/';
	var distDir 	= assetsDir + 'dist/';
	var themeDir 	= assetsDir + 'theme/';
	var stylesDir 	= assetsDir + 'src/css/';
	var scriptsDir 	= assetsDir + 'src/js/';

	var includes = {
		css: {
			header: [
				bowerDir + 'bootstrap/dist/css/bootstrap.css',
				bowerDir + 'font-awesome/css/font-awesome.css',
				themeDir + 'css/style.css',
				themeDir + 'css/animate.css',
				themeDir + 'css/colors/sky-blue.css',
				stylesDir + 'main.css'
			],
			footer: []
		},
		js: {
			header: [
				bowerDir + 'jquery/dist/jquery.min.js',
				bowerDir + 'angular/angular.js'
			],
			footer: [
				bowerDir + 'bootstrap/dist/js/bootstrap.min.js',
				themeDir + 'js/jquery.appear.js',
				themeDir + 'js/jquery.nicescroll.js',
				themeDir + 'js/jquery.lettering.js',
				themeDir + 'js/jquery.textillate.js',
				themeDir + 'js/count-to.js',
				themeDir + 'js/nivo-lightbox.js',
				themeDir + 'js/script.js',
				scriptsDir + 'template.js'
			]
		}
	};


	var config = {
		pkg: grunt.file.readJSON('package.json'),

		includes: includes,

		concat: {
			options: {
				stripBanners: true,
				banner: '/* <%= pkg.name %> v<%= pkg.version %> at <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */ \n'
			}
		},

		cssmin: {
			options: {
				root: '.'
			}
		},

		jshint: {
			// define the files to lint
			files: includes.js.footer,
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
		      // more options here if you want to override JSHint defaults
			globals: {
				jQuery: true
		    }
		  }
		},

		uglify: {
			options: {
				banner: '/* <%= pkg.name %> v<%= pkg.version %> at <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */ \n'
			}
		},

		targethtml: {
			dev: {
				files: {}
			},
			production: {
				files: {}
			}
		},

		watch: {
			scripts: {
				files: ['js/**/*.js', '!js/modules/*.js', 'main.html'],
				tasks: ['dev']
			}
		},
		shell: {
			git_add: {
				command: 'git add --all'
			}
		},
		gitcommit: {
			commit: {
				options: {
					message: 'Grunt test',
					noVerify: true
				}
			}
		},
		gitpush: {
			push_commit: {
				options: {
					branch: 'master'
				}
			}
		},
		prompt: {
			target: {
				options: {
					questions: [
						{
							config: 'gitcommit.commit.options.message', // arbitrary name or config for any other grunt task
							type: 'input', // list, checkbox, confirm, input, password
							message: 'Enter your commit: ', // Question to ask the user, function needs to return a string,
							default: 'commit#' + (+new Date)
						}
					]
				}
			}
		},

		compileNode: {
			src: 'app/api/templates/index.html',
			dest: 'app/api/templates/index.html'
		}
	};


	forEach(includes.css, function(settings, position) {
		if(settings.length) {
			config.concat[position] = {
				src: settings,
				dest: distDir + 'css/styles.' + position + '.css'
			}
			config.cssmin[position] = {
				src: distDir + 'css/styles.' + position + '.css',
				dest: distDir + 'css/styles.' + position + '.min.css'
			}
		}
	});
	
	forEach(includes.js, function(settings, position) {
		if(settings.length) {
			config.uglify[position] = {
				src: settings,
				dest: distDir + 'js/scripts.' + position + '.min.js'
			}
		}
	});

	forEach(config.targethtml, function(value, type) {
		value.files['app/api/templates/index.html'] = 'app/api/templates/main.html';
	});

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-json-generator');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-prompt');


	grunt.registerTask( "compileNode", "Generate index.html depending on configuration", function() {
		var conf = grunt.config('compileNode'),
			tmpl = grunt.file.read(conf.src);

		grunt.file.write(conf.dest, grunt.template.process(tmpl));

		grunt.log.writeln('Generated \'' + conf.dest + '\' from \'' + conf.src + '\'');
	});


	grunt.registerTask('test', ['targethtml:production']);
	grunt.registerTask('min', ['concat', 'cssmin', 'uglify']);
	grunt.registerTask('dev', ['targethtml:dev', 'compileNode']);
	grunt.registerTask('production', ['targethtml:production', 'min']);
	grunt.registerTask('git', ['production', 'shell:git_add', 'prompt:target', 'gitcommit', 'gitpush']);
};