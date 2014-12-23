var userConfig = require('./build.config.js');

var gruntHelper = {
   removeComments: function (str) {
      str = ('__' + str + '__').split('');
      var mode = {
         singleQuote: false,
         doubleQuote: false,
         regex: false,
         blockComment: false,
         lineComment: false,
         condComp: false
      };
      for (var i = 0, l = str.length; i < l; i++) {

         if (mode.regex) {
            if (str[i] === '/' && str[i - 1] !== '\\') {
               mode.regex = false;
            }
            continue;
         }

         if (mode.singleQuote) {
            if (str[i] === "'" && str[i - 1] !== '\\') {
               mode.singleQuote = false;
            }
            continue;
         }

         if (mode.doubleQuote) {
            if (str[i] === '"' && str[i - 1] !== '\\') {
               mode.doubleQuote = false;
            }
            continue;
         }

         if (mode.blockComment) {
            if (str[i] === '*' && str[i + 1] === '/') {
               str[i + 1] = '';
               mode.blockComment = false;
            }
            str[i] = '';
            continue;
         }

         if (mode.lineComment) {
            if (str[i + 1] === '\n' || str[i + 1] === '\r') {
               mode.lineComment = false;
            }
            str[i] = '';
            continue;
         }

         if (mode.condComp) {
            if (str[i - 2] === '@' && str[i - 1] === '*' && str[i] === '/') {
               mode.condComp = false;
            }
            continue;
         }

         mode.doubleQuote = str[i] === '"';
         mode.singleQuote = str[i] === "'";

         if (str[i] === '/') {

            if (str[i + 1] === '*' && str[i + 2] === '@') {
               mode.condComp = true;
               continue;
            }
            if (str[i + 1] === '*') {
               str[i] = '';
               mode.blockComment = true;
               continue;
            }
            if (str[i + 1] === '/') {
               str[i] = '';
               mode.lineComment = true;
               continue;
            }
            mode.regex = true;

         }

      }
      return str.join('').slice(2, -2);
   },
   removeBlanklines: function (str) {
      var arr = str.split('\r\n');
      for (var i = 0, l = arr.length; i < l; i++) {
         console.log(str[i]);
         if (arr[i].match(/^$/g)) {
            console.log('matched blank line');
            arr.splice(i, 1);
         }
      }
      return arr.join('');
   },
   filterForVendorJS: function (files) {
      return files.filter(function (file) {
         return file.match(/^\.tmp|src\/legacyscripts|vendor/) && file.match(/\.js$/);
      });
   },
   filterForAppjs: function (files) {
      return files.filter(function (file) {
         return file.match(/^src\/app|src\/common|build\/app/) && file.match(/\.js$/);
      });
   },
   filterForCSS: function (files) {
      return files.filter(function (file) {
         return file.match(/\.css$/);
      });
   },
   loadNpmTasks: function (grunt) {
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-connect');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-less');
      grunt.loadNpmTasks('grunt-newer');
      grunt.loadNpmTasks('grunt-karma');
   }
};

