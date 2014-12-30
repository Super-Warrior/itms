angular.module("itms.planning.erPlanibm")
    .controller("erPlanibmCtrl", ["$scope", "$modal", "$log",
        "$http", "config", "common", "configService", "customerService", "exportService", "orderService", erPlanibmCtrl]);

function erPlanibmCtrl($scope, $modal, $log, $http, config, common, configService, customerService, exportService, orderService) {
   $scope.module = "计划";
   $scope.title = "资源计划";
   $scope.result = [];
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

   $scope.detailConfig = { erDetail: true, timeLine: true/*, data: $scope.quickResult */ };
   $scope.columns = [
        { "mData": "erID", "sTitle": "ER" },
        { "mData": "erITN", "sTitle": "ERITN" },
        { "mData": "ertypeDesc", "sTitle": "类型" },
        { "mData": "erTag", "sTitle": "特殊" },
        { "mData": "depCustomerDesc", "sTitle": "发货方" },
        { "mData": "recCustomerDesc", "sTitle": "收货方" },
        { "mData": "project", "sTitle": "项目简称" },//new
        { "mData": "plannedID", "sTitle": "周计划" },//new
        { "mData": "customerOrder1", "sTitle": "客户订单号" },
        { "mData": "customerOrder2", "sTitle": "海通运单号" },
        { "mData": "customerOrder3", "sTitle": "海通委托单号" },
        { "mData": "matIID", "sTitle": "物料" },
        { "mData": "resID1", "sTitle": "包装编码" },//new
        { "mData": "resAmt1", "sTitle": "包装数量" },
        { "mData": "resAmtCS1", "sTitle": "箱型" },//new
        { "mData": "subPackNumner", "sTitle": "封号" },//new
        { "mData": "packNum", "sTitle": "箱号" },
        { "mData": "amt", "sTitle": "件数" },
        { "mData": "pickERDate", "sTitle": "预计装箱日期" },//new
        { "mData": "reqDelDate", "sTitle": "送达日期" },
        { "mData": "ertrtypeDesc", "sTitle": "方式" },
        { "mData": "eritnstatusDesc", "sTitle": "状态" },
        { "mData": "ertrvendorDesc", "sTitle": "第三方" }
   ];
   $scope.selectedSite = [];
   $scope.selectedPosition = { "dep": [], "rec": [] };
   $scope.selectedCustomer = { "dep": [], "rec": [] };
   $scope.quickResult = [];
   $scope.createDate = "";
   $scope.ERID = [""];
   $scope.ERITN = [""];
   $scope.ERTag = [""];
   $scope.ERTRType = [""];
   $scope.ERType = [""];
   $scope.quickSearch = function () {
      var data = {
         SerType: "AND",
         ERID: $scope.ERID,
         ERITN: $scope.ERITN,
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
         ERITNStatus: ["UNAS"],
         ERStatus: [""],
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
      $http.postXSRF(config.baseUrl + "ER/ERQuickSearch", data).then(function (result) {
         $scope.adjustData = new AdjustData();
         $scope.createData = new CreateData();
         if (result.data.errorMessage)
            $scope.quickResult = [];
         else
            $scope.quickResult = orderService.getRequirementPartialForAssigment(result.data);
         $scope.selectedItems = [];
         if ($scope.quickResult.length) {
            var icon = $("#wid-result");
            if (icon.hasClass("jarviswidget-collapsed"))
               icon.find(".jarviswidget-toggle-btn").click();
         }
      });
   };

   $scope.reset = function () {
      $scope.selectedCustomer = { "dep": [], "rec": [] };
      $scope.selectedSite = [];
      $scope.selectedPosition = { "dep": [], "rec": [] };
      $scope.createDate = "";
      $scope.user = "";
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
         common.notifier.success("操作成功");
      });
   };

   $scope.selectedItems = [];

   $scope.searchSite = function () {
      var modalInstance = $modal.open({
         templateUrl: "app/planning/searchSite.tpl.html",
         controller: searchSiteCtrl
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
         controller: searchCustomerCtrl,
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
         controller: searchLocationCtrl,
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

   var AdjustData = function () {
      this.userID = config.userID;
      this.ERID = [];
      this.ERTRType = "";
      this.ERTRVendor = "";
   };

   $scope.adjustData = new AdjustData();
   var CreateData = function () {
      this.EOType = "";
      this.userID = config.userID;
      this.EOTRType = "";
      this.EOTag = "0";
      this.EOTRVendor1 = "";
      this.VendorOrder1 = "";
      this.DeliverBP1 = "";
      this.reqDelDate1 = "";
      this.reqDelDate2 = "";
      this.customerOrder1 = "";
      this.ERID = [];
      this.ERITN = [];
      this.memo = "";
   };

   $scope.createData = CreateData();

   $scope.isAnythingSelected = function () {
      return ($scope.selectedItems.length > 0);
   };

   $scope.modalInstance = null;
   $scope.create = function () {
      if (!$scope.isAnythingSelected())
         return;
      $scope.modalInstance = $modal.open({
         templateUrl: "app/planning/assignment/merge.tpl.html",
         scope: $scope
      });
   };

   $scope.confirmCreate = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否分配所选择需求至运单?"
      }).success($scope.doCreate)
          .error(function () {
             $scope.modalInstance.dismiss();

             common.notifier.cancel("分配已取消...");
          });
   };

   $scope.doCreate = function () {

      if (!$scope.isAnythingSelected()) return;

      $scope.createData.reqDelDate1 = $("#arriveDate").val();
      $scope.createData.reqDelDate2 = $("#sendDate").val();

      $scope.createData.ERID = $scope.selectedItems.map(function (i) {
         return i.erID;
      });
      $scope.createData.ERITN = $scope.selectedItems.map(function (i) {
         return i.erITN;
      });
      $http
          .postXSRF(config.baseUrl + "EO/EOQuickCreate", $scope.createData)
          .then(function (result) {
             $scope.modalInstance.dismiss();
             if (!result.errorMessage || result.errorMessage === "OK") {
                common.notifier.success("运单已成功创建...");
             }
          }).then(function () {
             $scope.quickSearch();
          });
   };

   $scope.adjust = function () {
      if (!$scope.isAnythingSelected())
         return;
      $scope.modalInstance = $modal.open({
         templateUrl: "app/planning/assignment/adjustDeliveryMethod.tpl.html",
         scope: $scope
      });
   };

   $scope.confirmAdjust = function () {
      if (!$scope.isAnythingSelected()) return;
      common.messageBox({
         title: "提示信息:",
         content: "是否修改运输方式及承运商?"
      }).success($scope.doAdjust)
          .error(function () {
             $scope.modalInstance.dismiss();
             common.notifier.cancel("已取消...");
          });
   };

   $scope.doAdjust = function () {
      if (!$scope.isAnythingSelected()) return;
      $scope.adjustData.ERID = $scope.selectedItems.map(function (i) {
         return i.erID;
      });

      $http
          .postXSRF(config.baseUrl + "ER/ERTRChange", $scope.adjustData)
          .then(function (result) {
             $scope.modalInstance.dismiss();
             if (!result.errorMessage || result.errorMessage === "OK") {
                common.notifier.success("数据更新成功...");
             }
          }).then(function () {
             $scope.quickSearch();
          });
   };

   $scope.deleteEr = function () {
      if (!$scope.isAnythingSelected()) return;
      common.messageBox({
         title: "提示信息:",
         content: "是否删除所选择ER需求?"
      }).success($scope.doDeleteEr)
          .error(function () {
             common.notifier.cancel("已取消...");
          });
   };

   $scope.doDeleteEr = function () {
      $http.postXSRF(config.baseUrl + "ER/ERDel", {
         "ERID": $scope.selectedItems.map(function (i) {
            return i.erID;
         }),
         "userID": config.userID
      }).then(
          function (result) {
             if (!result.errorMessage || result.errorMessage === "OK") {
                common.notifier.success("删除操作成功...");
             }
          }).then(function () {
             $scope.quickSearch();
          });
   };

   /* Added by T.C. 2014.11.05*/
   $scope.createEOByER = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否根据所选择ER需求创建EO运单?"
      }).success($scope.doCreateEOByER)
           .error(function () {
              common.notifier.cancel("已取消...");
           });
   };

   /* Added by T.C. 2014.11.05*/
   $scope.doCreateEOByER = function () {
      $http.postXSRF(config.baseUrl + "ER/EOERQuickCreateWOValidation", {
         "ERID": $scope.selectedItems.map(function (i) {
            return i.erID;
         }),
         user: config.userID
      }).then(
         function (result) {
            if (!result.errorMessage || result.errorMessage === "OK") {
               common.notifier.success("创建EO运单操作成功...");
            }
         }).then(function () {
            $scope.quickSearch();
         });
   };

   /* Added by T.C. 2014.11.05*/
   $scope.createEOByERITN = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否根据所选择ER需求项目创建EO运单?"
      }).success($scope.doCreateEOByERITN)
          .error(function () {
             common.notifier.cancel("已取消...");
          });
   };

   /* Added by T.C. 2014.11.05*/
   $scope.doCreateEOByERITN = function () {
      $http.postXSRF(config.baseUrl + "ER/EOERItnQuickCreateWOValidation", {
         "ERID": $scope.selectedItems.map(function (i) {
            return i.erID;
         }),
         "ERITN": $scope.selectedItems.map(function (i) {
            return i.erITN;
         }),
         user: config.userID
      }).then(
         function (result) {
            if (!result.errorMessage || result.errorMessage === "OK") {
               common.notifier.success("创建EO运单操作成功...");
            }
         }).then(function () {
            $scope.quickSearch();
         });
   };

   /* Added by T.C. 2014.11.26*/
   $scope.autoSplitERITN = function () {
      $http.postXSRF(config.baseUrl + "ER/ERItnAutoSplit", {
         "ERID": $scope.selectedItems.map(function (i) {
            return i.erID;
         }),
         "ERITN": $scope.selectedItems.map(function (i) {
            return i.erITN;
         }),
         user: config.userID
      }).then(
         function (result) {
            if (!result.errorMessage || result.errorMessage === "OK") {
               common.notifier.success("包装数量调整完毕...");
            }
         }).then(function () {
            $scope.quickSearch();
         });
   };

   $scope.deleteEritm = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否删除所选择ER需求明细项?"
      }).success($scope.doDeleteEritm)
          .error(function () {
             common.notifier.cancel("已取消...");
          });
   };

   $scope.doDeleteEritm = function () {
      $http
          .postXSRF(
              config.baseUrl + "ER/ERDelItem", {
                 "ERID": $scope.selectedItems.map(function (i) {
                    return i.erID;
                 }),
                 "ERITN": $scope.selectedItems.map(function (i) {
                    return i.erITN;
                 }),
                 "userID": config.userID
              }
          ).then(function (result) {
             if (!result.errorMessage || result.errorMessage === "OK") {
                common.notifier.success("删除操作成功...");
             }
          }).then(function () {
             $scope.quickSearch();
          });
   };

   $scope.export = function () {
      exportService.export($scope.columns, $scope.quickResult);

   };
}