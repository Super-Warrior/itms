angular
    .module('itms.planning.assignment', [
        'ui.router',
        'ui.bootstrap',
        'itms.planning.common'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('planning.assignment', {
                url: '/assignment',
                data: {
                    displayName: '需求分配'
                },
                views: {
                    'container@': {
                        templateUrl: 'app/planning/assignment/assignment.tpl.html',
                        controller: 'EOAssignCtrl'

                    }
                }
            })

    }]);
