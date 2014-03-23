module.exports = {

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