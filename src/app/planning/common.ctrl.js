angular
   .module('itms.planning.common')
   .controller('searchSiteCtrl', ['$scope', '$http', 'config', '$modalInstance', searchSiteCtrl])
   .controller('searchCustomerCtrl', ['$scope', '$http', 'config', '$modalInstance', 'customerService', 'type', searchCustomerCtrl])
   .controller('searchLocationCtrl', ['$scope', '$modalInstance', 'items', searchLocationCtrl])
   .controller('batchUpdateCtrl', ['$scope', '$http', 'config', 'common', '$modalInstance', 'transportTypes', 'carriers', 'erID', batchUpdateCtrl])
   .controller('packUpdateCtrl', ['$scope', '$http', 'config', 'common', '$modalInstance', 'items', packUpdateCtrl])
   .controller('rowItemSplitCtrl', ['$scope', '$http', 'config', 'common', '$modalInstance', 'item', rowItemSplitCtrl])
   .controller("resourceCtrl", ["$scope", "$modal", "$log", "$http", "config", "common",
      "configService", "customerService", "exportService", "orderService", 'dateTimeHelper', '$modalInstance',
      'owners', 'types', 'erID', 'erITN', resourceCtrl])
   .controller("routeCtrl", ["$scope", "$modal", "$log", "$http", "config", "common",
      "configService", "customerService", "exportService", "orderService", 'dateTimeHelper', '$modalInstance', 'types',
      'erID', 'erITN', routeCtrl]);

function searchSiteCtrl($scope, $http, config, $modalInstance) {
   $scope.items = [];
   $scope.adjust = {
      deliveryMethod: '',
      vendor: ''
   };
   $scope.ok = function () {
      var keys = $scope.items.filter(
          function (item) {
             return item.checked;
          }
      ).map(function (item) {
         return item.locID;
      });
      $modalInstance.close(keys);
   };
   $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
   };
   $scope.criteria = {
      "SerType": "OR",
      "type": [1],
      "LocID": [""],
      "description": [""],
      "Country": [""],
      "State": [""],
      "City": [""],
      "Disc": [""],
      "postcode": [""],
      "address1": [""],
      "SalesArea": [""],
      "Group1": [""],
      "Group2": [""]
   };
   $scope.search = function () {
      $http({
         method: "GET",
         url: config.baseUrl + "search/Location" + "?" + $.param($scope.criteria),
         dataType: "json"
      }).then(function (result) {
         $scope.items = result.data;
      });
   };
}

function searchCustomerCtrl($scope, $http, config, $modalInstance, customerService, type) {


   var Criteria = function () {
      this.SerType = "OR";
      this.customer = [""];
      this.name = [""];
      this.contact = [""];
      this.Email = [""];
      this.phone = [""];
      this.Country = [""];
      this.State = [""];
      this.City = [""];
      this.Disc = [""];
      this.postcode = [""];
      this.address1 = [""];
      this.SalesArea = [""];
      this.Group1 = [""];
      this.Group2 = [""];
   };

   $scope.criteria = new Criteria();

   $scope.type = type;
   $scope.items = [];
   $scope.ok = function () {
      var keys = $scope.items.filter(
          function (item) {
             return item.checked;
          }
      ).map(function (item) {
         return item.customer;
      });
      $modalInstance.close(keys);
   };
   $scope.search = function () {
      customerService.searchCustomer(type, $scope.criteria).then(function (result) {
         $scope.items = result.data;
      });
   };
   $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
   };
}

function searchLocationCtrl($scope, $modalInstance, items) {
   $scope.items = items;
   $scope.adjust = {
      deliveryMethod: '',
      vendor: ''
   };
   $scope.ok = function () {
      $scope.items.forEach(function (element) {
         if (!!element.selected) {
            element.deliveryMethod = $scope.adjust.deliveryMethod;
            element.thirdParty = $scope.adjust.vendor;
         }
      });
      $modalInstance.close($scope.items);
   };
   $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
   };
}

