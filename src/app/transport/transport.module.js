angular
    .module('itms.transport', [
        'itms.transport.event',
        'itms.transport.network'
    ])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('transport', {
                    abstract: true,
                    url: '/transport',
                    //template: '<div>this is transportation state</div><div ui-view></div>',
                    controller: ['$scope', '$state', 'contacts', 'utils',
                        function ($scope, $state, contacts, utils) {

                            // Add a 'contacts' field in this abstract parent's scope, so that all
                            // child state views can access it in their scopes. Please note: scope
                            // inheritance is not due to nesting of states, but rather choosing to
                            // nest the templates of those states. It's normal scope inheritance.
                            $scope.contacts = contacts;

                            $scope.goToRandom = function () {
                                var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

                                // $state.go() can be used as a high level convenience method
                                // for activating a state programmatically.
                                $state.go('contacts.detail', { contactId: randId });
                            };
                        }]
                });

        }]);