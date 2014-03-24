
angular.module('itmsApp').controller('eoAssignCtrl', function ($scope, $modal, $log, $http, config, customerService) {

   $scope.module = '计划';
   $scope.title = '需求分配';
   $scope.columns = [
      { "mData": "requirementDetail.pk.erID", "sTitle": "ER" },
      { "mData": "requirementDetail.pk.erITN", "sTitle": "ERITN" },
      { "mData": "requirement.erType", "sTitle": "类型" },
      { "mData": "requirement.erTag", "sTitle": "特殊" },
      { "mData": "requirement.depCustomer", "sTitle": "发货方" },
      { "mData": "requirement.recCustomer", "sTitle": "收货方" },
      { "mData": "requirement.customerOrder1", "sTitle": "客户订单号" },
      { "mData": "requirement.customerOrder2", "sTitle": "客户运单号" },
      { "mData": "requirement.customerOrder3", "sTitle": "客户出库号" },
      { "mData": "requirementDetail.matIID", "sTitle": "物料" },
      { "mData": "requirementDetail.packNum", "sTitle": "箱号" },
      { "mData": "requirementDetail.amt", "sTitle": "件数" },
      { "mData": "requirement.reqDelDate", "sTitle": "送达日期" },
      { "mData": "requirement.erTRType", "sTitle": "方式" },
      { "mData": "requirement.ertrvendor", "sTitle": "第三方" }
   ];
   $scope.selectedSite = [];
   $scope.selectedPosition = { "dep": [], "rec": [] };
   $scope.selectedCustomer = { "dep": [], "rec": [] };
   $scope.quickResult = [];
   $scope.quickSearch = function () {
      var data = {
         SerType: "OR",
         userID: config.userID,
         depAreaCode: $scope.selectedSite.toString(),
         depCustomer: $scope.selectedCustomer.dep.toString(),
         depLocCode: $scope.selectedPosition.dep.toString(),
         recCustomer: $scope.selectedCustomer.rec.toString(),
         recLocCode: $scope.selectedPosition.rec.toString(),
         createDate: $("#ercreatedate").val(),
         ERITNStatus: ["UNAS"],
         ERStatus: [""]
      };
      $http.post(config.baseUrl + "ER/ERQuickSearch" + "?" + $.param(data)).then(function (result) {
         $scope.quickResult = result.data;
         $scope.selectedItems = [];
         if ($scope.quickResult.length) {
            var icon = $("#wid-result");
            if (icon.hasClass("jarviswidget-collapsed"))
               icon.find(".jarviswidget-toggle-btn").click();
         }
      });
   };

   $scope.reset = function () {
      $scope.selectedCustomer = { "dep": [], "rec": [] };
      $scope.selectedSite = [];
      $scope.selectedPosition = { "dep": [], "rec": [] };
      $.datepicker._clearDate($("#ercreatedate"));
      $scope.user = "";
   };

   $scope.selectedItems = [];
   /*
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
   */
   $scope.searchSite = function () {
      var modalInstance = $modal.open({
         templateUrl: "views/planning/searchSite2.html",
         controller: SearchSiteCtrl
         //resolve: {
         //   items: function () {
         //      return $scope.selectedItems();
         //   }
         //}
      });
      modalInstance.result.then(function (keys) {
         $scope.selectedSite = keys;
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });
   };

   $scope.searchCustomer = function (type) {
      var modalInstance = $modal.open({
         templateUrl: "views/planning/searchCustomer2.html",
         controller: SearchCustomerCtrl,
         resolve: { "type": type }
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


   $scope.adjustData = {
      "userID": config.userID,
      "ERID": [],
      "ERTRType": "",
      "ERTRVendor": ""
   };
   $scope.createData = {
      "EOType": "0",
      "userID": config.userID,
      "EOTRType": "0",
      "EOTag": "0",
      "EOTRVendor1": "",
      "VendorOrder1": "",
      "DeliverBP1": "0",
      "reqDelDate1": "",
      "reqDelDate2": "",
      "customerOrder1": "",
      "ERID": [],
      "ERITN": [],
      "memo": ""
   };
   $scope.isAnythingSelected = function () {
      return ($scope.selectedItems.length > 0);
   };
   $scope.carriers = [];
   $scope.adjust = function () {
      if ($scope.isAnythingSelected())
         return false;
      if (!$scope.customers.car.length)
         customerService.searchCustomer("car").then(function (data) {
            $scope.customers.car = data;
            $modal.open({
               templateUrl: "views/planning/mergeERRequest.html",
            });
         });
   };
   $scope.confirmAdjust = function () {
      $.SmartMessageBox({
         title: "提示信息!",
         content: "是否修改运输方式及承运商?",
         buttons: '[否][是]'
      }, function (pressed) {
         if (pressed === "是") {
            $scope.doAdjust();
         }
         if (pressed === "否") {
            $.smallBox({
               title: "操作回执",
               content: "<i class='fa fa-clock-o'></i> 已取消...",
               color: "#C46A69",
               iconSmall: "fa fa-times fa-2x fadeInRight animated",
               timeout: 4000
            });
         }
      });
   };
   $scope.doAdjust = function () {
      $scope.adjustData.ERID = $scope.selectedItems.ERID;
      if (!($scope.adjustData.ERID && $scope.adjustData.ERID.length))
         return false;
      $.ajax({
         type: "POST",
         url: route.adjust,
         data: $scope.adjustData,
         success: function (result) {
            if (!result.errorMessage || result.errorMessage === "OK") {

               $.smallBox({
                  title: "操作回执",
                  content: "<i class='fa fa-clock-o'></i>数据更新成功...",
                  color: "#659265",
                  iconSmall: "fa fa-check fa-2x fadeInRight animated",
                  timeout: 4000
               });
            }
            else {
               alert(result.errorMessage);
            }
         },
         dataType: "json"
      });
   };

   $scope.deleteEr = function () {
      $.SmartMessageBox({
         title: "提示信息!",
         content: "是否删除所选择ER需求?",
         buttons: '[否][是]'
      }, function (pressed) {
         if (pressed === "是") {
            $scope.doDeleteEr();
         }
         if (pressed === "否") {
            $.smallBox({
               title: "操作回执",
               content: "<i class='fa fa-clock-o'></i> 已取消...",
               color: "#C46A69",
               iconSmall: "fa fa-times fa-2x fadeInRight animated",
               timeout: 4000
            });
         }
      });
   };

   $scope.doDeleteEr = function () {
      $.ajax({
         type: "POST",
         url: route.deleteEr,
         data: {
            "ERID": $scope.selectedItems.ERID,
         },
         success: function (result) {
            if (!result.errorMessage || result.errorMessage === "OK") {
               $.smallBox({
                  title: "操作回执",
                  content: "<i class='fa fa-clock-o'></i>删除操作成功...",
                  color: "#659265",
                  iconSmall: "fa fa-check fa-2x fadeInRight animated",
                  timeout: 4000
               });
            }
            else {
               alert(result.errorMessage);
            }
         },
         dataType: "json"
      });


   }
   $scope.deleteEritm = function () {
      $.SmartMessageBox({
         title: "提示信息!",
         content: "是否删除所选择ER需求明细项?",
         buttons: '[否][是]'
      }, function (pressed) {
         if (pressed === "是") {
            $scope.doDeleteEritm();
         }
         if (pressed === "否") {
            $.smallBox({
               title: "操作回执",
               content: "<i class='fa fa-clock-o'></i> 已取消...",
               color: "#C46A69",
               iconSmall: "fa fa-times fa-2x fadeInRight animated",
               timeout: 4000
            });
         }
      });
   };
   $scope.doDeleteEritm = function () {
      $.ajax({
         type: "POST",
         url: route.deleteErItem,
         data: {
            "ERID": $scope.selectedItems.ERID,
            "ERITN": $scope.selectedItems.ERITN
         },
         success: function (result) {
            if (!result.errorMessage || result.errorMessage === "OK") {
               $.smallBox({
                  title: "操作回执",
                  content: "<i class='fa fa-clock-o'></i>删除操作成功...",
                  color: "#659265",
                  iconSmall: "fa fa-check fa-2x fadeInRight animated",
                  timeout: 4000
               });
            }
            else {
               alert(result.errorMessage);
            }
         },
         dataType: "json"
      });



   };

   $scope.create = function () {
     
      alert(JSON.stringify($scope.selectedItems));

      if ($scope.isAnythingSelected())
         return false;

      var modalInstance = $modal.open({
         templateUrl: "views/planning/searchCustomer2.html",
         controller: SearchLocationCtrl,
         resolve: {
            items: function () {
               return $scope.selectedItems();
            }
         }
      });
      if ($scope.customers.car.length == 0)
         $scope.searchCustomer("car");
   }

   $scope.confirmCreate = function () {
      if ($scope.isAnythingSelected())
         return false;

      $.SmartMessageBox({
         title: "提示信息!",
         content: "是否分配所选择需求至运单?",
         buttons: '[否][是]'
      }, function (pressed) {
         if (pressed === "是") {
            $scope.doCreate();
         }
         if (pressed === "否") {
            $.smallBox({
               title: "操作回执",
               content: "<i class='fa fa-clock-o'></i> 分配已取消...",
               color: "#C46A69",
               iconSmall: "fa fa-times fa-2x fadeInRight animated",
               timeout: 4000
            });
         }
      });
   }
   $scope.doCreate = function () {
      if ($scope.isAnythingSelected())
         return false;

      $scope.createData.reqDelDate1 = $("#startdateEO").val();
      $scope.createData.reqDelDate2 = $("#DeldateEO").val();
      $scope.createData.ERID = $scope.selectedItems.ERID;
      $scope.createData.ERITN = $scope.selectedItems.ERITN;

      $.ajax({
         type: "POST",
         url: route.creatEo,
         data: $scope.createData,
         success: function (result) {
            if (!result.errorMessage || result.errorMessage === "OK") {
               $.smallBox({
                  title: "操作回执",
                  content: "<i class='fa fa-clock-o'></i>运单已成功创建...",
                  color: "#659265",
                  iconSmall: "fa fa-check fa-2x fadeInRight animated",
                  timeout: 4000
               });
            }
            else {
               alert(result.errorMessage);
            }
         },
         dataType: "json"
      });


   }
});
