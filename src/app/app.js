angular
    .module('itms', [
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'common',
        'itms.transport',
        'itms.planning',
        'itms.requirement',
        'itms.common',
        'itms.dashboard'
    ])
    .run(['$rootScope', '$state', '$stateParams', '$log', '$location', bootstrap])
    .config(['$urlRouterProvider', '$stateProvider', routerConfig]);

function routerConfig($urlRouterProvider) {
    $urlRouterProvider

        //        .when('/c?id', '/transportation/eventmaintenance')
        //        .when('/user/:id', '/transportation/eventmaintenance')
        .otherwise('dashboard');
}

function bootstrap($rootScope, $state, $stateParams, $log, $location) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $log.debug($state);
    $log.debug($stateParams);
    $log.info('app start');
    if ($location.$$path === '') {
        $state.go('dashboard');
    }
}
