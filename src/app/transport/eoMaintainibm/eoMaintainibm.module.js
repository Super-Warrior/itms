angular
    .module('itms.transport.eoMaintainibm', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        
            .state('app.user.transport.eoMaintainibm', {
                url: '/eoMaintain2',
                data: {
                    displayName: '运单查询/维护'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/transport/eoMaintainibm/eoMaintainibm.tpl.html',
                        controller: 'eoMaintainibmCtrl'
                    }
                }
            });
    }]);
