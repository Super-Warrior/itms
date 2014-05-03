angular.module("itms.planning.common")
   .factory("configService", ["$http", "config", configService]);

function configService($http, config) {

   var criteria = {
      "Code": null,
      "ConType": [],
      "Group1": null,
      "Group2": null,
      "Group3": null,
      "Language": ["CN"]
   };
   var configType = {
      "transport": "TRPY",
      "eo": "ERTP",
      "tag": "ERTG",
      "特殊标识": "",
      "配送网络公司": ""
   };

   var getConfig = function (type) {
      criteria.ConType = [configType[type]];
      return $http({
         method: "GET",
         url: config.baseUrl + "Config/ConSearch" + "?" + $.param(criteria),
         dataType: "json"
      });

   };
   return { "getConfig": getConfig };
}