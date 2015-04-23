angular
    .module('itms.transport', [
        'itms.transport.event',
        'itms.transport.eoMaintain',
        'itms.transport.myElectricOrder',
        'itms.transport.eoMaintainibm',
        'itms.transport.eoMaintainMap'
    ])
    .config(['$stateProvider',
        function ($stateProvider) {
           $stateProvider
               .state('app.user.transport', {
                  "abstract": true,
                  url: '/transport',
                  data: {
                     displayName: '运输执行'
                  }
               });

        }
    ]);