function batchUpdateCtrl($scope, $http, config, common, $modalInstance, transportTypes, carriers, erID) {
   $scope.data = {
      "ERTRType": "",
      "ERTRVendor": "",
      "BP1": "",
      "BP2": "",
      "BP3": "",
      "customerOrder1": "",
      "recERDate": "",
      "reqDelDate": "",
      "ERID": [],
      "ERStatus": "",
      "lastChangeUser": "",
      "lastChangeDate": "",
      "lastChangeTime": "",
      "ERTRTypeSM": "",
      "ERTag": "",
      "ERTRVendorSM": "",
      "preERID": "",
      "preEOID": "",
      "customerOrder2": "",
      "customerOrder3": "",
      "preCustomerOrder1": "",
      "preCustomerOrder2": "",
      "preCustomerOrder3": "",
      "totalAmt": "",
      "totalWgt": "",
      "totalVol": "",
      "totalVolWgt": "",
      "resType1": "",
      "ResAmt1": "",
      "resType2": "",
      "ResAmt2": "",
      "resType3": "",
      "ResAmt3": "",
      "ResMemo": "",
      "memo": "",
      "reqDelTimeE": "",
      "reqDelTimeL": "",
      "recERTime": "",
      "pickERDate": "",
      "pickERTimeS": "",
      "pickERTimeF": "",
      "LoadERTimeS": "",
      "LoadERTimeF": "",
      "oprERDate": "",
      "oprERTimeULS": "",
      "oprERTimeULF": "",
      "oprERTimeS": "",
      "oprERTimeF": "",
      "depAreaCode": "",
      "depCustomer": "",
      "depCustomerContact": "",
      "depCustomerEmail": "",
      "depCustomerPhone": "",
      "depLocCode": "",
      "depMemo": "",
      "recCustomer": "",
      "recCustomerContact": "",
      "recCustomerEmail": "",
      "recCustomerPhone": "",
      "recLocCode": "",
      "recMemo": "",
      "project": "",
      "plannedID": "",
      "ERType": ""
   };
   var distinct = function (arr) {
      var result = [];
      arr.forEach(function (i) {
         if (result.indexOf(i) < 0)
            result.push(i);
      });
      return result;
   };
   $scope.data.ERID = distinct(erID);
   $scope.transportTypes = transportTypes;
   $scope.carriers = carriers;
   $scope.save = function () {

      $http.postXSRF(config.baseUrl + "ER/ERMChange", $scope.data).then(
         function (result) {
            if (!result.data.errorMessage || result.data.errorMessage === "OK") {
               common.notifier.success("更新成功...");
               $modalInstance.close();
            };
         });
   };
}

function packUpdateCtrl($scope, $http, config, common, $modalInstance, items) {
   $scope.data = {
      ERID: items.map(function (i) {
         return i.erID;
      }),
      ERITN: items.map(function (i) {
         return i.erITN;
      }),
      userID: config.userID,
      ERITNStatus: "",
      EOID: "",
      lastChangeUser: "",
      lastChangeDate: "",
      lastChangeTime: "",
      ERITNType: "",
      ERITNTag: "",
      Status: "",
      MatIID: "",
      customerMatID: "",
      customerOrder2: "",
      Amt: "",
      Wgt: "",
      Vol: "",
      VolWgt: "",
      "long": "",
      width: "",
      height: "",
      Memo: "",
      RouteID: "",
      RouteClassName: "",
      RouteClassID: "",
      TranResType: "",
      TranResID: "",
      TranResLicense: "",
      TransDriverID: "",
      ResAmt1: "",
      ResAmtCS1: "",
      ResAmt2: "",
      ResAmtCS2: "",
      ResAmt3: "",
      ResAmtCS3: "",
      StorageLocation: "",
      DockLoaction: "",
      PortLocation: "",
      PackNum: "",
      PackNum2: "",
      PackNum3: "",
      SubPackNum: "",
      SubPackNum2: "",
      SubPackNum3: "",
      TrVendor: ""

   };

   $scope.save = function () {

      $http.postXSRF(config.baseUrl + "ER/ERItemMChange", $scope.data).then(
         function (result) {
            if (!result.data.errorMessage || result.data.errorMessage === "OK") {
               common.notifier.success("更新成功...");
               $modalInstance.close();
            };
         });
   };

}

