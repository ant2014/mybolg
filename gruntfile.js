module.exports = function(grunt){
	grunt.initConfig ({
		watch:{
			jade:{
				files:['views/**'],	//jian ting de jade mulu
				options:{
					livereload: true
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schemas/**/*.js'],
				options: {
					livereload: true
				}
			}
		},
		nodemon:{
			dev:{
				options:{
					script:'app.js',	//rukou wenjian
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['./'],
					debug:true,
					delayTime:1,		//ruguo you dapiliang wenjian xuyao bianyi ,dengdai duoshao haomiao hou zai chongqi 
					env:{ PORT:3000},
					cwd:__dirname
				}
			}
		},
		concurrent:{
			tasks:['watch','nodemon'],
			options: {
				logConcurrentOutput: true
			}

		}

	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')

	grunt.option('force',true)

	grunt.registerTask('default',['concurrent'])
}