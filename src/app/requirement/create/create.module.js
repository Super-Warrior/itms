angular.module('itms.requirement.create',[
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider
            .state('app.user.requirement.create',{
                url: '/create',
                data: {
                    displayName: '新建需求'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/requirement/create/lotusNewER.html',
                        controller: function($scope){
                        }
                    }
                }
            })
    }]);
