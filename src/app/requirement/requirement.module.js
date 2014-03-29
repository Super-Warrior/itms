angular
    .module('itms.requirement', [
        'itms.requirement.upload'
    ])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('requirement', {
                    abstract: true,
                    url: '/requirement'
                });

        }]);