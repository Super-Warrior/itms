angular.module("itms.common")
    .controller("erDetailCtrl", ["$scope",
        "$http", "$q", "$modalInstance", "config", "common", "configService", "eoService", "dateTimeHelper", erDetailCtrl]);

function erDetailCtrl($scope, $http, $q, $modalInstance, config, common, configService, eoService, dateTimeHelper, data) {
   var queryOption;
   //  ERID: tempData.pk.erID,
   // ERITN: tempData.pk.erITN,
   if (data && data.requirementDetail) {
      queryOption = {
         "erID": data.requirementDetail.pk.erID,
         "erITN": data.requirementDetail.pk.erITN,
         "eoID": data.requirementDetail.eoid
      };
   } else {
      queryOption = {
         "erID": data.erID || data['erid'],
         "erITN": data.erITN || data['eritn']
      };
   }
   if (data && (data.eoID || data.eoid || data.eo)) {
      queryOption['eoID'] = data.eoID || data.eoid || data.eo;
   }

   var param = {
      SerType: "AND",
      userID: "",//config.userID
      depAreaCode: '',
      depCustomer: '',
      depLocCode: '',
      recCustomer: '',
      recLocCode: '',
      createDate: '',
      ERType: [''],
      ERITNStatus: [""],
      customerOrder1: '',
      customerOrder2: '',
      customerOrder3: '',
      ERTag: [''],
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
      ERID: [queryOption['erID']],
      ERITN: [queryOption['erITN']],
      ERTRType: [""],
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

   var configData = {
      "ERST": null,
      "ERNT": null,
      "ERTP": null,
      "TRPY": null,
      "ERTG": null,
      "PKST": null
   };
   $scope.configs = {};
   configService.getConfigs(configData).then(
       function () {
          $.extend($scope.configs, configData);
       }
   );

   //$scope.updateAuto = function (value) {
   //   if (typeof (value) == "undefined" || value == null)
   //      return;
   //   if ($scope.testAuto == value)
   //      return;
   //   $scope.testAuto = value;
   //};

   //$scope.testAuto = "10002";
   //$scope.getValue = function () {

   //   alert($scope.testAuto);
   //};
   $scope.basicData = {};
   $scope.updateDepCustomer = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.basicData.requirement.depCustomer = value;
   };
   $scope.updateDepLocCode = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.basicData.requirement.depLocCode = value;
   };

   $scope.updateRecCustomer = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.basicData.requirement.recCustomer = value;
   };
   $scope.updateRecLocCode = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.basicData.requirement.recLocCode = value;
   };
   
   $scope.updateResAmtCS1 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.basicData.requirementDetail.resAmtCS1 = value;
   };
   $scope.updateResAmtCS2 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.basicData.requirementDetail.resAmtCS2 = value;
   };
   $scope.updateResAmtCS3 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.basicData.requirementDetail.resAmtCS3 = value;
   };

   $http.postXSRF(config.baseUrl + "ER/ERQuickSearch", param)
       .then(function (result) {
          data = result.data[0];
       })
       .then(function () {
          if (data) {
             formatData(data);
             $scope.basicData = data;
          }
       });

   configService.getMaterial({ "type": "TRES" }).then(
       function (result) {
          $scope.configs.material = result.data;
       }
   );


   function formatData(result) {
      result.requirement.resMemo = "";
      var dateToFormat = ["recERDate", "pickERDate", "oprERDate", "reqDelDate", "createDate"];
      dateToFormat.forEach(
         function (key) {
            result.requirement[key] = dateTimeHelper.formatDate(result.requirement[key]);
         }
      );

      var timeToFormat = ["recERTime", "pickERStartTime", "oprERFinishTime", "reqDelTimeE",
         "LoadERTimeF", "LoadERTimeS", "createTime", "loadERStartTime", "oprERFinishUnloadTime", "oprERTimeULF",
      "oprERTimeULS", "oprERStartTime", "oprERStartUnloadTime", "oprERTimeS", "pickERFinishTime", "pickERTimeF", "loadERFinishTime"];
      timeToFormat.forEach(
         function (key) {
            result.requirement[key] = dateTimeHelper.formatTime(result.requirement[key]);
         });
   };


   $scope.save = function () {
      var saveHead = function () {
         var tempData = $scope.basicData.requirement;
         var time = dateTimeHelper.format(tempData.lastChangeTime, "YYYY-MM-DD HH:mm:ss", "HH:mm:ss");

         var tempParam = {
            ERID: tempData.erID,
            ERStatus: tempData.erStatus,
            lastChangeUser: tempData.lastChangeUser,
            lastChangeDate: tempData.lastChangeDate,
            lastChangeTime: time,
            ERType: tempData.erType,
            ERTRType: tempData.erTRType,
            ERTRTypeSM: tempData.ertrtypeSM,
            ERTag: tempData.erTag,
            ERTRVendor: tempData.ertrvendor,
            ERTRVendorSM: tempData.ertrvendorSM,
            preERID: tempData.preERID,
            preEOID: tempData.preEOID,
            customerOrder1: tempData.customerOrder1,
            customerOrder2: tempData.customerOrder2,
            customerOrder3: tempData.customerOrder3,
            preCustomerOrder1: tempData.preCustomerOrder1,
            preCustomerOrder2: tempData.preCustomerOrder2,
            preCustomerOrder3: tempData.preCustomerOrder3,
            totalAmt: tempData.totalAmt,
            totalWgt: tempData.totalWgt,
            totalVol: tempData.totalVol,
            totalVolWgt: tempData.totalVolWgt,
            resType1: tempData.resType1,
            ResAmt1: tempData.resAmt1,
            resType2: tempData.resType2,
            ResAmt2: tempData.resAmt2,
            resType3: tempData.resType3,
            ResAmt3: tempData.resAmt3,
            memo: tempData.memo,
            reqDelDate: tempData.reqDelDate,
            reqDelTimeE: tempData.reqDelTimeE,
            reqDelTimeL: tempData.reqDelTimeL,
            recERDate: tempData.recERDate,
            recERTime: tempData.recERTime,
            pickERDate: tempData.pickERDate,
            pickERTimeS: tempData.pickERStartTime,
            pickERTimeF: tempData.pickERFinishTime,
            LoadERTimeS: tempData.loadERStartTime,
            LoadERTimeF: tempData.loadERFinishTime,
            oprERDate: tempData.oprERDate,
            oprERTimeULS: tempData.oprERStartUnloadTime,
            oprERTimeULF: tempData.oprERFinishUnloadTime,
            oprERTimeS: tempData.oprERStartTime,
            oprERTimeF: tempData.oprERFinishTime,
            depAreaCode: tempData.depAreaCode,
            depCustomer: tempData.depCustomer,
            depCustomerContact: tempData.depCustomerContact,
            depCustomerEmail: tempData.depCustomerEmail,
            depCustomerPhone: tempData.depCustomerPhone,
            depLocCode: tempData.depLocCode,
            depMemo: tempData.depMemo,
            recCustomer: tempData.recCustomer,
            recCustomerContact: tempData.recCustomerContact,
            recCustomerEmail: tempData.recCustomerEmail,
            recCustomerPhone: tempData.recCustomerPhone,
            recLocCode: tempData.recLocCode,
            recMemo: tempData.recMemo,
            ResMemo: tempData.resMemo,
            //todo:add auto complete
            "BP1": "",
            "BP2": "",
            "BP3": "",
            "project": tempData.project,
            "plannedID": tempData.plannedID
         };
         var timeToFormat = [
               "reqDelTimeE",
               "reqDelTimeL",
               "recERTime",
               "pickERTimeS",
               "pickERTimeF",
               "LoadERTimeS",
               "LoadERTimeF",
               "oprERTimeULS",
               "oprERTimeULF",
               "oprERTimeS",
               "oprERTimeF"
         ];
         timeToFormat.forEach(
            function (key) {
               tempParam[key] = dateTimeHelper.format(tempParam[key], 'HH:mm A', 'HH:mm:ss');
            });
         return $http.postXSRF(config.baseUrl + "ER/ERChange", tempParam);
      };
      var saveItem = function () {
         var tempData = $scope.basicData.requirementDetail;
         var time = dateTimeHelper.format(tempData.lastChangeTime, "YYYY-MM-DD HH:mm:ss", "HH:mm:ss");

         var tempParam = {


            ERID: tempData.pk.erID,
            ERITN: tempData.pk.erITN,
            ERITNStatus: tempData.ERITNStatus,
            EOID: tempData.eoid,
            lastChangeUser: tempData.lastChangeUser,
            lastChangeDate: tempData.lastChangeDate,
            lastChangeTime: time,
            ERITNType: tempData.erITNType,
            ERITNTag: tempData.erITNTag,
            Status: tempData.status,
            MatIID: tempData.matIID,
            customerMatID: tempData.customerMatID,
            customerOrder2: tempData.customerOrder2,
            Amt: tempData.amt,
            Wgt: tempData.wgt,
            Vol: tempData.vol,
            VolWgt: tempData.volWgt,
            "long": tempData.longe,
            width: tempData.width,
            height: tempData.height,
            PackNum: tempData.packNum,
            Memo: tempData.memo,
            RouteID: tempData.routeID,
            RouteClassName: tempData.routeClassName,
            RouteClassID: tempData.routeClassID,
            TranResType: tempData.tranResType,
            TranResID: tempData.tranResID,
            TranResLicense: tempData.tranResLicense,
            TransDriverID: tempData.transDriverID,
            ResAmt1: tempData.resAmt1,
            ResAmt2: tempData.resAmt2,
            ResAmt3: tempData.resAmt3,
            ResAmtCS1: tempData.resAmtCS1,
            ResAmtCS2: tempData.resAmtCS2,
            ResAmtCS3: tempData.resAmtCS3,
            StorageLocation: tempData.storageLocation,
            DockLoaction: tempData.dockLoaction,
            PortLocation: tempData.portLocation,
            TrVendor: tempData.trVendor
         };

         return $http.postXSRF(config.baseUrl + "ER/ERItemChange", tempParam);
      };
      $q.all([saveHead(), saveItem()]).then(
          function (res) {
             if (isSuccess(res[0].data) && isSuccess(res[1].data)) {
                common.notifier.success("修改成功...");
                $modalInstance.close();
             }
          }
      );
   };

   function isSuccess(result) {
      return result && (!result.errorMessage || result.errorMessage == "OK");
   }


   $scope.event = {
      eventType: '',
      eventDate: dateTimeHelper.formatDate(new Date()),
      eventTime: dateTimeHelper.formatTime(new Date()),
      eventCode: "",
      memo: '',
      reset: function () {
         var date = dateTimeHelper.formatDate(new Date());
         var time = dateTimeHelper.formatTime(new Date());
         this.eventDate = date;
         this.eventTime = time;
         this.eventCode = '';
         this.eventType = '';
         this.memo = '';
      }
   };


   $scope.types = [
       {
          value: 'DELY',
          text: '延迟事件'
       },
       {
          value: 'NORM',
          text: '正常事件'
       },
       {
          value: 'UNRP',
          text: '未报告事件'
       },
       {
          value: 'UNXP',
          text: '未期事件'
       }
   ];

   $scope.getEventCode = function (eventType) {
      eoService.getEventCode(eventType)
          .success(function (result) {
             $scope.codes = _.map(result, function (item) {
                return {
                   value: item.group2,
                   text: item.description
                };
             });
          });
   };

   $scope.ok = function () {
      var dt = dateTimeHelper.mergeDateTime($scope.event.eventDate, $scope.event.eventTime);
      eoService
          .createEvent({
             eventType: $scope.event.eventType,
             eventCode: $scope.event.eventCode,
             eventDateTime: dt,
             //eventDate:$scope.event.eventDate,
             //eventTime:$scope.event.eventTime,
             memo: $scope.event.memo,
             EO: [queryOption['eoID'] || '-1'],
             ERID: [queryOption['erID']],
             ERITN: [queryOption['erITN']]
          })
          .success(function () {
             common.notifier.success("创建成功...");
             $scope.event.reset();
          });
   };

}