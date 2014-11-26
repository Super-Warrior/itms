angular.module('itms.transport.event')
    .controller('EventSearchCtrl', ['$scope', '$state', '$log', 'eventService', EventSearchCtrl])
    .controller('EventSearchCtrl.MyWorkSpace', ['$scope', '$modal', 'common', EventWorkSpaceCtrl]);

function EventSearchCtrl($scope, $state, $log, eventService) {

    $scope.module = '运输执行';
    $scope.title = '事件查询';
    $scope.events = [];
    $scope.totalEvents = [];
    $scope.eventSearchCriteria = {
        quickSearch: {},
        erSearch: {},
        eoSearch: {}
    };

    activate();

    function activate() {
        eventService.getAllConfigData().then(function (result) {
            $scope.configData = result;
        });

    }

    $scope.searchByEvent = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEvent');
    };
    $scope.searchByEo = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEo');
    };
    $scope.searchByEr = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEr');
    };

    $scope.eventSearch = function (queryOptions) {
        eventService.queryByEvent(queryOptions)
            .success(function (data) {
                $scope.events = data ? eventService.getEventPartial(data) : [];
                $scope.totalEvents = $scope.events;
            })
            .error(function () {
                $log.error('EventSearchCtrl: eventSearch');
            });
    };

    $scope.erSearch = function (queryOptions) {
        eventService.queryByEr(queryOptions)
            .success(function (data) {
                $scope.events = data ? eventService.getEventPartial(data) : [];
                $scope.totalEvents = $scope.events;
            })
            .error(function () {
                $log.error('EventSearchCtrl: queryByEr');
            });
    };

    $scope.eoSearch = function (queryOptions) {
        eventService.queryByEo(queryOptions)
            .success(function (data) {
                $scope.events = data ? eventService.getEventPartial(data) : [];
                $scope.totalEvents = $scope.events;
            })
            .error(function () {
                $log.error('EventSearchCtrl: queryByEr');
            });
    };
}

function EventWorkSpaceCtrl($scope, $modal, common) {

    $scope.selectedItems = [];
    $scope.columns = [
        {
            "mData": "eventType",
            "sTitle": "事件类型"
        },
        {
            "mData": "eventCode",
            "sTitle": "事件代码"
        },
        {
            "mData": "eventDesc",
            "sTitle": "事件代码描述"
        },
        {
            "mData": "eventDateTime",
            "sTitle": "发生时间"
        },
        {
            "mData": "createUser",
            "sTitle": "执行帐号"
        },
        {
            "mData": "eoNumber",
            "sTitle": "EO/ER/ERITN"
        }
    ];

    $scope.detailConfig = {
        erDetail: true,
        timeLine: true,
        eoDetail: true
    };

    $scope.handleEvent = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/transport/event/handleEvent.tpl.html',
            controller: 'HandleEventCtrl',
            resolve: {
                items: function () {
                    return $scope.selectedItems.map(function (item) {
                        return {
                            eo: item.eoid,
                            erid: item.erid,
                            erITN: item.eritn
                        };
                    });
                }
            }
        });
        modalInstance.result.then(function () {
            common.notifier.success("操作成功");
        });
    };

    $scope.export = function () {
           
            var dataobj = $scope.totalEvents.map(function(event) {
                return {
                  'eventType': event['eventType'],
                  'eventCode': event['eventCode'],
                  'eventDesc': event['eventDesc'],
                  'eventDateTime': event['eventDateTime'],
                  'createUser': event['createUser'],
                  'eoNumber': event['eoNumber'],
                };
            });
            $("#btnExport").battatech_excelexport({
                containerid: "btnExport"
                , datatype: 'json'
                , dataset: dataobj
                , columns: [
                    { headertext: "事件类型", datatype: "string", datafield: "eventType", ishidden: false }
                    , { headertext: "事件代码", datatype: "string", datafield: "eventCode", width: "100px" }
                    , { headertext: "事件描述", datatype: "string", datafield: "eventDesc", ishidden: false, width: "100px" }
                    , { headertext: "发生时间", datatype: "string", datafield: "eventDateTime", ishidden: false }
                    , { headertext: "执行账号", datatype: "string",  datafield: "createUser", ishidden: false, width: "150px" }
                    , { headertext: "EO/ER/ERITN", datatype: "string",  datafield: "eoNumber", ishidden: false, width: "150px" }
                ]
            });

    };

    $scope.getHeader = function() {
      return $scope.columns.map(function(header) {
        return header.sTitle;
      });
    };

    $scope.disableAction = function () {
        return $scope.selectedItems.length === 0;
    };

    $scope.filterEvent = function (eventType) {
        if (eventType) {
            $scope.events = $scope.totalEvents.filter(function (item) {
                return item.eventType == eventType
            });
        } else {
            $scope.events = $scope.totalEvents;
        }
    };


}