function rowItemSplitCtrl($scope, $http, config, common, $modalInstance, item) {
   $scope.isError = false;
   $scope.clearError = function () {
      $scope.isError = false;
   };
   $scope.data = {
      "ERID": item.erID,
      "ERITN": item.erITN,
      Amt: "",
      PackNum: "",
      PackNum2: "",
      PackNum3: "",
      ResAmt1: "",
      ResAmtCS1: "",
      ResAmt2: "",
      ResAmtCS2: "",
      ResAmt3: "",
      ResAmtCS3: "",
      SubPackNum: "",
      SubPackNum2: "",
      SubPackNum3: "",
      userID: config.userID,



      customerOrder1: item.customerOrder1,
      "matIID": item.matIID,
      availableAmt: item.amt,
      bp1Desc: item.bp1Desc,
      vendorDesc: item.vendorDesc


   };


   $scope.save = function (isDraft) {

      var amt = parseInt($scope.data.Amt);
      if (isNaN(amt) || amt <= 0) {
         alert("请输入拆分数量");
         return;
      }
      var availableAmt = parseInt($scope.data.availableAmt);
      if (amt > availableAmt) {
         $scope.isError = true;
         return;
      }
      var tempData = {
         "ERID": $scope.data.ERID,
         "ERITN": $scope.data.ERITN,
         Amt: $scope.data.Amt,
         PackNum: $scope.data.PackNum,
         PackNum2: $scope.data.PackNum2,
         PackNum3: $scope.data.PackNum3,
         ResAmt1: $scope.data.ResAmt1,
         ResAmtCS1: $scope.data.ResAmtCS1,
         ResAmt2: $scope.data.ResAmt2,
         ResAmtCS2: $scope.data.ResAmtCS2,
         ResAmt3: $scope.data.ResAmt3,
         ResAmtCS3: $scope.data.ResAmtCS3,
         SubPackNum: $scope.data.SubPackNum,
         SubPackNum2: $scope.data.SubPackNum2,
         SubPackNum3: $scope.data.SubPackNum3,
         userID: $scope.data.userID
      };

      var name = isDraft ? "ER/ERItnSplitDraft" : "ER/ERItnSplitConfirm";
      var message = isDraft ? "已成功保存为草稿" : "已成功保存并确认";
      $http.postXSRF(config.baseUrl + name, tempData).then(
         function (result) {
            if (!result.data.errorMessage || result.data.errorMessage === "OK") {
               common.notifier.success(message + "...");
               $modalInstance.close();
            };
         });
   };
}

function resourceCtrl($scope, $modal, $log, $http, config, common, configService, customerService,
   exportService, orderService, dateTimeHelper, $modalInstance, owners, types, erID, erITN) {
   $scope.resourceData = {
      ERID: erID,
      ERITN: erITN,
      TranResType: "",
      TranResID: "",
      TranResLicense: "",
      TransDriverID: ""
   };

   $scope.owners = owners.data;
   $scope.types = types.data;

   $scope.resourceSearchOption = {
      type: "",
      owner: "",
      matnr: "",
      description: "",
      LoadWgt: "",
      Speed: "",
      Vol: "",
      SpecialTag1: ""
   };

   $scope.showResult = false;
   $scope.resources = [];
   $scope.resourceSearch = function () {
      $scope.resourceData.TranResID = "";
      //if (!$scope.resourceSearchOption.type)
      // $scope.resourceSearchOption.type = "TRES";
      configService.getMaterial($scope.resourceSearchOption).then(

        function (result) {
           $scope.showResult = true;
           if (result.data &&
              (!result.data.errorMessage || result.data.errorMessage == "OK")) {
              result.data.forEach(
              function (item) {
                 item.selected = false;

              }
           );

              $scope.resources = result.data;


           } else {
              $scope.resources = [];
           }
        }
      );
   };

   $scope.select = function (i) {
      $scope.resources.forEach(
        function (temp) {
           temp.selected = false;
        });

      var item = $scope.resources[i];
      item.selected = true;
      $scope.resourceData.TranResID = item.matnr;
      console.log($scope.resourceData.TranResID);
   };

   $scope.doAssignResource = function (isDraft) {

      var data = $scope.resourceData;

      if (!data.TranResID || !data.TranResLicense || !data.TransDriverID) {
         alert("请输入完整信息");
         return;
      }
      var message = isDraft ? "已成功分配并保存为草稿" : "已成功分配并确认";

      var method = isDraft ? "ERItemResAssignDraft" : "ERItemResAssignConfirm";
      $http.postXSRF(config.baseUrl + "ER/" + method, data).then(function (result) {
         if (result.data &&
            (!result.data.errorMessage || result.data.errorMessage == "OK")) {
            $modalInstance.close();
            common.notifier.success(message + "...");

         }
      });

   };

}




