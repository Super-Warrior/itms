var SearchSiteCtrl = function ($scope, $http, config, $modalInstance) {
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
};

var SearchCustomerCtrl = function ($scope, $http, config, $modalInstance, type) {
   if (!type || type == 1 || type == "1" || type.toLowerCase == "dep")
      $scope.type = 1;
   else if (type == 2 || type == "2" || type.toLowerCase == "rec")
      $scope.type = 2;
   else if (type == 5 || type == "5" || type.toLowerCase == "car")
      $scope.type = 5;
   $scope.criteria = {
      "type": [$scope.type],
      "SerType": "OR",
      "customer": [""],
      "name": [""],
      "contact": [""],
      "Email": [""],
      "phone": [""],
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
      $http({
         method: "GET",
         url: config.baseUrl + "search/Customer" + "?" + $.param($scope.criteria),
         dataType: "json"
      }).then(function (result) {
         $scope.items = result.data;
      });
   };
   $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
   };
};

var SearchLocationCtrl = function ($scope, $modalInstance, items) {
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
};