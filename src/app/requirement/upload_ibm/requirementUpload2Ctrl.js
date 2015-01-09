angular.module("itms.requirement.uploadibm").controller("requirementUploadIbmCtrl",
    ["$scope", "$http", "config", "common", "cfpLoadingBar", "uploadSvc", 'Base64', 'identity', controller]);

function controller($scope, $http, config, common, cfpLoadingBar, uploadSvc, Base64, identity) {
   var fileHelper = common.fileHelper;

   $scope.module = "需求管理";
   $scope.title = "上载";
   $scope.columns = [
       /* { "mData": "", "sTitle": "detail" },*/
       { "mData": "transportType", "sTitle": "运输方式", "sWidth": 150 },
       { "mData": "customerCode1", "sTitle": "合同客户编码", "bVisible": false, "sWidth": 150 },
       { "mData": "customerCode2", "sTitle": "结算客户编码", "bVisible": false, "sWidth": 150 },
       { "mData": "customerCode3", "sTitle": "货主客户编码", "sWidth": 150 },
       { "mData": "projectShortName", "sTitle": "项目简称", "sWidth": 150 },
       { "mData": "transportWeek", "sTitle": "发运周", "sWidth": 150 },
       { "mData": "customerPONumber", "sTitle": "客户订单号", "sWidth": 150 },
       { "mData": "haitongPONumber", "sTitle": "海通订单号", "sWidth": 150 },
       { "mData": "haitongPOCreatedDate", "sTitle": "海通订单生成日", "bVisible": false, "sWidth": 150 },
       { "mData": "haitongTONumber", "sTitle": "海通委托单号", "bVisible": false, "sWidth": 150 },
       { "mData": "haitongTOCreatedDate", "sTitle": "海通委托单生成日", "bVisible": false, "sWidth": 150 },
       { "mData": "quantity", "sTitle": "数量", "sWidth": 150 },
       { "mData": "carrierCode", "sTitle": "运输车队编码", "sWidth": 150 },
       { "mData": "shipfromLocationID", "sTitle": "始发门点编码", "sWidth": 150 },
       { "mData": "shipformCity", "sTitle": "始发市", "bVisible": false, "sWidth": 150 },
       { "mData": "shiptoLocationID", "sTitle": "目的门点编码", "sWidth": 150 },
       { "mData": "shiptoCity", "sTitle": "目的市", "bVisible": false, "sWidth": 150 },
       { "mData": "estimatedPickupDate", "sTitle": "预计装箱日期", visible: false, "sWidth": 150 },
       { "mData": "estimatedPickupTime", "sTitle": "预计装箱时间", "sWidth": 150 },
       { "mData": "estimatedArrivingDate", "sTitle": "预计到达日期", "sWidth": 150 },
       { "mData": "estimatedArrivingTime", "sTitle": "预计到达时间", "sWidth": 150 },
       { "mData": "partCode", "sTitle": "零件编码", visible: false, "sWidth": 150 },
       { "mData": "boxType", "sTitle": "箱类", "bVisible": false, "sWidth": 150 },
       { "mData": "containerType", "sTitle": "箱型", visible: false, "sWidth": 150 },
       { "mData": "containerNo", "sTitle": "箱号", "sWidth": 150 },
       { "mData": "sealNumber", "sTitle": "封号", "sWidth": 150 },
       { "mData": "supplierDUNS", "sTitle": "零件供应商编码", "sWidth": 150 },
       { "mData": "vesselName", "sTitle": "船名", "bVisible": false, "sWidth": 150 },
       { "mData": "voyage", "sTitle": "航次", "bVisible": false, "sWidth": 150 },
       { "mData": "billOfLandingNumber", "sTitle": "运单号", "bVisible": false, "sWidth": 150 },
       { "mData": "materialType", "sTitle": "物料分类", "bVisible": false, "sWidth": 150 },
       { "mData": "packingTypeID", "sTitle": "包装编码", "bVisible": false, "sWidth": 150 },
       { "mData": "packingQuantity", "sTitle": "包装内零件数", "bVisible": false, "sWidth": 150 },
       { "mData": "packingType", "sTitle": "包装类型", "bVisible": false, "sWidth": 150 },
       { "mData": "haitongStorageNo", "sTitle": "暂存区", "bVisible": false, "sWidth": 150 },
       { "mData": "uploadPort", "sTitle": "卸货口", "bVisible": false, "sWidth": 150 },
       { "mData": "errorIndicator", "sTitle": "ERROR", "sWidth": 150 }

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
            url: config.baseUrl + "ER1/ERUpload",
            beforeSend: function (data) {
               var auth = "Basic " + Base64.encode(identity.currentUser.username + ":" + identity.currentUser.password);
               data.setRequestHeader("Authorization", auth);
            },
            success: function (data) {
               alert(JSON.stringify(data));
               cfpLoadingBar.complete();
               $scope.updateTable(data);
               if (data && data.key) {
                  common.notifier.success("上载内容已成功,请确认数据.");
                  $scope.hasUploaded = true;
                  $scope.expandTable();
                  $('#fileDisplay').val('');
               } else {
                  var message = "上传失败";
                  if (data && data.errorMessage)
                     message = data.errorMessage;
                  common.notifier.cancel(message);
                  $scope.hasUploaded = false;
               }
               $scope.$apply();
            },
            error: function (data) {
               cfpLoadingBar.complete();
               common.notifier.cancel("上传失败");
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
      $http.post(config.baseUrl + "ER1/ERCreateDefaultValueCopy" + "?" + $.param(data))
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

   $scope.expandTable = function () {
      var icon = $("#widgetPreview");
      if (icon.hasClass("jarviswidget-collapsed"))
         icon.find(".jarviswidget-toggle-btn").click();
   };

}