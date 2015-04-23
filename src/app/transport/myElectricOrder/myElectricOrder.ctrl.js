angular.module('itms.transport.eoMaintain')
    .controller('MyElectricOrderCtrl', ['$scope', '$modal', '$log', 'myElectricOrderService', MyElectricOrderCtrl]);

function MyElectricOrderCtrl($scope, $modal, $log, myElectricOrderService) {
   $scope.selectedItems = [];
   $scope.module = "运输执行";
   $scope.title = "我的运单";
   $scope.queryOption = {
      SerType: 'AND',
      EO: [''],
      EOStatus: [''],
      eventstatus: [''],
      EOType: [''],
      EOTRType: [''],
      EOTag: [''],
      EOTRVendor1: '',
      EOTRVendor2: '',
      EOTRVendor3: '',
      customerOrder1: '',
      customerOrder2: '',
      customerOrder3: '',
      VendorOrder1: '',
      VendorOrder2: '',
      VendorOrder3: '',
      reqDelDate1: '',
      reqDelDate2: '',
      reqDelDate3: '',
      reqDelDate4: '',
      ScheduleVendor1: '',
      ScheduleClass1: '',
      DepDate1: '',
      ArrDate1: '',
      DepTime1: '',
      Arrtime1: '',
      DeliverBP1: '',
      DeliverBP2: '',
      depCustomer: ($scope.currentUser.userType == '1') ? $scope.currentUser.auth.salesArea : '',
      depLocCode: '',
      recCustomer: ($scope.currentUser.userType == '2') ? $scope.currentUser.auth.salesArea : '',
      recLocCode: '',
      BP1: "",
      BP2: "",
      BP3: ""

   };

   $scope.reset = function () {

      $scope.queryOption = {
         SerType: 'AND',
         EO: [''],
         EOStatus: [''],
         eventstatus: [''],
         EOType: [''],
         EOTRType: [''],
         EOTag: [''],
         EOTRVendor1: '',
         EOTRVendor2: '',
         EOTRVendor3: '',
         customerOrder1: '',
         customerOrder2: '',
         customerOrder3: '',
         VendorOrder1: '',
         VendorOrder2: '',
         VendorOrder3: '',
         reqDelDate1: '',
         reqDelDate2: '',
         reqDelDate3: '',
         reqDelDate4: '',
         ScheduleVendor1: '',
         ScheduleClass1: '',
         DepDate1: '',
         ArrDate1: '',
         DepTime1: '',
         Arrtime1: '',
         DeliverBP1: '',
         DeliverBP2: '',
         depCustomer: ($scope.currentUser.userType == '1') ? $scope.currentUser.auth.salesArea : '',
         depLocCode: '',
         recCustomer: ($scope.currentUser.userType == '2') ? $scope.currentUser.auth.salesArea : '',
         recLocCode: ''
      };
   };
   $scope.results = [];
   $scope.detailConfig = {
      erDetail: true,
      timeLine: true,
      eoDetail: true
   };
   $scope.columns = [{
      "mData": "eo",
      "sTitle": "EO"
   }, {
      "mData": "erID",
      "sTitle": "ER"
   }, {
      "mData": "erITN",
      "sTitle": "ERITN"
   }, {
      "mData": "eoStatus",
      "sTitle": "运单状态",
      "sWidth": 150
   }, {
      "mData": "eventstatus",
      "sTitle": "事件状态",
      "sWidth": 120
   }, {
      "mData": "vendorOrder1",
      "sTitle": "承运商路单",
      "sWidth": 120
   }, {
      "mData": "routeClassID",
      "sTitle": "路单号"
   }, {
      "mData": "tranResLicense",
      "sTitle": "车牌"
   }, {
      "mData": "transDriverID",
      "sTitle": "司机"
   }, {
      "mData": "resAmt1",
      "sTitle": "包装数量",
      "sWidth": 120
   }, {
      "mData": "matIIDDesc",
      "sTitle": "物料名称",
      "sWidth": 120
   }, {
      "mData": "customerOrder",
      "sTitle": "客户订单号",
      "sWidth": 150
   }, {
      "mData": "eoType",
      "sTitle": "类型",
      "sWidth": 120
   }, {
      "mData": "eoTag",
      "sTitle": "特殊"
   }, {
      "mData": "depCustomer",
      "sTitle": "发货方",
      "sWidth": 150
   }, {
      "mData": "recCustomer",
      "sTitle": "收货方",
      "sWidth": 150
   }, {
      "mData": "reDelDate",
      "sTitle": "发达日期",
      "sWidth": 150
   }, {
      "mData": "eoTrtype",
      "sTitle": "方式",
      "sWidth": 120
   }, {
      "mData": "eoTrvendor",
      "sTitle": "承运方"
   }, {
      "mData": "vendorOrder",
      "sTitle": "承运方单号",
      "sWidth": 120
   }];

   $scope.searchCustomer = function (type) {
      var modalInstance = $modal.open({
         templateUrl: "app/planning/searchCustomer.tpl.html",
         controller: searchCustomerCtrl,
         resolve: {
            type: function () {
               return type;
            }
         }
      });
      modalInstance.result.then(function (selectedItem) {
         if (type === 'dep') {
            $scope.queryOption.depCustomer = selectedItem[0];
         } else {
            $scope.queryOption.recCustomer = selectedItem[0];
         }
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });
   };

   $scope.eoMaintainSearch = function () {
      var data = $scope.queryOption;
      myElectricOrderService.quickSearch(data)
          .success(function (res) {
             if (!res || res.errorMessage)
                $scope.results = [];
             else
                $scope.results = myElectricOrderService.getResultPartial(res);
          })
          .error(function () {
             $log.error('EOMaintainSearchCtrl: quickSearch');
          });

   };

   $scope.export = function () {
      exportService.export($scope.columns, $scope.results)

   };

}
