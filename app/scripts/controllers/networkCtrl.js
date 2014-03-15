'use strict'

angular.module('itmsApp').controller('networkCtrl', function ($scope, orderlist) {


    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();

    // PAGE RELATED SCRIPTS
    //by default, the selected order is the first order in the order list
    $scope.orderlist = orderlist;
    $scope.selectedOrder = $scope.orderlist[0];


    $scope.showDetail = function (order) {
        $scope.selectedOrder = order;
        var $detailPanel = $('#wid-id-2s');
        var $toggleButton = $detailPanel.find('.jarviswidget-toggle-btn');
        if ($detailPanel.hasClass('jarviswidget-collapsed')) {
            $toggleButton.trigger('click');
        }
    };


});

angular.module('itmsApp').controller('eomaintainCtrl', function ($scope, orderService) {

});

angular.module('itmsApp').controller('eomaintain3rdCtrl', function ($scope, orderService) {

    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();
});

angular.module('itmsApp').controller('eventmanagementCtrl', function ($scope, orderService) {

    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();
});

angular.module('itmsApp').controller('dashboardCtrl', function ($scope) {

});

angular.module('itmsApp').controller('eoAssignCtrl', function ($scope, $modal, $log, orderService) {

    $scope.module = '计划';
    $scope.title = '需求分配';

    $scope.searchAssignableRequest = function () {
        orderService.queryAll().success(function (data) {
            $scope.orders = data;
        });
    };

    $scope.selectedItems = function () {
        return $scope.orders.filter(function (item) {
            return !!item.selected;
        });
    };

    $scope.columns = [
        {"mData": "number", "sTitle": "ER"},
        {"mData": "er", "sTitle": "ERITN"},
        {"mData": "type", "sTitle": "类型"},
        {"mData": "special", "sTitle": "特殊"},
        {"mData": "delivery", "sTitle": "发货方"},
        {"mData": "receiver", "sTitle": "收货方"},
        {"mData": "provice", "sTitle": "省"},
        {"mData": "city", "sTitle": "市"},
        {"mData": "distact", "sTitle": "区县"},
        {"mData": "deliveryDate", "sTitle": "送达日期"},
        {"mData": "deliveryMethod", "sTitle": "方式"},
        {"mData": "thirdParty", "sTitle": "第三方"}
    ];

    $scope.searchCriteria = {
        site: '',
        senderCode: 'AB00011',
        receiverCode: 'AB00012',
        senderLocation: 'AB00013',
        receiverLocation: 'AB00014',
        reset: function () {
            this.site = '';
            this.senderCode = '';
            this.receiverCode = '';
            this.senderLocation = '';
            this.receiverLocation = '';
        }
    };

    $scope.orders = [];

    $scope.mergeERRequest = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/mergeERRequest.html',
            controller: MergeERRequestCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.adjustDeliveryMethod = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/adjustDeliveryMethod.html',
            controller: AdjustDeliveryMethodCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.orders = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchSite = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchSite.html',
            controller: SearchSiteCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchCustomer = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchCustomer.html',
            controller: SearchCustomerCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchLocation = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchCustomer.html',
            controller: SearchLocationCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});



