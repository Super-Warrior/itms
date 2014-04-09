angular
    .module('itms.dashboard', ['ui.router', 'ui.bootstrap'])
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    data: {
                        displayName: '我的iTMS'
                    },
                    views: {
                        'container@': {
                            templateUrl: 'app/dashboard/dashboard.tpl.html',
                            controller: 'DashboardCtrl'
                        }
                    }
                });
        }
    ]);
