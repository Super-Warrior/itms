angular.module('itms.requirement.create',[
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider
            .state('requirement.create',{
                url: '/create',
                views: {
                    'container@': {
                        templateUrl: 'app/requirement/create/lotusNewER.html',
                        controller: function($scope){
                        }
                    }
                }
            })
    }]);