angular.module('itms.transport.eoMaintainMap')
   .controller('eoMaintainMapCtrl', ['$scope', "$http", "config", "common", '$modal', '$log',
      'eoMaintainService', 'configService', 'customerService', 'exportService','orderService', '$q', mapCtrl]);

function mapCtrl($scope, $http, config, common, $modal, $log, eoMaintainService,
   configService, customerService, exportService, orderService,$q) {
   $scope.module = "运输执行";
   $scope.title = "运单查询/维护";
   $scope.queryOption = {
       SerType: 'AND',
       EO: [''],
       EOStatus: [''],
       eventstatus: [''],
       EOType: [''],
       EOTRType: [''],
       EOTag: [''],
       EOTRVendor1: [''],
       EOTRVendor2: [''],
       EOTRVendor3: [''],
       customerOrder1: [''],
       customerOrder2: [''],
       customerOrder3: [''],
       VendorOrder1: [''],
       VendorOrder2: [''],
       VendorOrder3: [''],
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
       depCustomer: '',
       depLocCode: '',
       ERTag: '',
       MesUnit1: '',
       reqDelDate: '',
       dep_Country: '',
       dep_State: '',
       dep_City: '',
       dep_Disc: '',
       dep_Group1: '',
       dep_Group2: '',
       rec_Country: '',
       rec_State: '',
       rec_City: '',
       rec_Disc: '',
       rec_Group1: '',
       rec_Group2: '',
       recCustomer: '',
       recLocCode: '',
       BP1: "",
       BP2: "",
       BP3: "",
       reqDelDate1S :"",
       reqDelDate1E :"",
       reqDelDate2S :"",
       reqDelDate2E :"",
       reqDelDate3S :"",
       reqDelDate3E :"",
       reqDelDate4S :"",
       reqDelDate4E :"",
       DepDate2 :"",
       DepDate3 :"",
       DepDate1S :"",
       DepDate1E :"",
       DepDate2S :"",
       DepDate2E :"",
       DepDate3S :"",
       DepDate3E :"",
       DepDate1act :"",
       DepDate2act :"",
       DepDate3act :"",
       DepDate1actS :"",
       DepDate1actE :"",
       DepDate2actS :"",
       DepDate2actE :"",
       DepDate3actS :"",
       DepDate3actE :"",
       ArrDate2 :"",
       ArrDate3 :"",
       ArrDate1S :"",
       ArrDate1E :"",
       ArrDate2S :"",
       ArrDate2E :"",
       ArrDate3S :"",
       ArrDate3E :"",
       ArrDate1act :"",
       ArrDate2act :"",
       ArrDate3act :"",
       ArrDate1actS :"",
       ArrDate1actE :"",
       ArrDate2actS :"",
       ArrDate2actE :"",
       ArrDate3actS :"",
       ArrDate3actE :""
   };

   configService.getConfig("TRPY").then(function (result) {
      $scope.transportTypes = result.data;
   });
   customerService.searchCustomer("car").then(function (result) {
      $scope.carriers = result.data;
   });
   configService.getConfig("ERST").then(function (result) {
      $scope.erst = result.data;
   });
   configService.getConfig("ERTP").then(function (result) {
      $scope.eoTypes = result.data;
   });
   configService.getConfig("ERNT").then(function (result) {
      $scope.ernt = result.data;
   });

   configService.getConfig("MDAT", null, "MATERIAL", "TRES").then(function (result) {
      $scope.resourceTypes = result.data;
   });
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
      "mData": "project",
      "sTitle": "项目简称"
   }, {
      "mData": "plannedID",
      "sTitle": "周计划"
   }, {
      "mData": "customerOrder",
      "sTitle": "客户订单号",
      "sWidth": 150
   }, {
      "mData": "eoType",
      "sTitle": "类型",
      "sWidth": 150
   }, {
      "mData": "eventstatus",
      "sTitle": "事件状态"
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
      "mData": "resAmtCS1",
      "sTitle": "箱型"
   }, {
      "mData": "subPackNumner",
      "sTitle": "封号"
   }, {
      "mData": "amt",
      "sTitle": "件数"
   }, {
      "mData": "resID1",
      "sTitle": "包装编码"
   }, {
      "mData": "resAmt1",
      "sTitle": "包装数量"
   }, {
      "mData": "matIIDDesc",
      "sTitle": "物料名称",
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
      "mData": "pickERDate",
      "sTitle": "预计装箱日期",
      "sWidth": 150
   }, {
      "mData": "reDelDate",
      "sTitle": "送达日期",
      "sWidth": 150
   }, {
      "mData": "eoTrtype",
      "sTitle": "方式",
      "sWidth": 150
   }, {
      "mData": "eoTrvendor",
      "sTitle": "承运方"
   }, {
      "mData": "vendorOrder",
      "sTitle": "承运方路单",
      "sWidth": 120
   }, {
      "mData": "deliverBP1",
      "sTitle": "司机ID",
      "sWidth": 120
   }];

   $scope.selectedItems = [];

   //$scope.$watchCollection('selectedItems', function (data) {
   //   var icon = $("#wid-map");
   //   if (data.length === 1) {
   //      var option = { "EO": [data[0].eo], "ER": [data[0].erID], "ERITN": [data[0].erITN] };
   //      $.when(
   //           eoMaintainService.getLocation(option),
   //           eoMaintainService.getEventLocation(option),
   //             eoMaintainService.getRoutePath(option)
   //        ).done(
   //        function (location, events, path) {
   //           var success = mapFrame.window.drawMap(location[0][0], events[0][0], path[0][0]);
   //           if (success) {
   //              if (icon.hasClass("jarviswidget-collapsed"))
   //                 icon.find(".jarviswidget-toggle-btn").click();
   //           } else
   //              alert("该运单目前没有运输信息。");
   //        });
   //   } else {
   //      if (!icon.hasClass("jarviswidget-collapsed"))
   //         icon.find(".jarviswidget-toggle-btn").click();
   //   }
   //}/*, true*/);
   $scope.showMap = false;
   $scope.$on("selectionChange", function (ev, data) {
      var icon = $("#wid-map");
      if (data.length === 1) {
         var option = { "EO": [data[0].eo], "ER": [data[0].erID], "ERITN": [data[0].erITN] };
         $q.all(
         [eoMaintainService.getLocation(option),
            eoMaintainService.getEventLocation(option),
            eoMaintainService.getRoutePath(option)]
         ).then(
            function (datas) {

               var success = false;
               if (datas && datas[0] && datas[0].data && datas[0].data[0]
               && datas[1] && datas[1].data && datas[1].data[0]
               && datas[2] && datas[2].data && datas[2].data[0]) {
                  success = mapFrame.window.drawMap(datas[0].data[0], datas[1].data[0], datas[2].data[0]);
               }

               if (icon.hasClass("jarviswidget-collapsed"))
                  icon.find(".jarviswidget-toggle-btn").click();
               $scope.showMap = success;

            });
      }
   });

   var configData = {
      "ERTP": null,
      "EOST": null,
      "EVST": null,
      "TRPY": null,
      "ERTG": null
   };

   var leftQty = function () {
      this.realQty = "";
      this.leftQty = "";
   };

   $scope.leftQty = new leftQty();

   $scope.mutiOptionDataSource = {};
   configService.getConfigs(configData).then(
       function () {
          $.extend($scope.mutiOptionDataSource, configData);
       }
   );

   $scope.unionParam = orderService.buildUnionParam();
   $scope.updateAutoBP1 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.unionParam.BP1 = value;
   };
   $scope.updateAutoBP2 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.unionParam.BP2 = value;
   };
   $scope.updateAutoBP3 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.unionParam.BP3 = value;
   };

   $scope.updateRecLocCode = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.unionParam.recLocCode = value;
      if (typeof (item.country) != "undefined"
         || typeof (item.state) != "undefined"
         || typeof (item.city) != "undefined"
         || typeof (item.group1) != "undefined") {
         $scope.unionParam.rec_Country = item.country;
         $scope.unionParam.rec_State = item.state;
         $scope.unionParam.rec_City = item.city;
         $scope.unionParam.rec_Group1 = item.group1;
      }
   };

   $scope.updateDepLocCode = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.unionParam.depLocCode = value;

      if (typeof (item.country) != "undefined"
     || typeof (item.state) != "undefined"
     || typeof (item.city) != "undefined"
     || typeof (item.group1) != "undefined") {
         $scope.unionParam.dep_Country = item.country;
         $scope.unionParam.dep_State = item.state;
         $scope.unionParam.dep_City = item.city;
         $scope.unionParam.dep_Group1 = item.group1;
      }
   };

   $scope.updateTrVendor = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.unionParam.TrVendor = value;
   };

   $scope.updateVendor = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.unionParam.vendor = value;
   };

   var refresh = function () {
      if ($scope.isInUnionSearch)
         $scope.unionSearch();
      else
         $scope.eoMaintainSearch();
   };

   var callback = function (res) {
      $scope.selectedItems = [];

      if (!res || res.errorMessage)
         $scope.results = [];
      else
         $scope.results = eoMaintainService.getResultPartial(res);

      if ($scope.results.length) {
         var icon = $("#wid-result");
         if (icon.hasClass("jarviswidget-collapsed"))
            icon.find(".jarviswidget-toggle-btn").click();
      }
   };


   $scope.isInUnionSearch = false;
   $scope.unionReset = function () {
      $scope.unionParam = orderService.buildUnionParam();
   };
   $scope.unionSearch = function () {
      $scope.isInUnionSearch = true;
      orderService.unionSearch(3, $scope.unionParam).then(function (result) {
         callback(result.data);
      });
   };

   $scope.eoMaintainSearch = function () {

      $scope.isInUnionSearch = false;
      var data = $scope.queryOption;

      eoMaintainService.quickSearch(data)
          .success(callback)
          .error(function () {
             $log.error('EOMaintainSearchCtrl: quickSearch');
          });
   };

   $scope.resetEoMaintain = function () {
      $scope.queryOption.SerType = 'AND';
      $scope.queryOption.EO = [''];
      $scope.queryOption.EOStatus = [''];
      $scope.queryOption.eventstatus = [''];
      $scope.queryOption.EOType = [''];
      $scope.queryOption.EOTRType = [''];
      $scope.queryOption.EOTag = [''];
      $scope.queryOption.EOTRVendor1 = '';
      $scope.queryOption.EOTRVendor2 = '';
      $scope.queryOption.EOTRVendor3 = '';
      $scope.queryOption.customerOrder1 = '';
      $scope.queryOption.customerOrder2 = '';
      $scope.queryOption.customerOrder3 = '';
      $scope.queryOption.VendorOrder1 = '';
      $scope.queryOption.VendorOrder2 = '';
      $scope.queryOption.VendorOrder3 = '';
      $scope.queryOption.reqDelDate1 = '';
      $scope.queryOption.reqDelDate2 = '';
      $scope.queryOption.reqDelDate3 = '';
      $scope.queryOption.reqDelDate4 = '';
      $scope.queryOption.ScheduleVendor1 = '';
      $scope.queryOption.ScheduleClass1 = '';
      $scope.queryOption.DepDate1 = '';
      $scope.queryOption.ArrDate1 = '';
      $scope.queryOption.DepTime1 = '';
      $scope.queryOption.Arrtime1 = '';
      $scope.queryOption.DeliverBP1 = '';
      $scope.queryOption.DeliverBP2 = '';
      $scope.queryOption.depCustomer = '';
      $scope.queryOption.depLocCode = '';
      $scope.queryOption.ERTag = '';
      $scope.queryOption.MesUnit1 = '';
      $scope.queryOption.reqDelDate = '';
      $scope.queryOption.dep_Country = '';
      $scope.queryOption.dep_State = '';
      $scope.queryOption.dep_City = '';
      $scope.queryOption.dep_Disc = '';
      $scope.queryOption.dep_Group1 = '';
      $scope.queryOption.dep_Group2 = '';
      $scope.queryOption.rec_Country = '';
      $scope.queryOption.rec_State = '';
      $scope.queryOption.rec_City = '';
      $scope.queryOption.rec_Disc = '';
      $scope.queryOption.rec_Group1 = '';
      $scope.queryOption.rec_Group2 = '';
      $scope.queryOption.recCustomer = '';
      $scope.queryOption.recLocCode = '';
      $scope.queryOption.BP1 = "";
      $scope.queryOption.BP2 = "";
      $scope.queryOption.BP3 = "";



   };
   $scope.handleEvent = function () {
      var modalInstance = $modal.open({
         templateUrl: 'app/transport/event/handleEvent.tpl.html',
         controller: 'HandleEventCtrl',
         resolve: {
            items: function () {
               return $scope.selectedItems;
            }
         }
      });
      modalInstance.result.then(function () {
 refresh();
         common.notifier.success("操作成功");
      });
   };

   $scope.isAnythingSelected = function () {
      return ($scope.selectedItems.length > 0);
   };

   $scope.eoBatchUpdate = function () {
      if (!$scope.isAnythingSelected())
         return;
      $scope.batchUpdateData = $scope.createBatchUpdateData();
      $scope.modalInstance = $modal.open({
         templateUrl: "app/transport/eoMaintain/eoBatchUpdate.tpl.html",
         scope: $scope
      });

   };
   $scope.createBatchUpdateData = function () {
      return {
         "EO": [],
         "userID": "",
         "EOStatus": "",
         "EOType": "",
         "EOTRType": "",
         "EOTag": "",
         "EOTRVendor1": "",
         "EOTRVendor2": "",
         "EOTRVendor3": "",
         "customerOrder1": "",
         "customerOrder2": "",
         "customerOrder3": "",
         "VendorOrder1": "",
         "VendorOrder2": "",
         "VendorOrder3": "",
         "reqDelDate1": "",
         "reqDelDate2": "",
         "reqDelDate3": "",
         "reqDelDate4": "",
         "DeliverBP1": "",
         "DeliverBP2": "",
         "DeliverBP3": "",
         "ScheduleVendor1": "",
         "ScheduleVendor2": "",
         "ScheduleVendor3": "",
         "ScheduleClass1": "",
         "ScheduleClass2": "",
         "ScheduleClass3": "",
         "DepDate1": "",
         "DepDate2": "",
         "DepDate3": "",
         "ArrDate1": "",
         "ArrDate2": "",
         "ArrDate3": "",
         "DepTime1": "",
         "DepTime2": "",
         "DepTime3": "",
         "Arrtime1": "",
         "Arrtime2": "",
         "Arrtime3": "",
         "BP1": "",
         "BP2": "",
         "BP3": "",
         "memo": ""
      };

   };
   $scope.batchUpdateData = $scope.createBatchUpdateData();
   $scope.doBatchUpdate = function () {
      var distinct = function (arr) {
         var result = [];
         arr.forEach(function (i) {
            if (result.indexOf(i) < 0)
               result.push(i);
         });
         return result;
      };
      var eos = $scope.selectedItems.map(function (i) {
         return i.eo;
      });
      $scope.batchUpdateData.EO = distinct(eos);

      $http.postXSRF(config.baseUrl + "EO/EOMChange", $scope.batchUpdateData).then(
         function (result) {
            if (!result.data.errorMessage || result.data.errorMessage === "OK") {
               common.notifier.success("更新成功");
               $scope.eoMaintainSearch();
               $scope.modalInstance.close();
            }
            ;
         });
   };


   $scope.isOnlyOneSelected = function () {
      return ($scope.selectedItems.length == 1);
   };

   $scope.leftQtyEvent = function () {
      $scope.modalInstance = $modal.open({
         templateUrl: "app/transport/eoMaintain/eoMaintainLeftQuantity.tpl.html",
         scope: $scope
      });
   };

   $scope.confirmLeftQtyEvent = function () {
      common.messageBox({
         title: "提示信息:",
         content: "是否更新剩余数量?"
      }).success($scope.doConfirmLeftQtyEvent)
          .error(function () {
             common.notifier.cancel("已取消...");
          });
   };

   $scope.doConfirmLeftQtyEvent = function () {
      $http.postXSRF(config.baseUrl + "ER/ItemLeftQtyCreate", {
         "ERID": $scope.selectedItems.map(function (i) {
            return i.erID;
         }),
         "ERITN": $scope.selectedItems.map(function (i) {
            return i.erITN;
         }),
         "ActQty[]": $scope.leftQty.realQty,
         "LeftQty[]": $scope.leftQty.leftQty,
         "userID": config.userID
      }).then(
           function (result) {
              $scope.modalInstance.dismiss();
              if (!result.errorMessage || result.errorMessage === "OK") {
                 common.notifier.success("操作成功...");
              }
           }).then(function () {
                refresh();
           });
   };


   $scope.searchAssignableRequest = function () {
      var options =
      {
         selectedCustomer: $scope.selectedCustomer,
         selectedSite: $scope.selectedSite,
         selectedPosition: $scope.selectedPosition,
         createDate: $scope.createDate,
         // user: $scope.user,
         dep_State: $scope.dep_State,
         dep_City: $scope.dep_City,
         dep_Group1: $scope.dep_Group1,
         rec_State: $scope.rec_State,
         rec_City: $scope.rec_City,
         ERTag: $scope.ERTag,
         ERTRType: $scope.ERTRType,
         ERType: $scope.ERType,
         customerOrder1: $scope.customerOrder1,
         customerOrder2: $scope.customerOrder2,
         customerOrder3: $scope.customerOrder3
      };
      eoMaintainService.queryER(options).success(function (data) {
         var icon = $("#wid-result");
         $scope.orders = orderService.getRequirementPartial(data);
         if (icon.hasClass("jarviswidget-collapsed"))
            icon.find(".jarviswidget-toggle-btn").click();
      });
   };

   $scope.reset = function () {

      $scope.selectedCustomer = { "dep": [], "rec": [] };
      $scope.selectedSite = [];
      $scope.selectedPosition = { "dep": [], "rec": [] };
      $scope.createDate = "";
      $scope.user = "";
      $scope.dep_State = "";
      $scope.dep_City = "";
      $scope.dep_Group1 = "";
      $scope.rec_State = "";
      $scope.rec_City = "";
      $scope.ERTag = [""];
      $scope.ERTRType = [""];
      $scope.ERType = [""];
      $scope.customerOrder1 = "";
      $scope.customerOrder2 = "";
      $scope.customerOrder3 = "";
   };

   $scope.export = function () {
      exportService.export($scope.columns, $scope.results);
   };

}
