angular
    .module('itms.transport.eoMaintainMap', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
           .state('app.user.transport.eoMaintainMap', {
              url: '/eoMaintainMap',
              data: {
                 displayName: '运单查询/维护'
              },
              views: {
                 '@app.user': {
                    templateUrl: 'app/transport/eoMaintainMap/eoMaintainMap.tpl.html',
                    controller: 'eoMaintainMapCtrl'
                 }
              }
           });
    }]);
