module.exports = function(grunt) {

	var forEach = require("for-each");


	var assetsDir 	= 'assets/';
	var bowerDir 	= assetsDir + 'bower/';
	var distDir 	= assetsDir + 'dist/';
	var stylesDir 	= assetsDir + 'src/css/';
	var sassDir 	= assetsDir + 'src/sass/';
	var scriptsDir 	= assetsDir + 'src/js/';
	var angularDir 	= assetsDir + 'src/angular/';

	var includes = {
		css: {
			header: [
				bowerDir + 'font-awesome/css/font-awesome.css',
				bowerDir + 'angular-material/angular-material.css',
				stylesDir + 'main.css',
				stylesDir + 'theme-responsive.css',
			],
			footer: []
		},
		js: {
			header: [
				bowerDir + 'jquery/dist/jquery.js',
				bowerDir + 'lodash/dist/lodash.js',
				bowerDir + 'angular/angular.js',
				bowerDir + 'angular-route/angular-route.js',
			],
			footer: [
				bowerDir + 'angular-animate/angular-animate.js',
				bowerDir + 'angular-aria/angular-aria.js',
				bowerDir + 'angular-messages/angular-messages.js',
				bowerDir + 'angular-material/angular-material.js',
				bowerDir + 'moment/min/moment-with-locales.js',
				bowerDir + 'moment-timezone/moment-timezone.js',
				bowerDir + 'angular-moment/angular-moment.js',
				bowerDir + 'masonry/dist/masonry.pkgd.js',
				bowerDir + 'nicescroll/dist/jquery.nicescroll.min.js',
				scriptsDir + 'template.js',
				angularDir + 'app.js',
				angularDir + 'controllers/MainController.js',
				angularDir + 'controllers/NotesListController.js',
				angularDir + 'controllers/LoginController.js',
				angularDir + 'controllers/SideMenuController.js',
				angularDir + 'services/request.js',
				angularDir + 'services/authSvc.js',
				angularDir + 'services/userSvc.js',
				angularDir + 'services/notesSvc.js',
				angularDir + 'directives/loader.js',
				angularDir + 'directives/masonry.js',
				angularDir + 'directives/finish-render.js',
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

		sass: {
            dist : {
                files : {
                    'assets/src/css/main.css' : 'assets/src/sass/main.scss',
                    'assets/src/css/theme-responsive.css' : 'assets/src/sass/theme-responsive.scss',
                },
                options : {
                    'style': 'compressed',
                    'precision': '7'
                },
            },
        },

		watch: {
			scripts: {
				files: ['assets/src/js/**/*.js', 'assets/src/angular/**/*.js', 'assets/src/views/main.html', 'Gruntfile.js'],
				tasks: ['dev']
			},
			sass_watch: {
                files : ['assets/src/sass/**/*.scss'],
                tasks : ['sass']
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
		value.files['app/api/templates/index.html'] = 'assets/src/views/main.html';
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
	grunt.loadNpmTasks('grunt-contrib-sass');
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
	grunt.registerTask('git', ['dev', 'shell:git_add', 'prompt:target', 'gitcommit', 'gitpush']);
};
