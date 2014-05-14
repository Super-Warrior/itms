angular.module('itms.transport.eoMaintain')
    .controller('EOMaintainCtrl', ['$scope', '$state', '$log', 'eoMaintainService', EOMaintainSearchCtrl]);

function EOMaintainSearchCtrl($scope, $state, $log, eoMaintainService, configService) {
    $scope.module = "运输执行";
    $scope.title = "运单维护/查询";
    $scope.queryOption = {
        SerType: 'ALL',
        EO: [''],
        EOStatus: ['S001'],
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
        depLocCode: ''
    };
    $scope.results = [];
    $scope.detailConfig = { erDetail: true, timeLine: true, eoDetail: true };
    $scope.columns = [
        { "mData": "eo", "sTitle": "EO" },
        { "mData": "erID", "sTitle": "ER" },
        { "mData": "erITN", "sTitle": "ERITN" },
        { "mData": "eoStatus", "sTitle": "运单状态" },
        { "mData": "customerOrder", "sTitle": "客户订单号" },
        { "mData": "eoType", "sTitle": "类型" },
        { "mData": "eoTag", "sTitle": "特殊" },
        { "mData": "depCustomer", "sTitle": "发货方" },
        { "mData": "recCustomer", "sTitle": "收货方" },
        { "mData": "reDelDate", "sTitle": "发达日期" },
        { "mData": "eoTrtype", "sTitle": "方式" },
        { "mData": "eoTrvendor", "sTitle": "承运方" },
        { "mData": "vendorOrder", "sTitle": "承运方单号" }
    ];

    var configData = {
        "ERTP": null,
        "EOST": null,
        "EVST": null,
        "TRPY": null,
        "ERTG": null
    };
    $scope.mutiOptionDataSource = {};
    configService.getConfigs(configData).then(
        function () {
            $.extend($scope.mutiOptionDataSource, configData);
        }
    );
    $scope.eoMaintainSearch = function () {
        var data = $scope.queryOption;
        $scope.selectedItems = [];
        eoMaintainService.quickSearch(data)
            .success(function (res) {
                $scope.results = eoMaintainService.getResultPartial(res);
            })
            .error(function () {
                $log.error('EOMaintainSearchCtrl: quickSearch');
            });

    };

}





