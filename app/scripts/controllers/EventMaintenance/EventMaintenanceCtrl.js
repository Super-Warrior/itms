;
(function () {
    'use strict'
    angular.module('itmsApp').controller('EventMaintenanceCtrl',
        ['$scope', '$modal', '$log', 'common', 'eoService', 'eolist', EventMaintenanceCtrl]);

    function EventMaintenanceCtrl($scope, $modal, $log, common, eoService, eolist) {
        $scope.module = '运输执行';
        $scope.title = '事件管理';
        $scope.columns = [
            {"mData": "eventStatus", "sTitle": "事件"},
            {"mData": "eoNumber", "sTitle": "EO"},
            {"mData": "ertrvendor", "sTitle": "第三方"},
            {"mData": "depCustomer", "sTitle": "配送方"},
            {"mData": "depCustomer", "sTitle": "发货方"},
            {"mData": "recCustomer", "sTitle": "收货方"},
            {"mData": "depAreaCode", "sTitle": "发货地"},
            {"mData": "recLocCode", "sTitle": "目的地"},
            {"mData": "arrtime1", "sTitle": "计划到达时间"}
        ];
        $scope.orders = getPartialEoList(eolist.data);

        $scope.selectedItems = function () {
            return $scope.orders.filter(function (item) {
                return !!item.selected;
            });
        };

        $scope.filterEvent = function (eventType) {
            eoService.queryByEventType(eventType)
                .success(function (data) {
                    if (!angular.isArray(data)) {
                        data = [];
                    }
                    $scope.orders = getPartialEoList(data || []);
                });
        }

        $scope.handleEvent = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/transportation/handleEvent.html',
                controller: 'HandleEventCtrl',
                resolve: {
                    items: function () {
                        return $scope.selectedItems();
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                common.notifier.success("操作成功");
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function getPartialEoList(items) {
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

}());



