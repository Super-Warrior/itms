angular
    .module('itms.requirement.uploadibm', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.user.requirement.uploadibm', {
                url: '/upload2',
                data: {
                    displayName: '需求上载 (for ibm)'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/requirement/upload_ibm/requirementUpload2.tpl.html',
                        controller: 'requirementUploadIbmCtrl'

                    }
                }
            });
    }]);
