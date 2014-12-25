angular.module("itms.requirement.upload").controller("requirementUploadCtrl",
    ["$scope", "$http", "config", "common", "cfpLoadingBar", "uploadSvc", 'Base64', 'identity', controller]);

function controller($scope, $http, config, common, cfpLoadingBar, uploadSvc, Base64, identity) {
   var fileHelper = common.fileHelper;

   $scope.module = "需求管理";
   $scope.title = "站点上载";
   $scope.columns = [
       /* { "mData": "", "sTitle": "detail" },*/
       { "mData": "erType", "sTitle": "类型" },
       { "mData": "id.customerOrder1", "sTitle": "客户订单号", "sWidth": 150 },
       { "mData": "id.erITN", "sTitle": "ERITN", "sWidth": 100 },
       { "mData": "matIID", "sTitle": "物料描述", "sWidth": 100 },
       { "mData": "amt", "sTitle": "数量" },
       { "mData": "packNum", "sTitle": "箱号" },
       { "mData": "depAreaCode", "sTitle": "客户名称", "sWidth": 100 },
       { "mData": "customerOrder2", "sTitle": "海通运单号", "sWidth": 120 },
       { "mData": "customerOrder3", "sTitle": "海通委托单号", "sWidth": 150 },
       { "mData": "depCustomer", "sTitle": "收货地", "sWidth": 100 },
       { "mData": "recLocCode", "sTitle": "目的地", "sWidth": 100 },
       { "mData": "reqDelDate", "sTitle": "要求到达日期", "sWidth": 150 }
   ];
   $scope.previewData = {
      "key": null,
      "list": []
   };
   $scope.test = [];
   $scope.hasUploaded = false;

   $scope.selectFile = function (element) {
      $("#fileDisplay").val($(element).val());
   };

   $scope.updateTable = function (data) {
      $scope.previewData = data;
      $scope.test = $scope.previewData.list;
   };

   $scope.handleUpload = function () {
      var $uploadFileInput = $("#fileUpload");
      var msg = uploadSvc.validate($uploadFileInput);
      if (msg) {
         common.messageBox({
            title: "错误信息:",
            content: msg,
            cancel: "取消"
         });

      } else {
         // $('#checkout-form')[0].action = route.upload;
         $("#type").val(fileHelper.getExtName($uploadFileInput[0].files[0].name));
         var submitData = {
            type: 'post',
            dataType: "",
            url: config.baseUrl + "ER/Upload",
            beforeSend: function (data) {
               var auth = "Basic " + Base64.encode(identity.currentUser.username + ":" + identity.currentUser.password);
               data.setRequestHeader("Authorization", auth);
            },
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
            error: function (data) {
               cfpLoadingBar.complete();
               common.notifier.cancel(data);
            }
         };
         cfpLoadingBar.start();
         $('#checkout-form').ajaxSubmit(submitData);
      }
   };

   $scope.confirm = function () {
      if (!$scope.hasUploaded)
         return;
      var data = {
         "userID": config.userID,
         "KEY": $scope.previewData.key
      };
      $http.postXSRF(config.baseUrl + "ER/UploadConfirm", data)
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
      $http.postXSRF(config.baseUrl + "ER/UploadCancel", data)
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

   $scope.expandTable = function () {
      var icon = $("#widgetPreview");
      if (icon.hasClass("jarviswidget-collapsed"))
         icon.find(".jarviswidget-toggle-btn").click();
   };

}