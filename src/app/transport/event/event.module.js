angular
    .module('itms.transport.event', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.user.transport.event', {
                url: '/event',
                data: {
                    displayName: '运单事件'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/transport/event/event.tpl.html',
                        controller: 'EventMaintenanceCtrl'
                    }
                },
                resolve: {
                    eolist: ['eoService',
                        function(eoService){
                            return eoService.queryAll();
                        }]
                }
            })
            .state('app.user.transport.eventSearch', {
                url: '/eventSearch',
                data: {
                    displayName: '事件查询'
                },
                views: {
                    '@app.user': {
                        templateUrl: 'app/transport/event/eventSearch.tpl.html',
                        controller: 'EventSearchCtrl'
                    }
                }
            })
            .state('app.user.transport.eventSearch.search', {
                abstract: true
            })
            .state('app.user.transport.eventSearch.search.searchByEvent', {
                views: {
                    'search@app.user.transport.eventSearch': {
                        templateUrl: 'app/transport/event/eventquicksearch.tpl.html'
                    }
                }
            })
            .state('app.user.transport.eventSearch.search.searchByEr', {
                views: {
                    'search@app.user.transport.eventSearch': {
                        templateUrl: 'app/transport/event/ereventsearch.tpl.html'
                    }
                }
            })
            .state('app.user.transport.eventSearch.search.searchByEo', {
                views: {
                    'search@app.user.transport.eventSearch': {
                        templateUrl: 'app/transport/event/eoeventsearch.tpl.html'
                    }
                }
            });
    }]);
