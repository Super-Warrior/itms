module.exports = function (grunt) {
    var buildConfig =  require('./build.config');

    grunt.initConfig({
        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        buildConfig: buildConfig,
        build_dir:'app',
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                //   dir: '<%= build_dir %>',
                src: [
                    '<%= buildConfig.vendor_files.js %>',
                    '<%= buildConfig.vendor_files.css %>'
                ]
            }

//            /**
//             * When it is time to have a completely compiled application, we can
//             * alter the above to include only a single JavaScript and a single CSS
//             * file. Now we're back!
//             */
//            compile: {
//                dir: '<%= compile_dir %>',
//                src: [
//                    '<%= concat.compile_js.dest %>',
//                    '<%= vendor_files.css %>',
//                    '<%= recess.compile.dest %>'
//                ]
//            }
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
        grunt.file.copy('app/index.html2', 'app/index.html', {
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
}
