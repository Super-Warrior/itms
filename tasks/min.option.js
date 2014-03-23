module.exports = {
    useminPrepare: {
        html: '<%= yeoman.app %>/index.html',
        options: {
            dest: '<%= yeoman.dist %>'
        }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
        html: ['<%= yeoman.dist %>/{,*/}*.html'],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        options: {
            assetsDirs: ['<%= yeoman.dist %>']
        }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
        dist: {
            files: [
                {
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }
            ]
        }
    },
    svgmin: {
        dist: {
            files: [
                {
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }
            ]
        }
    },
    htmlmin: {
        dist: {
            options: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeCommentsFromCDATA: true,
                removeOptionalTags: true
            },
            files: [
                {
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }
            ]
        }
    },
}