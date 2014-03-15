;
(function () {
    'use strict'
    angular.module('itmsApp').controller('EventMaintenanceCtrl',
        ['$scope', '$log', 'orderService', 'common', EventMaintenanceCtrl]);

    function EventMaintenanceCtrl($scope, $log, orderService, common) {
        $scope.module = '运输执行';
        $scope.title = '事件管理';
        $scope.columns = [
            {"mData": "event", "sTitle": "事件"},
            {"mData": "eoID", "sTitle": "EO"},
            {"mData": "ertrVendor", "sTitle": "第三方"},
            {"mData": "ertrVendor", "sTitle": "配送方"},
            {"mData": "ertrVendor", "sTitle": "发货方"},
            {"mData": "ertrVendor", "sTitle": "收货方"},
            {"mData": "ertrVendor", "sTitle": "发货地"},
            {"mData": "ertrVendor", "sTitle": "目的地"},
            {"mData": "ertrVendor", "sTitle": "计划到达时间"}
        ];

        $scope.orders = [];
    }

}());



