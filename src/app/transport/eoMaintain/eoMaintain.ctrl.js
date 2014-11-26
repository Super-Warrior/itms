angular.module('itms.transport.eoMaintain')
    .controller('EOMaintainCtrl', ['$scope', "$http", "config", "common", '$modal', '$log', 'eoMaintainService','exportService', EOMaintainSearchCtrl]);

function EOMaintainSearchCtrl($scope, $http, config, common, $modal, $log, eoMaintainService, configService,exportService) {
    $scope.module = "运输执行";
    $scope.title = "运单维护/查询";
    $scope.queryOption = {
        SerType: 'AND',
        EO: [''],
        EOStatus: [''],
        eventstatus: [''],
        EOType: [''],
        EOTRType: [''],
        EOTag: [''],
        EOTRVendor1: '',
        EOTRVendor2: '',
        EOTRVendor3: '',
        customerOrder1: '',
        customerOrder2: '',
        customerOrder3: '',
        VendorOrder1: '',
        VendorOrder2: '',
        VendorOrder3: '',
        reqDelDate1: '',
        reqDelDate2: '',
        reqDelDate3: '',
        reqDelDate4: '',
        ScheduleVendor1: '',
        ScheduleClass1: '',
        DepDate1: '',
        ArrDate1: '',
        DepTime1: '',
        Arrtime1: '',
        DeliverBP1: '',
        DeliverBP2: '',
        depCustomer: '',
        depLocCode: '',
        ERTag: '',
        MesUnit1: '',
        reqDelDate: '',
        dep_Country: '',
        dep_State: '',
        dep_City: '',
        dep_Disc: '',
        dep_Group1: '',
        dep_Group2: '',
        rec_Country: '',
        rec_State: '',
        rec_City: '',
        rec_Disc: '',
        rec_Group1: '',
        rec_Group2: ''
    };
    $scope.results = [];
    $scope.detailConfig = {
        erDetail: true,
        timeLine: true,
        eoDetail: true
    };
    $scope.columns = [{
        "mData": "eo",
        "sTitle": "EO"
    }, {
        "mData": "erID",
        "sTitle": "ER"
    }, {
        "mData": "erITN",
        "sTitle": "ERITN"
    }, {
        "mData": "eoStatus",
        "sTitle": "运单状态"
    }, {
        "mData": "customerOrder",
        "sTitle": "客户订单号"
    }, {
        "mData": "eoType",
        "sTitle": "类型"
    }, {
        "mData": "eventstatus",
        "sTitle": "事件状态"
    }, {
        "mData": "routeClassID",
        "sTitle": "路单号"
    }, {
        "mData": "tranResLicense",
        "sTitle": "车牌"
    }, {
        "mData": "transDriverID",
        "sTitle": "司机"
    }, {
        "mData": "resAmt1",
        "sTitle": "包装数量"
    }, {
        "mData": "matIIDDesc",
        "sTitle": "物料名称"
    }, {
        "mData": "eoTag",
        "sTitle": "特殊"
    }, {
        "mData": "depCustomer",
        "sTitle": "发货方"
    }, {
        "mData": "recCustomer",
        "sTitle": "收货方"
    }, {
        "mData": "reDelDate",
        "sTitle": "发达日期"
    }, {
        "mData": "eoTrtype",
        "sTitle": "方式"
    }, {
        "mData": "eoTrvendor",
        "sTitle": "承运方"
    }, {
        "mData": "vendorOrder",
        "sTitle": "承运方单号"
    }];
    $scope.selectedItems = [];

    var configData = {
        "ERTP": null,
        "EOST": null,
        "EVST": null,
        "TRPY": null,
        "ERTG": null
    };

    var leftQty = function() {
        this.realQty = "";
        this.leftQty = "";
    }

    $scope.leftQty = new leftQty();

    $scope.mutiOptionDataSource = {};
    configService.getConfigs(configData).then(
        function() {
            $.extend($scope.mutiOptionDataSource, configData);
        }
    );
    $scope.eoMaintainSearch = function() {
        var data = $scope.queryOption;
        $scope.selectedItems = [];
        eoMaintainService.quickSearch(data)
            .success(function(res) {
                if (!res || res.errorMessage)
                    $scope.results = [];
                else
                    $scope.results = eoMaintainService.getResultPartial(res);

                if( $scope.results.length)
                {
                    var icon = $("#wid-result");
                    if (icon.hasClass("jarviswidget-collapsed"))
                        icon.find(".jarviswidget-toggle-btn").click();
                }
            })
            .error(function() {
                $log.error('EOMaintainSearchCtrl: quickSearch');
            });

    };
    $scope.handleEvent = function() {
        var modalInstance = $modal.open({
            templateUrl: 'app/transport/event/handleEvent.tpl.html',
            controller: 'HandleEventCtrl',
            resolve: {
                items: function() {
                    return $scope.selectedItems;
                }
            }
        });
        modalInstance.result.then(function() {
            common.notifier.success("操作成功");
        });
    };

    $scope.isAnythingSelected = function () {
        return ($scope.selectedItems.length > 0);
    };

    /* Added by T.C. 2014/11/26 */
    $scope.isOnlyOneSelected = function () {
        return ($scope.selectedItems.length == 1);
    };

    /* Added by T.C. 2014/11/26 */
    $scope.leftQtyEvent = function() {
        $scope.modalInstance = $modal.open({
            templateUrl: "app/transport/eoMaintain/eoMaintainLeftQuantity.tpl.html",
            scope: $scope
        });
        /*
        modalInstance.result.then(function() {
            common.notifier.success("操作成功");
        });
        */
    };

    /* Added by T.C. 2014/11/26 */
    $scope.confirmLeftQtyEvent = function() {
        common.messageBox({
            title: "提示信息:",
            content: "是否更新剩余数量?"
        }).success($scope.doConfirmLeftQtyEvent)
            .error(function () {
                common.notifier.cancel("已取消...");
            });
    };

    /* Added by T.C. 2014/11/26 */
    $scope.doConfirmLeftQtyEvent = function() {
        $http.post(config.baseUrl + "ER/ItemLeftQtyCreate" + "?" + $.param({
            "ERID": $scope.selectedItems.map(function (i) {
                return i.erID;
            }),
            "ERITN": $scope.selectedItems.map(function (i) {
                return i.erITN;
            }),
            "ActQty[]": $scope.leftQty.realQty,
            "LeftQty[]": $scope.leftQty.leftQty,
            "userID" : config.userID
        })).then(
            function (result) {
                $scope.modalInstance.dismiss();
                if (!result.errorMessage || result.errorMessage === "OK") {
                    common.notifier.success("操作成功...");
                }
            }).then(function () {
                $scope.eoMaintainSearch();
            });
    };


    $scope.searchAssignableRequest = function () {
        eoMaintainService.queryER().success(function (data) {
            var icon = $("#wid-result");
            $scope.orders = orderService.getRequirementPartial(data);
            if (icon.hasClass("jarviswidget-collapsed"))
                icon.find(".jarviswidget-toggle-btn").click();
        });
    };

    $scope.export = function () {
        exportService.export($scope.columns,$scope.results)

    };

}
