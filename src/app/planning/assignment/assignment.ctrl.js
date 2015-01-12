angular.module("itms.planning.assignment")
   .controller("EOAssignCtrl", ["$scope", "$modal", "$log", "$http", "config", "common",
      "configService", "customerService", "exportService", "orderService", 'dateTimeHelper', EOAssignCtrl]);


function EOAssignCtrl($scope, $modal, $log, $http, config, common, configService, customerService, exportService, orderService, dateTimeHelper) {
   $scope.module = "计划";
   $scope.title = "需求分配";
   $scope.result = [];
   configService.getConfig("TRPY").then(function (result) {
      $scope.transportTypes = result.data;
   });

   configService.getConfig("ERST").then(function (result) {
      $scope.erst = result.data;
   });

   configService.getConfig("ERNT").then(function (result) {
      $scope.ernt = result.data;
   });


   configService.getConfig("MDAT", null, "MATERIAL", "TRES").then(function (result) {
      $scope.resourceTypes = result.data;
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

   $scope.detailConfig = { erDetail: true, timeLine: true/*, data: $scope.quickResult */ };
   $scope.columns = [
      //"sWidth": 150 
        { "mData": "erID", "sTitle": "ER" },
        { "mData": "erITN", "sTitle": "ERITN" },
        { "mData": "ertypeDesc", "sTitle": "类型" },
        { "mData": "erTag", "sTitle": "特殊" },
        { "mData": "depCustomerDesc", "sTitle": "发货方", "sWidth": 150 },
        { "mData": "recCustomerDesc", "sTitle": "收货方", "sWidth": 150 },
        { "mData": "project", "sTitle": "项目简称" },//new
        { "mData": "plannedID", "sTitle": "周计划" },//new
        { "mData": "customerOrder1", "sTitle": "客户订单号", "sWidth": 150 },
        { "mData": "customerOrder2", "sTitle": "海通运单号", "sWidth": 120 },
        { "mData": "customerOrder3", "sTitle": "海通委托单号", "sWidth": 120 },
        { "mData": "matIID", "sTitle": "物料" },
        { "mData": "resID1", "sTitle": "包装编码" },//new
        { "mData": "resAmt1", "sTitle": "包装数量" },
        { "mData": "resAmtCS1", "sTitle": "箱型" },//new
        { "mData": "subPackNumner", "sTitle": "封号" },//new
        { "mData": "packNum", "sTitle": "箱号" },
        { "mData": "amt", "sTitle": "件数" },
        { "mData": "pickERDate", "sTitle": "预计装箱日期", "sWidth": 150 },//new
        { "mData": "reqDelDate", "sTitle": "送达日期", "sWidth": 150 },
        { "mData": "ertrtypeDesc", "sTitle": "方式", "sWidth": 120 },
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

   $scope.updateDepPosition = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.selectedPosition.dep = value;
   };

   $scope.updateRecPosition = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.selectedPosition.rec = value;
   };

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
         ERITNStatus: [""],
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
      $scope.isInUnionSearch = false;
      $http.postXSRF(config.baseUrl + "ER/ERQuickSearch", data).then($scope.callback);
   };


   $scope.callback = function (result) {
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
      $scope.ERID = [""];
      $scope.ERITN = [""];
      $scope.ERTag = [""];
      $scope.ERTRType = [""];
      $scope.ERType = [""];
      $scope.customerOrder1 = "";
      $scope.customerOrder2 = "";
      $scope.customerOrder3 = "";
   };

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
         $scope.quickSearch();
   };

   $scope.isInUnionSearch = false;
   $scope.unionReset = function () {
      $scope.unionParam = orderService.buildUnionParam();
   };
   $scope.unionSearch = function () {
      $scope.isInUnionSearch = true;
      orderService.unionSearch(1, $scope.unionParam).then($scope.callback);
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

      this.VendorOrder2 = "";

      this.VendorOrder3 = "";
      this.BP1 = "";
      this.BP2 = "";
      this.BP3 = "";
      this.DeliverBP1 = "";
      this.reqDelDate1 = "";
      this.reqDelDate2 = "";
      this.customerOrder1 = "";
      this.customerOrder2 = "";
      this.customerOrder3 = "";

      this.ERID = [];
      this.ERITN = [];
      this.memo = "";
   };

   $scope.createData = CreateData();

   $scope.isAnythingSelected = function () {
      return ($scope.selectedItems.length > 0);
   };
   $scope.isOnlyOneSelected = function () {
      return ($scope.selectedItems.length == 1);
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

      // $scope.createData.reqDelDate1 = dateTimeHelper.formatDate($scope.createData.reqDelDate1);
      $scope.createData.relDelTime1 = dateTimeHelper.format($scope.createData.relDelTime1, 'HH:mm A', 'HH:mm:ss');
      // $scope.createData.reqDelDate2 = dateTimeHelper.formatDate($scope.createData.reqDelDate2);
      $scope.createData.relDelTime2 = dateTimeHelper.format($scope.createData.relDelTime2, 'HH:mm A', 'HH:mm:ss');


      $scope.createData.ERID = $scope.selectedItems.map(function (i) {
         return i.erID;
      });
      $scope.createData.ERITN = $scope.selectedItems.map(function (i) {
         return i.erITN;
      });

      $http
      .post(config.baseUrl + "EO/EOQuickCreate" + "?" + $.param($scope.createData))
      .then(function (result) {
         $scope.modalInstance.dismiss();
         if (!result.errorMessage || result.errorMessage === "OK") {
            common.notifier.success("运单已成功创建...");
         }
      }).then(function () {
         refresh();
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
             refresh();
          });
   };

   $scope.deleteEr = function () {
      if (!$scope.isAnythingSelected()) return;
      common.messageBox({
         title: "提示信息:",
         content: "是否删除所选择的" + $scope.selectedItems.length + "条ER需求?"
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
             refresh();
          });
   };

   /* Added by T.C. 2014.11.05*/
   $scope.createEOByER = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否根据所选择的" + $scope.selectedItems.length + "条ER需求创建EO运单?"
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
            refresh();
         });
   };

   /* Added by T.C. 2014.11.05*/
   $scope.createEOByERITN = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否根据所选择的" + $scope.selectedItems.length + "条ER需求项目创建EO运单?"
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
            refresh();
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
            refresh();
         });
   };



   $scope.packUpdate = function () {

      if (!$scope.isAnythingSelected())
         return;
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


   $scope.batchUpdate = function () {

      if (!$scope.isAnythingSelected())
         return;

      var modalInstance = $modal.open({
         templateUrl: "app/planning/batchUpdate.tpl.html",
         controller: "batchUpdateCtrl",
         resolve: {
            transportTypes: function () {
               return $scope.transportTypes;
            },
            carriers: function () {
               return $scope.carriers;
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
   $scope.assignRoute = function () {

      if (!$scope.isAnythingSelected())
         return;

      var modalInstance = $modal.open({
         templateUrl: "app/planning/assignment/assignRoute.tpl.html",
         controller: "routeCtrl",
         resolve: {

            types: function () {
               return configService.getConfig("TRPY", null, "TRTYPE");
            },
            erID: function () {
               return $scope.selectedItems.map(function (i) {
                  return i.erID;
               });
            },
            erITN: function () {
               return $scope.selectedItems.map(function (i) {
                  return i.erITN;
               });
            }


         }
      });
      modalInstance.result.then(function () {
         refresh();
      });

   };

   $scope.deleteEritm = function () {
      if (!$scope.isAnythingSelected())
         return;
      common.messageBox({
         title: "提示信息:",
         content: "是否删除所选择的" + $scope.selectedItems.length + "条ER需求明细项?"
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
             refresh();
          });
   };

   $scope.export = function () {
      exportService.export($scope.columns, $scope.quickResult);

   };

   $scope.assignResource = function () {

      if (!$scope.isAnythingSelected())
         return;

      var modalInstance = $modal.open({
         templateUrl: "app/planning/assignment/assignResource.tpl.html",
         controller: "resourceCtrl",
         resolve: {
            owners: function () {
               return configService.getConfig("MDAT", null, "MATERIAL", "OWNER");
            },
            types: function () {
               return configService.getConfig("MDAT", null, "MATERIAL", "TRES");
            },
            erID: function () {
               return $scope.selectedItems.map(function (i) {
                  return i.erID;
               });
            },
            erITN: function () {
               return $scope.selectedItems.map(function (i) {
                  return i.erITN;
               });
            }


         }
      });
      modalInstance.result.then(function () {
         refresh();
      });

   };


}
