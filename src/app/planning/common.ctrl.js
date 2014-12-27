angular
   .module('itms.planning.common')
   .controller('searchSiteCtrl', ['$scope', '$http', 'config', '$modalInstance', searchSiteCtrl])
   .controller('searchCustomerCtrl', ['$scope', '$http', 'config', '$modalInstance', 'customerService', 'type', searchCustomerCtrl])
   .controller('searchLocationCtrl', ['$scope', '$modalInstance', 'items', searchLocationCtrl]);

function searchSiteCtrl($scope, $http, config, $modalInstance) {
   $scope.items = [];
   $scope.adjust = {
      deliveryMethod: '',
      vendor: ''
   };
   $scope.ok = function () {
      var keys = $scope.items.filter(
          function (item) {
             return item.checked;
          }
      ).map(function (item) {
         return item.locID;
      });
      $modalInstance.close(keys);
   };
   $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
   };
   $scope.criteria = {
      "SerType": "OR",
      "type": [1],
      "LocID": [""],
      "description": [""],
      "Country": [""],
      "State": [""],
      "City": [""],
      "Disc": [""],
      "postcode": [""],
      "address1": [""],
      "SalesArea": [""],
      "Group1": [""],
      "Group2": [""]
   };
   $scope.search = function () {
      $http({
         method: "GET",
         url: config.baseUrl + "search/Location" + "?" + $.param($scope.criteria),
         dataType: "json"
      }).then(function (result) {
         $scope.items = result.data;
      });
   };
}

function searchCustomerCtrl($scope, $http, config, $modalInstance, customerService, type) {


   var Criteria = function () {
      this.SerType = "OR";
      this.customer = [""];
      this.name = [""];
      this.contact = [""];
      this.Email = [""];
      this.phone = [""];
      this.Country = [""];
      this.State = [""];
      this.City = [""];
      this.Disc = [""];
      this.postcode = [""];
      this.address1 = [""];
      this.SalesArea = [""];
      this.Group1 = [""];
      this.Group2 = [""];
   };

   $scope.criteria = new Criteria();

   $scope.type = type;
   $scope.items = [];
   $scope.ok = function () {
      var keys = $scope.items.filter(
          function (item) {
             return item.checked;
          }
      ).map(function (item) {
         return item.customer;
      });
      $modalInstance.close(keys);
   };
   $scope.search = function () {
      customerService.searchCustomer(type, $scope.criteria).then(function (result) {
         $scope.items = result.data;
      });
   };
   $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
   };
}

function searchLocationCtrl($scope, $modalInstance, items) {
   $scope.items = items;
   $scope.adjust = {
      deliveryMethod: '',
      vendor: ''
   };
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
}


function batchUpdateCtrl($scope, $http, config, common, $modalInstance, transportTypes, carriers, erID) {
   $scope.data = {
      "ERTRType": "",
      "ERTRVendor": "",
      "BP1": "",
      "BP2": "",
      "BP3": "",
      "customerOrder1": "",
      "recERDate": "",
      "reqDelDate": "",
      "ERID": [],
      "ERStatus": "",
      "lastChangeUser": "",
      "lastChangeDate": "",
      "lastChangeTime": "",
      "ERTRTypeSM": "",
      "ERTag": "",
      "ERTRVendorSM": "",
      "preERID": "",
      "preEOID": "",
      "customerOrder2": "",
      "customerOrder3": "",
      "preCustomerOrder1": "",
      "preCustomerOrder2": "",
      "preCustomerOrder3": "",
      "totalAmt": "",
      "totalWgt": "",
      "totalVol": "",
      "totalVolWgt": "",
      "resType1": "",
      "ResAmt1": "",
      "resType2": "",
      "ResAmt2": "",
      "resType3": "",
      "ResAmt3": "",
      "ResMemo": "",
      "memo": "",
      "reqDelTimeE": "",
      "reqDelTimeL": "",
      "recERTime": "",
      "pickERDate": "",
      "pickERTimeS": "",
      "pickERTimeF": "",
      "LoadERTimeS": "",
      "LoadERTimeF": "",
      "oprERDate": "",
      "oprERTimeULS": "",
      "oprERTimeULF": "",
      "oprERTimeS": "",
      "oprERTimeF": "",
      "depAreaCode": "",
      "depCustomer": "",
      "depCustomerContact": "",
      "depCustomerEmail": "",
      "depCustomerPhone": "",
      "depLocCode": "",
      "depMemo": "",
      "recCustomer": "",
      "recCustomerContact": "",
      "recCustomerEmail": "",
      "recCustomerPhone": "",
      "recLocCode": "",
      "recMemo": "",
      "project": "",
      "plannedID": "",
      "ERType": ""
   };
   var distinct = function (arr) {
      var result = [];
      arr.forEach(function (i) {
         if (result.indexOf(i) < 0)
            result.push(i);
      });
      return result;
   };
   $scope.data.ERID = distinct(erID);
   $scope.transportTypes = transportTypes;
   $scope.carriers = carriers;
   $scope.save = function () {

      $http.postXSRF(config.baseUrl + "ER/ERMChange", $scope.data).then(
         function (result) {
            if (!result.data.errorMessage || result.data.errorMessage === "OK") {
               common.notifier.success("更新成功...");
               $modalInstance.close();
            };
         });
   };
}

function packUpdateCtrl($scope, $http, config, common, $modalInstance, erID) {
   $scope.data = {
      "ERID": [],
   };

   var distinct = function (arr) {
      var result = [];
      arr.forEach(function (i) {
         if (result.indexOf(i) < 0)
            result.push(i);
      });
      return result;
   };

   $scope.data.ERID = distinct(erID);

   $scope.save = function () {

      $http.postXSRF(config.baseUrl + "ER/ERMChange", $scope.data).then(
         function (result) {
            if (!result.data.errorMessage || result.data.errorMessage === "OK") {
               common.notifier.success("更新成功...");
               $modalInstance.close();
            };
         });
   };

}


function rowItemSplit($scope, $http, config, common, $modalInstance, erID) {
   $scope.data = {
      "ERID": [],
   };

   var distinct = function (arr) {
      var result = [];
      arr.forEach(function (i) {
         if (result.indexOf(i) < 0)
            result.push(i);
      });
      return result;
   };

   $scope.data.ERID = distinct(erID);

   $scope.save = function () {
      $http.postXSRF(config.baseUrl + "ER/ERMChange", $scope.data).then(
         function (result) {
            if (!result.data.errorMessage || result.data.errorMessage === "OK") {
               common.notifier.success("更新成功...");
               $modalInstance.close();
            };
         });
   };

}