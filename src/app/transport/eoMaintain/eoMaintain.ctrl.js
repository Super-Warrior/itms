angular.module('itms.transport.eoMaintain')
.controller('EOMaintainCtrl', ['$scope', '$state', '$log', 'eoMaintainService', EOMaintainSearchCtrl]);

function EOMaintainSearchCtrl($scope, $state, $log, eoMaintainService) {
	$scope.module = "运输执行";
	$scope.title = "运单维护/查询";
	$scope.queryOption={
            SerType: 'ALL',
            EO:[''],
            EOStatus: ['S001'],
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
      $scope.results=[];
      $scope.columns = [
      { "mData": "eo", "sTitle": "EO" },
      { "mData": "erID", "sTitle": "ER" },
      { "mData": "erITN", "sTitle": "ERITN" },
      { "mData": "eoStatus", "sTitle": "运单状态" }
      ];

      $scope.eoMaintainSearch=function(){
            var data = $scope.queryOption;
            $scope.selectedItems = [];
            eoMaintainService.quickSearch(data) 
            .success(function (res) {
                 $scope.results = eoMaintainService.getResultPartial(res);
           })
            .error(function () {
              $log.error('EOMaintainSearchCtrl: quickSearch');
        });

      };

}





