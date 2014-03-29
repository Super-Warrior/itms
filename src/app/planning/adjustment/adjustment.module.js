angular
    .module('itms.planning.adjustment', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('planning.adjustment', {
                url: '/adjust',
                views: {
                    'container@': {
                        templateUrl: 'app/planning/adjustment/adjustment.tpl.html',
                        controller: 'EOAssignAdjustCtrl'

                    }
                }
            });
    }]);