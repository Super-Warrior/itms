(function () {
    'use strict'

    var app = angular.module('itmsApp', [
//        'ngAnimate',
        'ngRoute',
        'ui.bootstrap',
        'common.directives',
        'angular-loading-bar'
    ]);

    // app.run until app.config finished!!! this is important
    app.run(function ($rootScope, $location) {
       // $location.path('/loginurl');
        console.log('app started!!!!');
    });

}());
