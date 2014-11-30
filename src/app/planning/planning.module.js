angular
    .module('itms.planning', [
        'itms.planning.adjustment',
        'itms.planning.assignment',
        'itms.planning.erPlanibm'
    ])
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('app.user.planning', {
                    abstract: true,
                    url: '/planning',
                    data: {
                        displayName: '计划'
                    },
                    //template: '<div>this is transportation state</div><div ui-view></div>',
                    controller: ['$scope', '$state', 'contacts', 'utils',
                        function($scope, $state, contacts, utils) {

                        }
                    ]
                });

        }
    ]);
angular.module('itms.planning.common', []);

