angular.module('itms.planning.adjustment')
    .controller('EOAssignAdjustCtrl', ['$scope', '$modal', '$log', 'orderService', 'common', '$http', EOAssignAdjustCtrl]);

function EOAssignAdjustCtrl($scope, $modal, $log, orderService, common, $http) {
    var notifier = common.notifier;

    $scope.module = '计划';
    $scope.title = '分配调整';

    $scope.orders = [];

    $scope.selectedItems = [];
    $scope.selectedSite = [];
    $scope.selectedPosition = { "dep": [], "rec": [] };
    $scope.selectedCustomer = { "dep": [], "rec": [] };

    $scope.reset = function () {
        $scope.selectedCustomer = { "dep": [], "rec": [] };
        $scope.selectedSite = [];
        $scope.selectedPosition = { "dep": [], "rec": [] };
        $scope.createDate = "";
        $scope.user = "";
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

    $scope.searchAssignableRequest = function () {
        orderService.queryAll().success(function (data) {
            var icon = $("#wid-result");
            $scope.orders = orderService.getRequirementPartial(data);
            if (icon.hasClass("jarviswidget-collapsed"))
                icon.find(".jarviswidget-toggle-btn").click();
        });
    };


    $scope.reallocate = function () {
        var reallocate = function (value) {
            orderService
                .erAssignChange({
                    selectedItems: $scope.selectedItems,
                    eoid: value
                })
                .success(function () {
                    notifier.success("已成功分配至订单" + value);
                    $scope.searchAssignableRequest();
                });
        };

        var cancel = function () {
            notifier.cancel("操作取消...");
        };

        if ($scope.selectedItems.length > 0) {
            common
                .messageBox({
                    title: "分配至其它运单",
                    content: "请输入运单号",
                    input: "text",
                    placeholder: "EO运单编号"
                })
                .success(reallocate)
                .error(cancel);


        }
    };

    $scope.cancelAssignment = function () {
        var doCancelAssignment = function () {
            orderService
                .erDeleteAssignment({
                    selectedItems: $scope.selectedItems
                })
                .success(function () {
                    notifier.success("已成功取消运单分配...");
                    $scope.searchAssignableRequest();
                });
        }
        if ($scope.selectedItems.length > 0) {
            common.messageBox({
                title: "提示信息!",
                content: "是否取消所选择记录的运单分配?"
            })
                .success(doCancelAssignment)
                .error(function () {
                    notifier.cancel();
                });
        }
    };


    $scope.deleteEr = function () {
        if ($scope.disableAction()) return;
        common.messageBox({
            title: "提示信息:",
            content: "是否删除所选择ER需求?"
        }).success($scope.doDeleteEr)
            .error(function () {
                common.notifier.cancel("已取消...");
            });
    };

    $scope.doDeleteEr = function () {
        $http.post(config.baseUrl + "ER/ERDel" + "?" + $.param({
            "ERID": $scope.selectedItems.map(function (i) {
                return i.erID;
            })
        })).then(
            function (result) {
                if (!result.errorMessage || result.errorMessage === "OK") {
                    common.notifier.success("删除操作成功...");
                }
            }).then(function () {
                $scope.searchAssignableRequest();
            });
    };

    $scope.disableAction = function () {
        return $scope.selectedItems.length === 0;
    };

    $scope.columns = [
        { "mData": "eoID", "sTitle": "EO" },
        { "mData": "erID", "sTitle": "ER" },
        { "mData": "erITN", "sTitle": "ERITN" },
        { "mData": "erTypeDesc", "sTitle": "类型" },
        { "mData": "erTag", "sTitle": "特殊" },
        { "mData": "depCustomerDesc", "sTitle": "发货方" },
        { "mData": "recCustomerDesc", "sTitle": "收货方" },
        { "mData": "customerOrder1", "sTitle": "客户订单号" },
        { "mData": "customerOrder2", "sTitle": "客户运单号" },
        { "mData": "customerOrder3", "sTitle": "客户出库号" },
        { "mData": "matIID", "sTitle": "物料" },
        { "mData": "packNum", "sTitle": "箱号" },
        { "mData": "amt", "sTitle": "件数" },
        { "mData": "resAmt1", "sTitle": "包装数量" },
        { "mData": "reqDelDate", "sTitle": "送达日期" },
        { "mData": "ertrTypeDesc", "sTitle": "方式" },
        { "mData": "eritnstatusDesc", "sTitle": "状态" },
        { "mData": "ertrVendorDesc", "sTitle": "第三方" }
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


    $scope.searchSite = function () {
        var modalInstance = $modal.open({
            templateUrl: "app/planning/searchSite.tpl.html",
            controller: searchSiteCtrl
        });
        modalInstance.result.then(function (keys) {
            $scope.selectedSite = keys;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchCustomer = function (type) {
        var modalInstance = $modal.open({
            templateUrl: "app/planning/searchCustomer.tpl.html",
            controller: searchCustomerCtrl,
            resolve: {
                type: function () {
                    return type;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selectedCustomer[type] = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchLocation = function () {
        var modalInstance = $modal.open({
            templateUrl: "",
            controller: searchLocationCtrl,
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

    $scope.detailConfig = { erDetail: true, timeLine: true, eoDetail: true };

}
