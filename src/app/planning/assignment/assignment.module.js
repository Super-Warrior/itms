angular
    .module('itms.planning.assignment', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('planning.assignment', {
                url: '/assignment',
                views: {
                    'container@': {
                        templateUrl: 'app/planning/assignment/assignment.tpl.html',
                        controller: 'EOAssignCtrl'

                    }
                }
            })

    }]);