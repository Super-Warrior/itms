angular
  .module('itms.requirement.upload', [
    'ui.router',
    'ui.bootstrap'
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('app.user.requirement.upload', {
        url: '/upload',
        data: {
          displayName: '需求上载'
        },
        views: {
          '@app.user': {
            templateUrl: 'app/requirement/upload/requirementUpload.tpl.html',
            controller: 'requirementUploadCtrl'

          }
        }
      });
  }]);
