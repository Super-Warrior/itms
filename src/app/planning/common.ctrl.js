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