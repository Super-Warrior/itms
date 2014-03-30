angular.module("itms.requirement.upload").controller("requirementUploadCtrl",
    ["$scope", "$http", "config", "$compile", "$modal", "$log", "common", "cfpLoadingBar", controller]);

function controller($scope, $http, config, $compile, $modal, $log, common, cfpLoadingBar) {
    $scope.module = "需求管理";
    $scope.title = "站点上载";
    $scope.selectFile = function (element) {
        $("#fileDisplay").val($(element).val());
    };

    $scope.getExtName = function (name) {
        var index = name.lastIndexOf(".");
        if (index < 0)
            return "";
        var extName = name.substring(index + 1).toLowerCase();
        return extName;
    };
    $scope.columns = [
        /* { "mData": "", "sTitle": "detail" },*/
        { "mData": "erType", "sTitle": "类型" },
        { "mData": "id.customerOrder1", "sTitle": "客户订单号" },
        { "mData": "id.erITN", "sTitle": "ERITN" },
        { "mData": "matIID", "sTitle": "物料描述" },
        { "mData": "amt", "sTitle": "数量" },
        { "mData": "packNum", "sTitle": "箱号" },
        { "mData": "depAreaCode", "sTitle": "客户名称" },
        { "mData": "customerOrder2", "sTitle": "客户运单号" },
        { "mData": "customerOrder3", "sTitle": "客户出库号" },
        { "mData": "depCustomer", "sTitle": "收货地" },
        { "mData": "recLocCode", "sTitle": "目的地" },
        { "mData": "reqDelDate", "sTitle": "要求到达日期" }
    ];
    $scope.updateTable = function (data) {
        $scope.previewData = data;
        $scope.test = $scope.previewData.list;
    };
    $scope.validate = function () {
        var ele = $("#fileUpload")[0];
        if (!ele.files
            || !ele.files[0])
            return "请选择上传文件";
        var file = ele.files[0];

        if (file.size > 2000000)
            return "文件太大";
        var extName = $scope.getExtName(file.name);
        if (extName != "xls" && extName != "xlsx")
            return "文件类型错误";
        return null;
    };
    $scope.handleUpload = function () {
        var msg = $scope.validate();
        if (msg) {
            common.messageBox({
                title: "错误信息:",
                content: msg,
                cancel: "取消"
            });

        } else {
            // $('#checkout-form')[0].action = route.upload;
            $("#type").val($scope.getExtName($("#fileUpload")[0].files[0].name));
            var submitData = {
                type: 'post',
                dataType: "",
                url: config.baseUrl + "ER/Upload",
                success: function (data) {
                   cfpLoadingBar.complete();
                    $scope.updateTable(data);
                    if (data && data.key) {
                        common.notifier.success("上载内容已成功");
                        $scope.hasUploaded = true;
                        $scope.expandTable();
                    } else {
                       common.notifier.cancel(data);
                        $scope.hasUploaded = false;
                    }

                    $scope.$apply();
                },
                error: function(data) {
                   cfpLoadingBar.complete();
                   common.notifier.cancel(data);
                }
            };
           cfpLoadingBar.start();
            $('#checkout-form').ajaxSubmit(submitData);
        }
    };
    $scope.previewData = {
        "key": null,
        "list": []
    };
    $scope.test = [];
    $scope.confirm = function () {
        if (!$scope.hasUploaded)
            return;
        var data =
        {
            "userID": config.userID,
            "KEY": $scope.previewData.key
        };
        $http.post(config.baseUrl + "ER/UploadConfirm" + "?" + $.param(data))
            //$.post(config.baseUrl + "ER/UploadConfirm", data)
            .success(function (result) {
                if (result.errorMessage)
                    common.notifier.success("上载操作已成功完成");
                $scope.hasUploaded = false;
            });
    };
    $scope.cancel = function () {
        if (!$scope.hasUploaded)
            return;
        var data = {
            "userID": config.userID,
            "KEY": $scope.previewData.key
        };
        $http.post(config.baseUrl + "ER/UploadCancel" + "?" + $.param(data))
            //$.post(config.baseUrl + "ER/UploadCancel", data)
            .success(function (result) {
                if (result.errorMessage && result.errorMessage == "OK")
                    common.notifier.success("上载内容已取消");
                $scope.updateTable({
                    "key": null,
                    "list": []
                });
                $scope.hasUploaded = false;
            }
        );
    };
    $scope.hasUploaded = false;
    $scope.expandTable = function () {
        var icon = $("#widgetPreview");
        if (icon.hasClass("jarviswidget-collapsed"))
            icon.find(".jarviswidget-toggle-btn").click();
    };

}