module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-karma');

    var userConfig = require('./build.config.js');

    var taskConfig = {

        clean: ['build', 'release'],
        
        concat: {
            options: {
                separator: ';'
            },
            build_vendor: {
                src: ['<%= vendor_files.vendorjs_min %>'],
                dest: '.tmp/vendor.js'
            }
        },

        copy: {
            build_vendor: {
                files: [
                    {
                        expand: true,
                        src: ['.tmp/vendor.js','<%= vendor_files.vendorjs_unmin %>'],
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
                        src: ['<%= vendor_files.css %>'],
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
                        src: ['*.html','!*.tpl.html'],
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
            build_app: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['app/**/*','common/**/*'],
                        dest: 'build/'
                    }
                ]
            },

            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['styles/*'],
                        dest: 'build/styles',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['<%= vendor_files.css %>'],
                        dest: 'build/styles',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['<%= vendor_files.js %>'],
                        dest: 'build/scripts/',
                        flatten: true
                    },
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['*.html'],
                        dest: 'build/',
                        flatten: true
                    },
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['img/**', 'sound/**'],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['vendor/font-awesome/fonts/*', 'vendor/bootstrap/dist/fonts/*'],
                        dest: 'build/fonts/',
                        flatten: true
                    },

                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['views/**'],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['scripts/**'],
                        dest: 'build/'
                    }
                ]
            }
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
            build: {
                expand: true,
                dir: '.tmp',
                src: [
                    '.tmp/vendor.js',
                    '<%= vendor_files.vendorjs_unmin %>',
                    '<%= vendor_files.css %>',
                    '<%= app_files.js %>'
                ]
            }
        },
        watch: {
            js: {
                files: ['src/app/**/*'],
                tasks: ['build2'],
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
        var APP_PATH = '^src/';
        var dirRE = new RegExp(FILE_PATH, 'g');
        var appRE = new RegExp(APP_PATH, 'g');
        var jsFiles = filterForVendorJS(this.filesSrc).map(function (file) {
            return 'vendor/' + file.replace(dirRE, '');
        });

        var appFiles = filterForAppjs(this.filesSrc).map(function (file) {
            return file.replace(appRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return 'styles/' + file.replace(dirRE, '');
        });
        console.log(cssFiles);
        grunt.file.copy('src/index.tpl.html', this.data.dir+'/index.html', {
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

        function filterForVendorJS(files) {
            return files.filter(function (file) {
                return file.match(/^\.tmp|src\/legacyscripts|vendor/) && file.match(/\.js$/);
            });
        }
        function filterForAppjs(files) {
            return files.filter(function (file) {
                return file.match(/^src\/app|src\/common/) && file.match(/\.js$/);
            });
        }

        function filterForCSS(files) {
            return files.filter(function (file) {
                return file.match(/\.css$/);
            });
        }
    });

    grunt.registerTask('default', ['clean', 'copy:build']);
    grunt.registerTask('build', ['clean', 'index', 'copy:build']);
    grunt.registerTask('build2', [
        'clean',
        'concat',
        'index:build',
        'copy:build_vendor',
        'copy:build_assets',
        'copy:build_html',
        'copy:build_app'
    ]);
    grunt.registerTask('serve', ['build2', 'connect:livereload', 'watch']);

};
