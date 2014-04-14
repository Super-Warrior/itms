angular
    .module('itms.dashboard', ['ui.router', 'ui.bootstrap'])
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('app.user.dashboard', {
                    url: '/dashboard',
                    data: {
                        displayName: '我的iTMS'
                    },
                    views: {
                        '': {
                            templateUrl: 'app/dashboard/dashboard.tpl.html',
                            controller: 'DashboardCtrl'
                        }
                    }
                });
        }
    ]);
