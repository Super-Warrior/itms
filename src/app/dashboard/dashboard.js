angular
    .module('itms.dashboard', ['ui.router', 'ui.bootstrap'])
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    views: {
                        'container@': {
                            templateUrl: 'app/dashboard/dashboard.tpl.html',
                            controller: 'DashboardCtrl'
                        }
                    }
                });
        }
    ]);
