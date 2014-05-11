angular.module("itms.planning")
    .controller("erDetailCtrl", ["$scope", "$log",
        "$http", "$q", "config", "common", "configService", "customerService", erDetailCtrl]);

function erDetailCtrl($scope, $log, $http, $q, config, common, configService, customerService, data) {

   var configData = {
      "ERST": null,
      "ERNT": null,
      "ERTP": null,
      "TRPY": null,
      "ERTG": null,
      "PKST": null,
   };
   $scope.configs = {};
   configService.getConfigs(configData).then(
         function () {
            $.extend($scope.configs, configData);
            $scope.basicData = data;
         }
      );
   configService.getMaterial("TRES").then(
         function (result) {
            $scope.configs.material = result.data;
         }
   );

   $scope.save = function() {
      var saveHead = function() {
         var param = {};
         $.extend(param, $scope.basicData.requirement);


      };

   };

   $scope.eventHandle = function() {
   };
   
   $scope.refresh= function() {

   }
}