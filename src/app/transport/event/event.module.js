angular
    .module('itms.transport.event', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('transport.event', {
                url: '/event',
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