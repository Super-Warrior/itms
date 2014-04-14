angular
    .module('itms', [
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'angular-loading-bar',
        'common',
        'itms.auth',
        'itms.transport',
        'itms.planning',
        'itms.requirement',
        'itms.common',
        'itms.dashboard',
        'itms.login'
    ])
    .run(['$rootScope', '$state', '$stateParams', '$log', '$location','auth', bootstrap])
    .config(['$urlRouterProvider', '$stateProvider', routerConfig]);

function routerConfig($urlRouterProvider, $stateProvider) {
//    $urlRouterProvider
//
//        //        .when('/c?id', '/transportation/eventmaintenance')
//        //        .when('/user/:id', '/transportation/eventmaintenance')
//        .otherwise('dashboard');
    $stateProvider
        .state('app', {
            abstract: true,
            template: '<div data-ui-view></div>'
        })
        .state('app.user', {
            abstract: true,
            templateUrl: 'app/layout/shell.html',
            controller: 'shellCtrl'
        });
}

function bootstrap($rootScope, $state, $stateParams, $log, $location,auth) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $log.info('app start');
    if (auth.isLoginRequired()) {
        $state.go('app.login');
    }
    else if ($location.$$path === '') {
        $state.go('app.user.dashboard');
    }
}
