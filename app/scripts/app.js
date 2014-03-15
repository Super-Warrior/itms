(function () {
    'use strict'

    var app = angular.module('itmsApp', [
        'ngRoute',
        'ui.bootstrap',
        'common.directives',
        'angular-loading-bar'
    ]);

    // app.run until app.config finished!!! this is important
    app.run(function ($rootScope, $templateCache, $location, config) {
        if (config.mode === 'development') {
            //  $templateCache.removeAll();
        }
        $location.path('/');
        console.log('app started!!!!');
    });

}());
