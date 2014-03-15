;(function(){
    'use strict'
    angular.module('itmsApp').controller('EOAssignAdjustCtrl',
        ['$scope', '$modal', '$log', 'orderService', 'common',EOAssignAdjustCtrl]);

    function EOAssignAdjustCtrl ($scope, $modal, $log, orderService, common) {

        var notifier = common.notifier;

        $scope.module = '计划';
        $scope.title = '分配调整';

        $scope.searchAssignableRequest = function () {
            orderService.queryAll().success(function (data) {
                $scope.orders = orderService.getRequirementPartial(data);
            });
        };

        $scope.selectedItems = function () {
            return $scope.orders.filter(function (item) {
                return !!item.selected;
            });
        };

        $scope.reallocate = function () {
            common.messageBox({
                title: "分配至其它运单",
                content: "请输入运单号",
                input: "text",
                placeholder: "EO运单编号"
            })
                .success(reallocate)
                .error(cancel);

            function reallocate(value) {
                orderService
                    .erAssignChange({
                        selectedItems: $scope.selectedItems(),
                        eoid: value
                    })
                    .success(function () {
                        notifier.success("已成功分配至订单" + value);
                        $scope.searchAssignableRequest();
                    });
            }

            function cancel() {
                notifier.cancel("操作取消...");
            }

        };

        $scope.cancelAssignment = function () {
            common.messageBox({
                title: "提示信息!",
                content: "是否取消所选择记录的运单分配?"
            })
                .success(cancelAssignment)
                .error(function () {
                    notifier.cancel();
                });

            function cancelAssignment() {
                orderService
                    .erDeleteAssignment({
                        selectedItems: $scope.selectedItems()
                    })
                    .success(function () {
                        notifier.success("已成功取消运单分配...");
                        $scope.searchAssignableRequest();
                    });
            }
        };

        $scope.disableAction = function () {
            return $scope.selectedItems().length === 0;
        };

        $scope.columns = [
            {"mData": "eoID", "sTitle": "EO"},
            {"mData": "erID", "sTitle": "ER"},
            {"mData": "erITN", "sTitle": "ERITN"},
            {"mData": "erType", "sTitle": "类型"},
            {"mData": "erTag", "sTitle": "特殊"},
            {"mData": "depCustomer", "sTitle": "发货方"},
            {"mData": "recCustomer", "sTitle": "收货方"},
            {"mData": "customerOrder1", "sTitle": "客户订单号"},
            {"mData": "customerOrder2", "sTitle": "客户运单号"},
            {"mData": "customerOrder3", "sTitle": "客户出库号"},
            {"mData": "matIID", "sTitle": "物料"},
            {"mData": "packNum", "sTitle": "箱号"},
            {"mData": "amt", "sTitle": "件数"},
            {"mData": "reqDelDate", "sTitle": "送达日期"},
            {"mData": "ertrType", "sTitle": "方式"},
            {"mData": "ertrVendor", "sTitle": "第三方"}
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

        $scope.searchSite = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/planning/searchSite2.html',
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

        $scope.searchDepCustomer = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/planning/searchCustomer2.html',
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

        $scope.searchRecCustomer = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/planning/searchCustomer2.html',
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

    }

    var MergeERRequestCtrl = function ($scope, $modalInstance, items) {
        $scope.items = items;
        $scope.ok = function () {
            $modalInstance.close($scope.items);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    var AdjustDeliveryMethodCtrl = function ($scope, $modalInstance, items) {
        $scope.items = items;
        $scope.adjust = {
            deliveryMethod: '',
            vendor: ''
        }
        $scope.ok = function () {
            $scope.items.forEach(function (element) {
                if (!!element.selected) {
                    element.deliveryMethod = $scope.adjust.deliveryMethod;
                    element.thirdParty = $scope.adjust.vendor;
                }
            });
            $modalInstance.close($scope.items);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };


}());



