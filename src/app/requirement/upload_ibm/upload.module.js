angular
    .module('itms.requirement.uploadibm', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.user.requirement.uploadibm', {
                url: '/upload',
                data: {
                    displayName: '需求上载'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/requirement/upload_ibm/requirementUpload.tpl.html',
                        controller: 'requirementUploadIbmCtrl'

                    }
                }
            });
    }]);
