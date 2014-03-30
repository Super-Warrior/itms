angular
    .module('itms.transport', [
        'itms.transport.event',
        'itms.transport.network'
    ])
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('transport', {
                    abstract: true,
                    url: '/transport',
                    data: {
                        displayName: '运输执行'
                    },
                    controller: ['$scope', '$state',
                        function($scope, $state) {
                            $scope.goToRandom = function() {
                                // $state.go() can be used as a high level convenience method
                                // for activating a state programmatically.
                                $state.go('contacts.detail', {
                                    contactId: randId
                                });
                            };
                        }
                    ]
                });

        }
    ]);
