angular
    .module('itms.transport', [
        'itms.transport.event'
    ])
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('app.user.transport', {
                    abstract: true,
                    url: '/transport',
                    data: {
                        displayName: '运输执行'
                    }
                });

        }
    ]);
