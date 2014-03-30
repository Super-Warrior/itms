angular
    .module('itms.requirement.upload', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('requirement.upload', {
                url: '/upload',
                views: {
                    'container@': {
                        templateUrl: 'app/requirement/upload/requirementUpload.tpl.html',
                        controller: 'requirementUploadCtrl'

                    }
                }
            });
    }]);