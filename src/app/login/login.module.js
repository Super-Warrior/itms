angular
    .module('itms.login', ['ui.router', 'ui.bootstrap'])
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('app.login', {
                    url: '/login',
                    data: {
                        showOnMenu: false,
                        displayName: '登陆'
                    },
                    views: {
                        '': {
                            templateUrl: 'app/login/login.tpl.html',
                            controller: LoginCtrl
                        }
                    }
                });
        }
    ]);
