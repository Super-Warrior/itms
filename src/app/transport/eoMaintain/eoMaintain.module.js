angular
    .module('itms.transport.eoMaintain', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.user.transport.eoMaintain', {
                url: '/eoMaintain',
                data: {
                    displayName: '运单查询/维护'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/transport/eoMaintain/eoMaintainSearch.tpl.html',
                        controller: 'EOMaintainSearchCtrl'
                    }
                }
            });
    }]);
