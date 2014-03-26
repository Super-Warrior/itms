module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    var userConfig = require('./build.config.js');

    var taskConfig = {

        clean: ['build','release'],

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['vendor/**/*.css','styles/*'],
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
                        src: ['img/**','sound/**','fonts/**'],
                        dest: 'build/',
                    },
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['views/**'],
                        dest: 'build/',
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
            },
        },

        index: {
            src: [
                '<%= vendor_files.js %>',
                '<%= vendor_files.css %>'
            ]
        }
    };

    grunt.util._.extend(taskConfig,userConfig);
    grunt.initConfig(taskConfig);


    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var FILE_PATH = '^([a-z]:|/[a-z0-9 %._-]+/[a-z0-9 $%._-]+)?(/?(?:[^/:*?"<>|\r\n]+/)+)';
        var dirRE = new RegExp(FILE_PATH, 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return 'scripts/'+file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return 'styles/'+file.replace(dirRE, '');
        });

        //    can get custom property via attribute data
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

        function filterForJS(files) {
            return files.filter(function (file) {
                return file.match(/\.js$/);
            });
        }

        function filterForCSS(files) {
            return files.filter(function (file) {
                return file.match(/\.css$/);
            });
        }
    });

    grunt.registerTask('default',['clean','copy:build']);
    grunt.registerTask('build',['clean','index','copy:build']);
    grunt.registerTask('serve',['build','connect:livereload:keepalive']);

}
