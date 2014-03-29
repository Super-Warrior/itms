angular
    .module('itms.dashboard', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    //template: '<div>this is transportation state</div><div ui-view></div>',
                    controller: ['$scope', '$state', 'contacts', 'utils',
                        function ($scope, $state, contacts, utils) {

                        }]
                });

        }]);