angular
    .module('itms.transport.network', [
        'ui.router'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('transport.network', {
                url: '/network',
                data: {
                    displayName: '网络公司'
                },
                views: {
                    'container@': {
                        templateUrl: 'app/transport/network/network.tpl.html',
                        controller: function () {

                        }
                    }
                }
            });
    }]);