var grunttasks = function (grunt) {

   gruntHelper.loadNpmTasks(grunt);

   var taskConfig = {
      clean: ['build', 'release', '.tmp'],

      concat: {
         options: {
            separator: ';',
            process: function (src) {
               return gruntHelper.removeComments(src);
            }
         },
         build_vendor: {
            src: ['<%= vendor_files.vendorjs_min %>'],
            dest: '.tmp/vendor.js'
         },
         build_app: {
            src: ['<%= app_files.js %>'],
            dest: '.tmp/app.js'
         }
      },

      copy: {
         release_vendor: {
            files: [
                {
                   expand: true,
                   src: [
                       '.tmp/vendor.js',
                       '<%= vendor_files.vendorjs_unmin %>'
                   ],
                   dest: 'build/vendor/',
                   flatten: true
                }
            ]
         },
         debug_vendor: {
            files: [
                {
                   expand: true,
                   src: [
                       '<%= vendor_files.vendorjs %>'
                   ],
                   dest: 'build/vendor/',
                   flatten: true
                }
            ]
         },
         build_assets: {
            files: [
                {
                   expand: true,
                   cwd: 'src/assets',
                   src: ['img/**', 'sound/**'],
                   dest: 'build/'
                },
                {
                   expand: true,
                   cwd: '.',
                   src: ['vendor/font-awesome/fonts/*', 'vendor/bootstrap/dist/fonts/*'],
                   dest: 'build/fonts/',
                   flatten: true
                },
                {
                   expand: true,
                   src: ['<%= vendor_files.css %>', '<%= app_files.css %>'],
                   dest: 'build/styles',
                   flatten: true
                }
            ]
         },
         build_html: {
            files: [
                {
                   expand: true,
                   cwd: 'src',
                   src: ['*.html', '!*.tpl.html'],
                   dest: 'build/',
                   flatten: true
                },
                {
                   expand: true,
                   cwd: '.',
                   src: ['.tmp/*.html'],
                   dest: 'build/',
                   flatten: true
                }
            ]
         },
         debug_app: {
            files: [
                {
                   expand: true,
                   cwd: 'src',
                   src: ['app/**/*', 'common/**/*'],
                   dest: 'build/'
                }
            ]
         },
         release_app: {
            files: [
                {
                   expand: true,
                   src: ['.tmp/app.js'],
                   dest: 'build/app/',
                   flatten: true
                },
                {
                   expand: true,
                   cwd: 'src',
                   src: ['app/**/*.html', 'common/**/*.html'],
                   dest: 'build/'
                }
            ]
         },
         debug_map: {
            files: [
                {
                   expand: true,
                   cwd: 'src',
                   src: ['mapfiles/**'],
                   dest: 'build/'
                }
            ]
         },
         release_map: {
            files: [
                {
                   expand: true,
                   cwd: 'src',
                   src: ['mapfiles/**'],
                   dest: 'build/'
                }
            ]
         },

      },

      connect: {
         options: {
            port: 8080,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: 'localhost',
            livereload: 35729
         },
         livereload: {
            options: {
               open: true,
               base: ['build']
            }
         }
      },

      index: {
         debug: {
            expand: true,
            dir: '.tmp',
            src: [
                '<%= vendor_files.vendorjs %>',
                '<%= vendor_files.css %>',
                '<%= app_files.js %>',
                'build/styles/style.css'
            ]
         },
         release: {
            expand: true,
            dir: '.tmp',
            src: [
                '.tmp/vendor.js',
                '<%= vendor_files.vendorjs_unmin %>',
                '<%= vendor_files.css %>',
                'build/app/app.js',
                'build/styles/style.css'
            ]
         }
      },

      less: {
         debug: {
            files: [
                {
                   src: ['src/less/*.less'],
                   dest: '.tmp/style.css'
                }
            ]
         },
         release: {
            options: {
               cleancss: true
            },
            files: [
                {
                   src: ['src/less/*.less'],
                   dest: '.tmp/style.css'
                }
            ]
         }
      },

      watch: {
         js: {
            files: ['src/app/**/*', 'src/**/*.less', 'Gruntfile.js'],
            tasks: ['debug'],
            options: {
               livereload: true
            }
         },
         /*js: {
          files: ['app/scripts/{,*//*}*.js'],
             tasks: ['newer:jshint:all'],
             options: {
             livereload: true
             }
             },
             jsTest: {
             files: ['test/spec/{,*//*}*.js'],
             tasks: ['newer:jshint:test', 'karma']
             },
             styles: {
             files: ['<%= yeoman.app %>/styles/{,*//*}*.css'],
             tasks: ['newer:copy:styles', 'autoprefixer']
             },
             gruntfile: {
             files: ['Gruntfile.js']
             },*/
         livereload: {
            options: {
               livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'app/{,*/}*.html'
//                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
         }
      },

      karma: {
         unit: {
            configFile: 'karma.conf.js',
            browsers: ['PhantomJS'],
            singleRun: true,
            autoWatch: false
         },
         debug: {
            configFile: 'karma.conf.js',
            singleRun: false
         }
      }
   };

   grunt.util._.extend(taskConfig, userConfig);
   grunt.initConfig(taskConfig);

   grunt.registerMultiTask('index', 'Process index.html template', function () {

      var FILE_PATH = '^([a-z]:|/[a-z0-9 %._-]+/[a-z0-9 $%._-]+)?(/?(?:[^/:*?"<>|\r\n]+/)+)';
      var APP_PATH = '^src/|^build/';
      var dirRE = new RegExp(FILE_PATH, 'g');
      var appRE = new RegExp(APP_PATH, 'g');
      var jsFiles = gruntHelper.filterForVendorJS(this.filesSrc).map(function (file) {
         return 'vendor/' + file.replace(dirRE, '');
      });
      var appFiles = gruntHelper.filterForAppjs(this.filesSrc).map(function (file) {
         return file.replace(appRE, '');
      });
      var cssFiles = gruntHelper.filterForCSS(this.filesSrc).map(function (file) {
         return 'styles/' + file.replace(dirRE, '');
      });
      grunt.file.copy('src/index.tpl.html', this.data.dir + '/index.html', {
         process: function (contents, path) {
            return grunt.template.process(contents, {
               data: {
                  scripts: jsFiles,
                  appjs: appFiles,
                  styles: cssFiles,
                  version: grunt.config('pkg.version')
               }
            });
         }
      });
   });

   grunt.registerTask('default', ['clean', 'copy:build']);
   grunt.registerTask('build', ['clean', 'index', 'copy:build']);
   grunt.registerTask('debug', [
       'clean',
       'less:debug',
       'copy:debug_vendor',
       'copy:build_assets',
       'index:debug',
       'copy:build_html',
       'copy:debug_app',
       'copy:debug_map'

   ]);
   grunt.registerTask('release', [
       'clean',
       'less:release',
       'concat',
       'copy:release_vendor',
       'copy:build_assets',
       'copy:release_app',
       'index:release',
       'copy:build_html',
       'copy:release_map'
   ]);
   grunt.registerTask('serve', ['debug', 'connect:livereload', 'watch']);

};

module.exports = grunttasks;
