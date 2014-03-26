'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        buildConfig: require('./build.config'),
        build_dir: 'app',
        index: require('./tasks/index.option'),
        yeoman: {
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },
        watch: require('./tasks/watch.option'),
        connect: require('./tasks/connect.option'),
        jshint: require('./tasks/jshint.option'),
        clean: require('./tasks/clean.option'),
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },
        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: require('./tasks/min.option').useminPrepare,
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: require('./tasks/min.option').usemin,
        // The following *-min tasks produce minified files in the dist folder
        imagemin: require('./tasks/min.option').imagemin,
        svgmin: require('./tasks/min.option').svgmin,
        htmlmin: require('./tasks/min.option').htmlmin,
        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },
        // Copies remaining files to places other tasks can use
        copy: require('./tasks/copy.option'),
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        less: require('./tasks/less.option')

    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'less:dev',
            'index',
            'connect:livereload',
            'watch'
        ]);
    });
    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

//        grunt.file.copy('app/index.html', this.data.dir + '/index.html', {
//            process: function (contents, path) {
//                return grunt.template.process(contents, {
//                    data: {
//                        scripts: jsFiles,
//                        styles: cssFiles,
//                        version: grunt.config('pkg.version')
//                    }
//                });
//            }
//        });
        grunt.file.copy('app/index2.html', 'app/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    //  grunt.registerTask('style',['less:development']);
    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });
    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);
    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        //'htmlmin',
        'style'
    ]);
    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
