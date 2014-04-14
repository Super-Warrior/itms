angular
    .module('itms.transport.network', [
        'ui.router'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.user.transport.network', {
                url: '/network',
                data: {
                    displayName: '网络公司'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/transport/network/maintainNetwork.tpl.html',
                        controller: function () {

                        }
                    }
                }
            });
    }]);
