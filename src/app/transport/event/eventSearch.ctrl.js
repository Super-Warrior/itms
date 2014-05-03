angular.module('itms.transport.event')
    .controller('EventSearchCtrl', ['$scope', '$state', '$log', 'eventService', EventSearchCtrl])
    .controller('EventSearchCtrl.MyWorkSpace', ['$scope', '$modal', 'eventService', 'common', EventWorkSpaceCtrl]);

function EventSearchCtrl($scope, $state, $log, eventService) {

    $scope.module = '运输执行';
    $scope.title = '事件查询';
    $scope.events = [];
    $scope.eventSearchCriteria = {

    };

    $scope.searchByEvent = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEvent');
    };
    $scope.searchByEo = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEo');
    };
    $scope.searchByEr = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEr');
    };

    $scope.eventSearch = function () {
        eventService.queryByEvent($scope.eventSearchCriteria)
            .success(function (data) {
                $scope.events = eventService.getEventPartial(data);
            })
            .error(function () {
                $log.error('EventSearchCtrl: eventSearch');
            });
    };

    $scope.erSearch = function () {
        eventService.queryByEr($scope.eventSearchCriteria)
            .success(function (data) {
                $scope.events = eventService.getEventPartial(data);
            })
            .error(function () {
                $log.error('EventSearchCtrl: queryByEr');
            });
    };

    $scope.eoSearch = function () {
        eventService.queryByEo($scope.eventSearchCriteria)
            .success(function (data) {
                $scope.events = eventService.getEventPartial(data);
            })
            .error(function () {
                $log.error('EventSearchCtrl: queryByEr');
            });
    };
}

function EventWorkSpaceCtrl($scope, $modal, eventService, common) {
    $scope.columns = [{
        "mData": "eventType",
        "sTitle": "事件类型"
    }, {
        "mData": "eventCode",
        "sTitle": "事件代码"
    }, {
        "mData": "eventDateTime",
        "sTitle": "发生时间"
    }, {
        "mData": "createUser",
        "sTitle": "执行帐号"
    }, {
        "mData": "eoNumber",
        "sTitle": "EO/ER/ERITN"
    }];

    $scope.selectedItems = [];
}