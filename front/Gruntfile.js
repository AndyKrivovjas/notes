module.exports = function(grunt) {


	var config = {
		pkg: grunt.file.readJSON('package.json'),

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

		uglify: {
			options: {
				banner: '/* <%= pkg.name %> v<%= pkg.version %> at <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */ \n'
			}
		},

		sass: {
			dist : {
				files : {
					'assets/dist/css/main.css' : 'assets/src/scss/main.scss',
					'assets/dist/css/theme-responsive.css' : 'assets/src/scss/theme-responsive.scss',
				},
				options : {
					'style': 'compressed',
					'precision': '7'
				},
			},
		},

		watch: {
			sass_watch: {
				files : ['assets/src/scss/**/*.scss'],
				tasks : ['sass']
			},
			// typescript_watch: {
			// 	files : ['app/**/*.ts'],
			// 	tasks : ['shell:typescript']
			// }
		},
		shell: {
			git_add: {
				command: 'git add --all'
			},
			typescript: {
				command: 'tsc'
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
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-json-generator');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-prompt');

	grunt.registerTask('git', ['shell:git_add', 'prompt:target', 'gitcommit', 'gitpush']);
};
