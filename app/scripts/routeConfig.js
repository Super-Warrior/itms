(function () {
    'use strict'

    var app = angular.module('itmsApp');

    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/myiTMS.html'
            })
            .when('/dashboard', {
                templateUrl: 'views/myiTMS.html'
            })
            .when('/transportation/maintainNetwork', {
                templateUrl: 'views/transportation/maintainNetwork.html',
                controller: "networkCtrl",
                resolve: {
                    orderlist: orderReteiver
                }
            })
            .when('/transportation/eomaintain', {
                templateUrl: 'views/transportation/lotusEOMaintain.html'
            })
            .when('/transportation/eomaintain3rd', {
                templateUrl: 'views/transportation/lotusEOMaintain3RD.html'
            })
            .when('/transportation/lotusnewer', {
                templateUrl: 'views/transportation/lotusNewER.html'
            })
            .when('/transportation/eomaintainevent', {
                templateUrl: 'views/transportation/lotusEOMaintainEvent.html'
            })
            .when('/requirement/myer', {
                templateUrl: 'views/requirement/itmsMyER.html'
            })
            .when('/requirement/ermaintain', {
                templateUrl: 'views/requirement/lotusERMaintain.html'
            })
            .when('/requirement/ermaintain2', {
                templateUrl: 'views/requirement/lotusERMaintain2.html'
            })
            .when('/requirement/requirementupload', {
                templateUrl: 'views/requirement/LotusdropzoneSingle.html'
            })
            .when('/planning/eoassign', {
                templateUrl: 'views/planning/lotusEOAssign.html'
            })
            .when('/planning/eoassignad', {
                templateUrl: 'views/planning/lotusEOAssignAD.html'
            })
            .when('/planning/autoassign', {
                templateUrl: 'views/planning/lotusEOAuto.html'
            })
            .when('/planning/booking', {
                templateUrl: 'views/planning/lotusBooking.html'
            })
            .when('/blankfunction', {
                templateUrl: 'views/lotusblankFunction.html'
            })
            .otherwise({ redirectTo: '/' });


        orderReteiver.$inject = ['$q', 'orderService'];
        function orderReteiver($q, orderService) {
            var deferred = $q.defer();
            orderService.queryAll()
                .then(function (result) {
                    deferred.resolve(result);
                });
            return deferred.promise;
        }

        //$locationProvider.html5Mode(true);
    });
}());
