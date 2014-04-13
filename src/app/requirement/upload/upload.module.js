angular
    .module('itms.requirement.upload', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.requirement.upload', {
                url: '/upload',
                data: {
                    displayName: '需求上载'
                },
                views: {
                    'container@': {
                        templateUrl: 'app/requirement/upload/requirementUpload.tpl.html',
                        controller: 'requirementUploadCtrl'

                    }
                }
            });
    }]);
