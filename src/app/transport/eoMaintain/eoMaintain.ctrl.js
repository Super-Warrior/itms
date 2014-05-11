angular.module('itms.transport.eoMaintain')
.controller('EOMaintainCtrl', ['$scope', '$state', '$log', 'eoMaintainService', EOMaintainSearchCtrl]);

function EOMaintainSearchCtrl($scope, $state, $log, eventService) {
	$scope.module = "运输执行";
	$scope.title = "运单维护/查询";
	$scope.queryOption={
      serType: 'OR',
      EO:[''],
      EOStatus: [''],
      eventstatus:[''],
      EOType:[''],
      EOTRType:[''],
      EOTag:[''],
      EOTRVendor1:'',
      EOTRVendor2:'',
      EOTRVendor3:'',
      customerOrder1:'',
      customerOrder2:'',
      customerOrder3:'',
      VendorOrder1:'',
      VendorOrder2:'',
      VendorOrder3:'',
      reqDelDate1:'',
      reqDelDate2:'',
      reqDelDate3:'',
      reqDelDate4:'',
      ScheduleVendor1:'',
      ScheduleClass1:'',
      DepDate1:'',
      ArrDate1:'',
      DepTime1:'',
      Arrtime1:'',
      DeliverBP1:'',
      DeliverBP2:'',
      depCustomer:'',
      depLocCode:''
  };
  $scope.eoMaintainSearch=function(){

  };

}




