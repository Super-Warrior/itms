angular.module("itms.planning")
    .controller("erDetailCtrl", ["$scope", "$log",
        "$http", "config", "common", "configService", "customerService", erDetailCtrl]);

function erDetailCtrl($scope, $log, $http, config, common, configService, customerService, data) {
   $scope.basicData = data;
  // alert(JSON.stringify($scope.basicInfo));

}