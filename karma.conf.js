// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            'app/vendor/angular/angular.js',
            'app/vendor/angular-bootstrap/ui-bootstrap.js',
            'app/vendor/angular-loading-bar/build/loading-bar.js',
            'app/vendor/jquery/dist/jquery.js',
            'app/vendor/angular-mocks/angular-mocks.js',
            'app/vendor/angular-resource/angular-resource.js',
            'app/vendor/angular-cookies/angular-cookies.js',
            'app/vendor/angular-sanitize/angular-sanitize.js',
            'app/vendor/angular-route/angular-route.js',
            'app/scripts/*.js',
            'app/scripts/**/*.js',
            //'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        reporters: ['progress'],

        plugins: [
            'karma-jasmine',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],

        color: true,
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
