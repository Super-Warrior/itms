angular
    .module('itms.transport.myElectricOrder', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.user.transport.myElectricOrder', {
                url: '/myElectricOrder',
                data: {
                    displayName: '运单查询/我的运单'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/transport/myElectricOrder/myElectric.tpl.html',
                        controller: 'MyElectricOrderCtrl'
                    }
                }
            });
    }]);
