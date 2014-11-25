angular.module('itms.transport.event')
    .controller('EventMaintenanceCtrl', ['$scope', 'eolist', EventMaintenanceCtrl])
    .controller('EventMaintenance.MyWorkSpace', ['$scope', '$modal', 'eoService', 'common', MyWorkSpace])
    .controller('HandleEventCtrl', ['$scope', '$modalInstance', 'eoService', 'items', HandleEventCtrl]);

function EventMaintenanceCtrl($scope, eolist) {

    $scope.module = '运输执行';
    $scope.title = '运单事件';
    $scope.orders = getPartialEoList(eolist.data);

    activate();

    function activate() {
        runAllCharts();
    }

    //todo: move to help method
    function getPartialEoList(items) {
        if (items.errorMessage && items.errorMessage === 'NO_RESULT') {
            return [];
        }
        return items.map(mapper);

        function mapper(item) {
            return {
                eventStatus: item.dn.eventstatus,
                eoNumber: item.dn.eo + '/' + item.erItem.pk.erID + '/' + item.erItem.pk.erITN,
                ertrvendor: item.erHead.ertrvendor,
                depCustomer: item.erHead.depCustomer,
                recCustomer: item.erHead.recCustomer,
                depAreaCode: item.erHead.depAreaCode,
                recLocCode: item.erHead.recLocCode,
                arrtime1: item.dn.arrtime1,
                eo: item.dn.eo,
                erid: item.erItem.pk.erID,
                erITN: item.erItem.pk.erITN
            };
        }
    }
}

function MyWorkSpace($scope, $modal, eoService, common) {
    $scope.columns = [
        {
            "mData": "eventStatus",
            "sTitle": "事件"
        },
        {
            "mData": "eoNumber",
            "sTitle": "EO"
        },
        {
            "mData": "ertrvendor",
            "sTitle": "第三方"
        },
        {
            "mData": "depCustomer",
            "sTitle": "配送方"
        },
        {
            "mData": "depCustomer",
            "sTitle": "发货方"
        },
        {
            "mData": "recCustomer",
            "sTitle": "收货方"
        },
        {
            "mData": "depAreaCode",
            "sTitle": "发货地"
        },
        {
            "mData": "recLocCode",
            "sTitle": "目的地"
        },
        {
            "mData": "arrtime1",
            "sTitle": "计划到达时间"
        }
    ];

    $scope.selectedItems = [];

    $scope.disableAction = function () {
        return $scope.selectedItems.length === 0;
    };

    $scope.filterEvent = function (eventType) {
        eoService
            .queryByEventType(eventType)
            .success(function (data) {
                data = angular.isArray(data) ? data : [];
                $scope.orders = getPartialEoList(data);
            });
    };

    $scope.handleEvent = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/transport/event/handleEvent.tpl.html',
            controller: 'HandleEventCtrl',
            resolve: {
                items: function () {
                    return $scope.selectedItems;
                }
            }
        });
        modalInstance.result.then(function () {
            common.notifier.success("操作成功");
        });
    };

    function getPartialEoList(items) {
        if (items.errorMessage && item.errorMessage === 'NO_RESULT') {
            return [];
        }
        return items.map(mapper);

        function mapper(item) {
            return {
                eventStatus: item.dn.eventstatus,
                eoNumber: item.dn.eo + '/' + item.erItem.pk.erID + '/' + item.erItem.pk.erITN,
                ertrvendor: item.erHead.ertrvendor,
                depCustomer: item.erHead.depCustomer,
                recCustomer: item.erHead.recCustomer,
                depAreaCode: item.erHead.depAreaCode,
                recLocCode: item.erHead.recLocCode,
                arrtime1: item.dn.arrtime1,
                eo: item.dn.eo,
                erid: item.erItem.pk.erID,
                erITN: item.erItem.pk.erITN
            };
        }
    }
}

function HandleEventCtrl($scope, $modalInstance, eoService, items) {
    $scope.items = items;
    $scope.event = {
        eventType: '',
        eventCode: '',
        eventDate: moment().format("YYYY-MM-DD"),
        eventTime: moment().format("HH:mm:ss"),
        memo: ''
    };

    $scope.types = [
        {
            value: 'DELY',
            text: '延迟事件'
        },
        {
            value: 'NORM',
            text: '正常事件'
        },
        {
            value: 'UNRP',
            text: '未报告事件'
        },
        {
            value: 'UNXP',
            text: '未期事件'
        }
    ];

    $scope.getEventCode = function (eventType) {
        eoService.getEventCode(eventType)
            .success(function (data) {
                $scope.codes = _.map(data, function (item) {
                    return {
                        value: item.group2,
                        text: item.description
                    };
                });
            });
    };

    $scope.ok = function () {
        var dt = null;
        var inputDate = $scope.event.eventDate;
        var inputTime = $scope.event.eventTime;
        if (inputDate && inputTime) {
            var section = inputTime.substring(inputTime.length - 3, inputTime.length);
            section = $.trim(section);

            inputTime = inputTime.substring(0, inputTime.length - 3);
            var index = inputTime.indexOf(":");

            var hour = parseInt(inputTime.substring(0, index));
            if (section.toUpperCase() == "PM" && hour != 12)
                hour += 12;
            inputTime = hour + inputTime.substring(index);
            dt = inputDate + " " + inputTime;
            dt = moment(dt).format("YYYY-MM-DD hh:mm:ss");

        }

        eoService.createEvent({
            eventType: $scope.event.eventType,
            eventCode: $scope.event.eventCode,
            eventDateTime: dt,
            memo: $scope.event.memo,

            "eoID": 32, "erID": 1, "erITN": 2,

            EO: $scope.items.map(function (item) {
                return item.eo || item.eoID || item.EO || item.eoid;
            }),
            ERID: $scope.items.map(function (item) {
                return item.erid || item.erID;
            }),
            ERITN: $scope.items.map(function (item) {
                return item.eritn || item.erITN;
            })
        });
        $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
