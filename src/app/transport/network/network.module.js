angular
    .module('itms.transport.network', [
        'ui.router'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.transport.network', {
                url: '/network',
                data: {
                    displayName: '网络公司'
                },
                views: {
                    'container@': {
                        templateUrl: 'app/transport/network/maintainNetwork.tpl.html',
                        controller: function () {

                        }
                    }
                }
            });
    }]);
