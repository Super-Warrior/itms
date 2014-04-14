angular
    .module('itms.planning.adjustment', [
        'ui.router',
        'ui.bootstrap',
        'itms.planning.common'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.user.planning.adjustment', {
                url: '/adjust',
                data: {
                    displayName: '分配调整'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/planning/adjustment/adjustment.tpl.html',
                        controller: 'EOAssignAdjustCtrl'

                    }
                }
            });
    }]);
