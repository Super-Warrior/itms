(function(){
    'use strict'

    var app = angular.module('itmsApp');

    var config = {
        version: '0.0.1',
        mode: 'production' //development or production
    };

    app.config(['$logProvider', function($logProvider){
        if($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    app.config(['$provide', function($provide){
        $provide.decorator('$exceptionHandler', function(){
            return function(exception, cause){
                var error = { exception: exception, cause: cause};
                throw error;
            };
        });

        $provide.decorator('$q', function ($delegate) {
            var defer = $delegate.defer;

            $delegate.defer = function () {
                var deferred = defer();
                deferred.promise.success = function (fn) {
                    deferred.promise.then(function (value) {
                        fn(value);
                    });
                    return deferred.promise;
                };

                deferred.promise.error = function (fn) {
                    deferred.promise.then(null, function (value) {
                        fn(value);
                    });
                    return deferred.promise;
                };
                return deferred;
            };
            return $delegate;
        });
    }]);

    app.config(function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    });

    app.value('config', config);

}());
