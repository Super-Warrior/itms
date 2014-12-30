angular.module('itms.planning.adjustment')
    .controller('EOAssignAdjustCtrl', ['$scope', '$modal', '$log', 'orderService', 'common', '$http', 'configService', 'customerService', 'exportService', 'config', '$q', EOAssignAdjustCtrl]);

function EOAssignAdjustCtrl($scope, $modal, $log, orderService, common, $http, configService, customerService, exportService, config, $q) {
   var notifier = common.notifier;

   $scope.module = '计划';
   $scope.title = '分配调整';
   $scope.ERType = [""];
   $scope.orders = [];
   $scope.selectedItems = [];
   $scope.selectedSite = [];
   $scope.selectedPosition = { "dep": [], "rec": [] };
   $scope.selectedCustomer = { "dep": [], "rec": [] };
   $scope.customerOrder1 = "";
   $scope.customerOrder2 = "";
   $scope.customerOrder3 = "";
   $scope.ERTag = [''];
   $scope.ERTRType = [''];
   $scope.ERID = [''];
   $scope.ERITN = [''];
   $scope.createDate = "";
   $scope.reset = function () {
      $scope.selectedCustomer = { "dep": [], "rec": [] };
      $scope.selectedSite = [];
      $scope.selectedPosition = { "dep": [], "rec": [] };
      $scope.createDate = "";
      $scope.user = "";
      $scope.ERType = [""];
      $scope.customerOrder1 = "";
      $scope.customerOrder2 = "";
      $scope.customerOrder3 = "";
      $scope.ERTag = [''];
      $scope.ERTRType = [''];
      $scope.dep_Group1 = "";
      $scope.dep_State = "";
      $scope.dep_City = "";
      $scope.rec_State = "";
      $scope.rec_City = "";

   };
   configService.getConfig("ERST").then(function (result) {
      $scope.erst = result.data;
   });

   configService.getConfig("ERNT").then(function (result) {
      $scope.ernt = result.data;
   });

   configService.getConfig("MDAT", null, "MATERIAL", "TRES").then(function (result) {
      $scope.resourceTypes = result.data;
   });
   configService.getConfig("TRPY").then(function (result) {
      $scope.transportTypes = result.data;
   });
   customerService.searchCustomer("car").then(function (result) {
      $scope.carriers = result.data;
   });
   configService.getConfig("ERTP").then(function (result) {
      $scope.eoTypes = result.data;
   });
   configService.getConfig("ERTG").then(function (result) {
      $scope.tags = result.data;
   });
   customerService.searchCustomer("net").then(function (result) {
      $scope.nets = result.data;
   });
   customerService.searchCustomer("all").then(function (result) {
      $scope.alls = result.data;
   });
   customerService.searchCustomer("dep").then(function (result) {
      $scope.deps = result.data;
   });
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
         common.notifier.success("操作成功");
      });
   };


   $scope.rowItemSplit = function () {

      if (!$scope.isOnlyOneSelected())
         return;
      var modalInstance = $modal.open({
         templateUrl: "app/planning/rowItemSplit.tpl.html",
         controller: "rowItemSplitCtrl",
         resolve: {
            item: function () {
               console.log(JSON.stringify($scope.selectedItems[0]));
               return $scope.selectedItems[0];
            }
         }
      });
      modalInstance.result.then(function () {
         refresh();
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });
   };


   $scope.packUpdate = function () {
      if ($scope.disableAction()) return;

      var modalInstance = $modal.open({
         templateUrl: "app/planning/packUpdate.tpl.html",
         controller: "packUpdateCtrl",
         resolve: {
            items: function () {
               return $scope.selectedItems.map(function (i) {
                  return { "erID": i.erID, "erITN": i.erITN };
               });
            }
         }
      });
      modalInstance.result.then(function () {
         refresh();
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });
   };

   $scope.searchAssignableRequest = function () {
      var param = {
         SerType: 'AND',
         userID: "",//config.userID
         depAreaCode: $scope.selectedSite.toString(),
         depCustomer: $scope.selectedCustomer.dep.toString(),
         depLocCode: $scope.selectedPosition.dep.toString(),
         recCustomer: $scope.selectedCustomer.rec.toString(),
         recLocCode: $scope.selectedPosition.rec.toString(),
         createDate: $scope.createDate,
         ERType: $scope.ERType,
         customerOrder1: $scope.customerOrder1,
         customerOrder2: $scope.customerOrder2,
         customerOrder3: $scope.customerOrder3,
         ERTag: $scope.ERTag,
         ERTRType: $scope.ERTRType,
         MesUnit1: '',
         reqDelDate: '',
         dep_Country: '',
         dep_State: $scope.dep_State,
         dep_City: $scope.dep_City,
         dep_Disc: '',
         dep_Group1: $scope.dep_Group1,
         dep_Group2: '',
         rec_Country: '',
         rec_State: $scope.rec_State,
         rec_City: $scope.rec_City,
         rec_Disc: '',
         rec_Group1: '',
         rec_Group2: '',
         ERITNStatus: ['ASGN'],
         ERStatus: [''],
         ERID: $scope.ERID,
         ERITN: $scope.ERITN,
         project: "",
         plannedID: "",
         OMSOrderID: "",
         contractID: "",
         pickERDate: "",
         ERTRVendor: "",
         BP1: "",
         BP2: "",
         BP3: "",
         TransResPlanTag: "",
         ItemSplitPlan: "",
         RoutePlanTag: "",
         PackNum: "",
         PackNum2: "",
         PackNum3: "",
         SubPackNum: "",
         SubPackNum2: "",
         SubPackNum3: "",
         vendor: "",
         MatIID: "",
         customerMatID: "",
         RouteID: "",
         RouteClassName: "",
         RouteClassID: "",
         TranResType: "",
         TranResID: "",
         TranResLicense: "",
         TransDriverID: "",
         TrVendor: "",
         resType1: "",
         resID1: "",
         resType2: "",
         resID2: "",
         resType3: "",
         resID3: "",
         ResAmtCS1: "",
         ResAmtCS2: "",
         ResAmtCS3: "",
         EOID: ""
      };
      $scope.isInUnionSearch = false;
      orderService.query(param).success(callback);
   };

   $scope.unionParam = orderService.buildUnionParam();

   var refresh = function () {
      if ($scope.isInUnionSearch)
         $scope.unionSearch();
      else
         $scope.searchAssignableRequest();
   };

   var callback = function (data) {
      $scope.selectedItems = [];
      var icon = $("#wid-result");
      $scope.orders = orderService.getRequirementPartial(data);
      if (icon.hasClass("jarviswidget-collapsed"))
         icon.find(".jarviswidget-toggle-btn").click();
   };


   $scope.isInUnionSearch = false;
   $scope.unionReset = function () {
      $scope.unionParam = orderService.buildUnionParam();
   };
   $scope.unionSearch = function () {
      $scope.isInUnionSearch = true;
      orderService.unionSearch(2, $scope.unionParam).then(function (result) {
         callback(result.data);
      });
   };

   $scope.reallocate = function () {
      var reallocate = function (value) {
         orderService
             .erAssignChange({
                selectedItems: $scope.selectedItems,
                eoid: value
             })
             .success(function () {
                notifier.success("已成功分配至订单" + value);
                refresh();
             });
      };

      var cancel = function () {
         notifier.cancel("操作取消...");
      };

      if ($scope.selectedItems.length > 0) {
         common
             .messageBox({
                title: "将所选的" + $scope.selectedItems.length + "条记录" + "分配至其它运单",
                content: "请输入运单号",
                input: "text",
                placeholder: "EO运单编号"
             })
             .success(reallocate)
             .error(cancel);


      }
   };

   $scope.cancelAssignment = function () {
      var doCancelAssignment = function () {
         orderService
            .erDeleteAssignment({
               selectedItems: $scope.selectedItems
            })
            .success(function () {
               notifier.success("已成功取消运单分配...");
               refresh();
            });
      };
      if ($scope.selectedItems.length > 0) {
         common.messageBox({
            title: "提示信息!",
            content: "是否取消所选择" + $scope.selectedItems.length + "条记录的运单分配?"
         })
             .success(doCancelAssignment)
             .error(function () {
                notifier.cancel();
             });
      }
   };

   $scope.deleteErItem = function () {
      if ($scope.disableAction()) return;
      common.messageBox({
         title: "提示信息:",
         content: "是否删除所选择的" + $scope.selectedItems.length + "条记录?"
      }).success($scope.doDeleteErItem)
          .error(function () {
             common.notifier.cancel("已取消...");
          });
   };

   $scope.doDeleteErItem = function () {
      $http.postXSRF(config.baseUrl + "ER/ERDelItem", {
         "ERID": $scope.selectedItems.map(function (i) {
            return i.erID;
         }),
         "ERITN": $scope.selectedItems.map(function (i) {
            return i.erITN;
         }),
         "userID": config.userID
      }).then(
           function (result) {
              if (!result.errorMessage || result.errorMessage === "OK") {
                 common.notifier.success("删除操作成功...");
              }
           }).then(function () {
              refresh();
           });
   };



   $scope.disableAction = function () {
      return $scope.selectedItems.length === 0;
   };
   $scope.isOnlyOneSelected = function () {
      return $scope.selectedItems.length === 1;
   };



   $scope.columns = [
       { "mData": "eoID", "sTitle": "EO" },
       { "mData": "erID", "sTitle": "ER" },
       { "mData": "erITN", "sTitle": "ERITN" },
       { "mData": "erTypeDesc", "sTitle": "类型" },
       { "mData": "erTag", "sTitle": "特殊" },
       { "mData": "depCustomerDesc", "sTitle": "发货方", "sWidth": 150 },
       { "mData": "recCustomerDesc", "sTitle": "收货方", "sWidth": 150 },
       { "mData": "project", "sTitle": "项目简称" },//new
       { "mData": "plannedID", "sTitle": "周计划" },//new
       { "mData": "customerOrder1", "sTitle": "客户订单号", "sWidth": 150 },
       { "mData": "customerOrder2", "sTitle": "海通运单号", "sWidth": 120 },
       { "mData": "customerOrder3", "sTitle": "海通委托单号", "sWidth": 120 },
       { "mData": "matIID", "sTitle": "物料" },
       { "mData": "resAmtCS1", "sTitle": "箱型" },//new
       { "mData": "subPackNumner", "sTitle": "封号" },//new
       { "mData": "packNum", "sTitle": "箱号" },
       { "mData": "amt", "sTitle": "件数" },
       { "mData": "resID1", "sTitle": "包装编码" },//new
       { "mData": "resAmt1", "sTitle": "包装数量" },
       { "mData": "pickERDate", "sTitle": "预计装箱日期", "sWidth": 150 },//new
       { "mData": "reqDelDate", "sTitle": "送达日期", "sWidth": 150 },
       { "mData": "ertrTypeDesc", "sTitle": "方式" },
       { "mData": "eritnstatusDesc", "sTitle": "状态" },
       { "mData": "ertrVendorDesc", "sTitle": "第三方" }
   ];

   $scope.searchCriteria = {
      site: '',
      senderCode: 'AB00011',
      receiverCode: 'AB00012',
      senderLocation: 'AB00013',
      receiverLocation: 'AB00014',
      reset: function () {
         this.site = '';
         this.senderCode = '';
         this.receiverCode = '';
         this.senderLocation = '';
         this.receiverLocation = '';
      }
   };


   $scope.searchSite = function () {
      var modalInstance = $modal.open({
         templateUrl: "app/planning/searchSite.tpl.html",
         controller: "searchSiteCtrl"
      });
      modalInstance.result.then(function (keys) {
         $scope.selectedSite = keys;
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });
   };

   $scope.searchCustomer = function (type) {
      var modalInstance = $modal.open({
         templateUrl: "app/planning/searchCustomer.tpl.html",
         controller: "searchCustomerCtrl",
         resolve: {
            type: function () {
               return type;
            }
         }
      });
      modalInstance.result.then(function (selectedItem) {
         $scope.selectedCustomer[type] = selectedItem;
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });
   };

   $scope.searchLocation = function () {
      var modalInstance = $modal.open({
         templateUrl: "",
         controller: "searchLocationCtrl",
         resolve: {
            items: function () {
               return $scope.selectedItems();
            }
         }
      });
      modalInstance.result.then(function (selectedItem) {
         $scope.selected = selectedItem;
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });
   };


   $scope.batchUpdate = function () {

      if ($scope.disableAction()) return;

      var modalInstance = $modal.open({
         templateUrl: "app/planning/batchUpdate.tpl.html",
         controller: "batchUpdateCtrl",
         resolve: {
            transportTypes: function () {
               var deferred = $q.defer();
               configService.getConfig("TRPY").then(function (result) {
                  deferred.resolve(result.data);
               });
               return deferred.promise;
            },
            carriers: function () {

               var deferred = $q.defer();
               customerService.searchCustomer("car").then(function (result) {
                  deferred.resolve(result.data);
               });
               return deferred.promise;
            },
            erID: function () {
               return $scope.selectedItems.map(function (i) {
                  return i.erID;
               });
            }
         }
      });
      modalInstance.result.then(function () {
         refresh();
      }, function () {
         $log.info('Modal dismissed at: ' + new Date());
      });

   };

   $scope.detailConfig = { erDetail: true, timeLine: true, eoDetail: true };

   $scope.export = function () {
      exportService.export($scope.columns, $scope.orders);

   };

}
