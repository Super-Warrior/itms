angular
    .module('itms.requirement', [
        'itms.requirement.upload',
        'itms.requirement.create'
    ])
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('requirement', {
                    abstract: true,
                    data: {
                        displayName: '需求管理'
                    },
                    url: '/requirement'
                });

        }
    ]);
