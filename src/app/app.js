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
  .run(['$rootScope', '$state', '$stateParams', '$log', '$location', 'auth', bootstrap])
  .config(['$urlRouterProvider', '$stateProvider', routerConfig]);
//.config(['$httpProvider', httpConfig]);

function httpConfig($httpProvider) {
   $httpProvider.interceptors.push('authInterceptor');
}

angular.module('itms')
  .factory('authInterceptor', ['$rootScope', function ($rootScope) {
     return {
        request: function (config) {
           config.headers = config.headers || {};
           if ($rootScope.currentUser) {
              config.headers.Authorization = $rootScope.currentUser;
           }
           return config;
        }
     };
  }]);

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

function bootstrap($rootScope, $state, $stateParams, $log, $location, auth) {
   $rootScope.$state = $state;
   $rootScope.$stateParams = $stateParams;
   $log.info('app start');

   if (auth.isLoginRequired()) {
      if ($state.current && $state.current.name && $state.current.name === 'app.login')
         return;
      else
         $state.go('app.login');
   }
   else if ($location.$$path === '') {
      $state.go('app.user.dashboard');
   }
}
