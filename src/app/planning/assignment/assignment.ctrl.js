angular.module("itms.planning.assignment")
    .controller("EOAssignCtrl", ["$scope", "$modal", "$log",
       "$http", "config", "common", "configService", "customerService", EOAssignCtrl]);

function EOAssignCtrl($scope, $modal, $log, $http, config, common, configService, customerService) {
   $scope.module = "计划";
   $scope.title = "需求分配";

   configService.getConfig("transport").then(function (result) {
      $scope.transportTypes = result.data;
   });
   customerService.searchCustomer("car").then(function (result) {
      $scope.carriers = result.data;
   });
   configService.getConfig("eo").then(function (result) {
      $scope.eoTypes = result.data;
   });
   configService.getConfig("tag").then(function (result) {
      $scope.tags = result.data;
   });
   customerService.searchCustomer("net").then(function (result) {
      $scope.nets = result.data;
   });

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
   $scope.createDate = "";
   $scope.quickSearch = function () {
      var data = {
         SerType: "AND",
         userID: config.userID,
         depAreaCode: $scope.selectedSite.toString(),
         depCustomer: $scope.selectedCustomer.dep.toString(),
         depLocCode: $scope.selectedPosition.dep.toString(),
         recCustomer: $scope.selectedCustomer.rec.toString(),
         recLocCode: $scope.selectedPosition.rec.toString(),
         createDate: $scope.createDate,
         ERITNStatus: ["UNAS"],
         ERStatus: [""]
      };
      $http.post(config.baseUrl + "ER/ERQuickSearch" + "?" + $.param(data)).then(function (result) {
         $scope.adjustData = new AdjustData();
         $scope.createData = new CreateData();
         if (result.data.errorMessage)
            $scope.quickResult = [];
         else
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
      $scope.createDate = "";
      $scope.user = "";
   };

   $scope.selectedItems = [];

   $scope.searchSite = function () {
      var modalInstance = $modal.open({
         templateUrl: "app/planning/searchSite.tpl.html",
         controller: searchSiteCtrl
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
         templateUrl: "app/planning/searchCustomer.tpl.html",
         controller: searchCustomerCtrl,
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
   var AdjustData = function () {
      this.userID = config.userID;
      this.ERID = [];
      this.ERTRType = "";
      this.ERTRVendor = "";
   };
   $scope.adjustData = new AdjustData();
   var CreateData = function() {
      this.EOType = "";
      this.userID = config.userID;
      this.EOTRType = "";
      this.EOTag = "0";
      this.EOTRVendor1 = "";
      this.VendorOrder1 = "";
      this.DeliverBP1 = "";
      this.reqDelDate1 = "";
      this.reqDelDate2 = "";
      this.customerOrder1 = "";
      this.ERID = [];
      this.ERITN = [];
      this.memo = "";
   };
   $scope.createData = CreateData();
   
   $scope.isAnythingSelected = function () {
      return ($scope.selectedItems.length > 0);
   };

   $scope.modalInstance = null;
   $scope.create = function () {
      if (!$scope.isAnythingSelected())
         return;
      $scope.modalInstance = $modal.open({
         templateUrl: "app/planning/assignment/merge.tpl.html",
         scope: $scope
      });
   };

   $scope.confirmCreate = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否分配所选择需求至运单?"
      }).success($scope.doCreate)
          .error(function () {
             $scope.modalInstance.dismiss();

             common.notifier.cancel("分配已取消...");
          });
   };
   $scope.doCreate = function () {

      if (!$scope.isAnythingSelected())
         return;

      $scope.createData.reqDelDate1 = $("#arriveDate").val();
      $scope.createData.reqDelDate2 = $("#sendDate").val();

      $scope.createData.ERID = $scope.selectedItems.map(function (i) {
         return i.requirementDetail.pk.erID;
      });
      $scope.createData.ERITN = $scope.selectedItems.map(function (i) {
         return i.requirementDetail.pk.erITN;
      });
      $http.post(config.baseUrl + "EO/EOQuickCreate" + "?" + $.param($scope.createData)).then(function (result) {
         $scope.modalInstance.dismiss();
         if (!result.errorMessage || result.errorMessage === "OK") {
            common.notifier.success("运单已成功创建...");
         }
      }).then(function () {
         $scope.quickSearch();
      });
   };

   $scope.adjust = function () {
      if (!$scope.isAnythingSelected())
         return;
      $scope.modalInstance = $modal.open({
         templateUrl: "app/planning/assignment/adjustDeliveryMethod.tpl.html",
         scope: $scope
      });
   };
   $scope.confirmAdjust = function () {

      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否修改运输方式及承运商?"
      }).success($scope.doAdjust)
          .error(function () {
             $scope.modalInstance.dismiss();
             common.notifier.cancel("已取消...");
          });
   };
   $scope.doAdjust = function () {

      if (!$scope.isAnythingSelected())
         return;
      $scope.adjustData.ERID = $scope.selectedItems.map(function (i) {
         return i.requirementDetail.pk.erID;
      });

      $http.post(config.baseUrl + "ER/ERTRChange" + "?" + $.param($scope.adjustData)).then(function (result) {
         $scope.modalInstance.dismiss();
         if (!result.errorMessage || result.errorMessage === "OK") {
            common.notifier.success("数据更新成功...");
         }
      }).then(function () {
         $scope.quickSearch();
      });
   };

   $scope.deleteEr = function () {
      if (!$scope.isAnythingSelected())
         return;
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
            return i.requirementDetail.pk.erID;
         })
      })).then(
          function (result) {
             if (!result.errorMessage || result.errorMessage === "OK") {
                common.notifier.success("删除操作成功...");
             }
          }).then(function () {
             $scope.quickSearch();
          });
   };

   $scope.deleteEritm = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否删除所选择ER需求明细项?"
      }).success($scope.doDeleteEritm)
          .error(function () {
             common.notifier.cancel("已取消...");
          });
   };
   $scope.doDeleteEritm = function () {
      $http.post(
              config.baseUrl + "ER/ERDelItem" + "?" + $.param({
                 "ERID": $scope.selectedItems.map(function (i) {
                    return i.requirementDetail.pk.erID;
                 }),
                 "ERITN": $scope.selectedItems.map(function (i) {
                    return i.requirementDetail.pk.erITN;
                 })
              })
          ).then(function (result) {
             if (!result.errorMessage || result.errorMessage === "OK") {
                common.notifier.success("删除操作成功...");
             }
          }).then(function () {
             $scope.quickSearch();
          });
   };
}