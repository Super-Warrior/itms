angular
    .module('itms', [
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'common',
        'itms.transport',
        'itms.planning',
        'itms.requirement',
        'itms.common'
    ])
    .run(['$rootScope', '$state', '$stateParams', '$log', bootstrap])
    .config(['$urlRouterProvider', routerConfig]);

function routerConfig($urlRouterProvider) {
    $urlRouterProvider

//        .when('/c?id', '/transportation/eventmaintenance')
//        .when('/user/:id', '/transportation/eventmaintenance')
        .otherwise('/');
}

function bootstrap($rootScope, $state, $stateParams, $log) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $log.info('app start');
}