function routeCtrl($scope, $modal, $log, $http, config, common, configService, customerService,
   exportService, orderService, dateTimeHelper, $modalInstance, types, erID, erITN) {
   $scope.types = types.data;
   $scope.searchData = {
      RouteID: "",
      RouteDesc: "",
      TRType: "",
      RouteOrigin: "",
      RouteOriginDesc: "",
      RouteDest: "",
      RouteDesiDesc: "",
   };

   $scope.routes = [];
   $scope.select = function (i) {
      $scope.routes.forEach(
         function (temp) {
            temp.selected = false;
         });

      var item = $scope.routes[i];
      item.selected = true;
      $scope.routeData.routeID = item.routeID;
      console.log($scope.routeData.routeID);
   };
   $scope.search = function () {
      $scope.routeData.routeID = "";
      configService.getRoute($scope.searchData).then(
      function (result) {
         $scope.showResult = true;
         if (result.data &&
            (!result.data.errorMessage || result.data.errorMessage == "OK")) {
            result.data.forEach(
            function (item) {
               item.selected = false;
            }
         );

            $scope.routes = result.data;
         } else {
            $scope.routes = [];
         }
      }
    );
   };
   $scope.routeData = {
      ERID: erID,
      ERITN: erITN,
      routeID: "",
      routeClassID: "",
      dateS: "",
      timeS: "",
      dateE: "",
      timeE: "",
      routeClassTimeS: "",
      routeClassTimeE: "",
      TRVendor: ""
   };
   $scope.routeData.routeID = "";
   $scope.routeData.routeClassID = "";
   $scope.routeData.routeClassTimeS = "";
   $scope.routeData.routeClassTimeE = "";
   var initDate = dateTimeHelper.formatDate(new Date());
   $scope.routeData.dateS = initDate;
   $scope.routeData.timeS = "";
   $scope.routeData.dateE = initDate;
   $scope.routeData.timeE = "";
   $scope.routeData.TRVendor = "";

   $scope.routeData.checked = false;
   $scope.routeData.resetRouteClassID = function () {
      if ($scope.routeData.checked)
         $scope.routeData.routeClassID = "";
   };

   $scope.routeData.resetChecked = function () {
      if ($scope.routeData.routeClassID.length > 0) {
         $scope.routeData.checked = false;
      }
   };

   $scope.doAssignRoute = function (isDraft) {
      var data = {
         ERID: $scope.routeData.ERID,
         ERITN: $scope.routeData.ERITN,
         RouteID: $scope.routeData.routeID,
         RouteClassID: $scope.routeData.routeClassID,
         TRVendor: $scope.routeData.TRVendor,
         RouteClassTimeS: "",
         RouteClassTimeE: ""
      };


      data.RouteClassTimeS = dateTimeHelper.mergeDateTime($scope.routeData.dateS, $scope.routeData.timeS);
      data.RouteClassTimeE = dateTimeHelper.mergeDateTime($scope.routeData.dateE, $scope.routeData.timeE);

      if (!data.RouteID
         || !data.RouteClassID
         || !data.TRVendor
         || !data.RouteClassTimeS
         || !data.RouteClassTimeE) {
         alert("请输入完整信息");
         return;
      }
      var method = isDraft ? "ERItemRouteAssignDraft" : "ERItemRouteAssignConfirm";
      var message = isDraft ? "已成功分配并保存为草稿" : "已成功分配并确认";
      $http.postXSRF(config.baseUrl + "ER/" + method, data).then(function (result) {
         if (result.data &&
            (!result.data.errorMessage || result.data.errorMessage == "OK")) {
            $modalInstance.close();
            common.notifier.success(message + "...");
         }
      });

   };
}


