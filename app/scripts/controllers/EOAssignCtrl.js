
angular.module('itmsApp').controller('eoAssignCtrl', function ($scope, $modal, $log, $http, config) {

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
   $scope.selectedSites = [];
   $scope.selectedPosition = { "dep": [], "rec": [] };
   $scope.selectedCustomer = { "dep": [], "rec": [] };
   $scope.quickResult = [];
   $scope.quickSearch = function () {
      var data = {
         SerType: "OR",
         userID: config.userID,
         depAreaCode: $scope.selectedSites.toString(),
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
      });
   };


   $scope.reset = function () {
      $scope.selectedCustomer = { "dep": [], "rec": [] };
      $scope.selectedArea = [];
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
         $scope.selectedSites = keys;
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
         templateUrl: "views/planning/searchCustomer2.html",
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
