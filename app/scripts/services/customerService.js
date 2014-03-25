(function () {
   "use strict";

   angular.module('itmsApp').factory('customerService', ['$http', 'config', customerService]);
   function customerService($http, config) {

      var criteria = {
         "type": [],
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
      var searchCustomer = function (type) {
         if (!type || type == "1" || type.toLowerCase() == "dep")
            type = 1;
         else if (type == "2" || type.toLowerCase() == "rec")
            type = 2;
         else if (type == "5" || type.toLowerCase() == "car")
            type = 5;
         criteria.type = [type];
         return $http({
            method: "GET",
            url: config.baseUrl + "search/Customer" + "?" + $.param(criteria),
            dataType: "json"
         });

      };
      return { "searchCustomer": searchCustomer };
   }
}());
