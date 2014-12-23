angular
    .module('itms.map', ['ui.router', 'ui.bootstrap'])
    .config(['$stateProvider',
        function ($stateProvider) {
           $stateProvider
               .state('app.user.map', {
                  url: '/map',
                  data: {
                     showOnMenu: false,
                     displayName: '地图'
                  },
                  views: {
                     '': {
                        templateUrl: 'app/map/map.tpl.html',
                        controller: LoginCtrl
                     }
                  }
               });
        }
    ]);
