angular
    .module('itms.transport.event', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.transport.event', {
                url: '/event',
                data: {
                    displayName: '事件管理'
                },
                views: {
                    'container@': {
                        templateUrl: 'app/transport/event/event.tpl.html',
                        controller: 'EventMaintenanceCtrl'
                    }
                },
                resolve: {
                    eolist: ['eoService',
                        function( eoService){
                            return eoService.queryAll();
                        }]
                }
            });
    }]);
