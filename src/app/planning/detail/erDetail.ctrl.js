angular.module("itms.planning")
    .controller("erDetailCtrl", ["$scope", "$log",
        "$http", "$q", "config", "common", "configService", "customerService", erDetailCtrl]);

function erDetailCtrl($scope, $log, $http, $q, config, common, configService, customerService, data) {
   var queryOption = {};


   //  ERID: tempData.pk.erID,
   // ERITN: tempData.pk.erITN,
   if (data && data.requirementDetail) {
      queryOption = {
         "erID": data.requirementDetail.pk.erID,
         "erITN": data.requirementDetail.pk.erITN
      };
   } else {
      queryOption = {
         "erID": data.erID || data['erid'],
         "erITN": data.erITN || data['eritn']
      };
   }


   var param = {
      SerType: "AND",
      userID: config.userID,
      depAreaCode: "",
      depCustomer: "",
      depLocCode: "",
      recCustomer: "",
      recLocCode: "",
      createDate: "",
      ERITNStatus: [""],
      ERStatus: [""]
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
         //
      }
   );

   $http.post(config.baseUrl + "ER/ERQuickSearch" + "?" + $.param(param)).then(function (result) {
      var item = result.data.filter(function (value) {
         return value.requirementDetail.pk.erID == queryOption.erID
            && value.requirementDetail.pk.erITN == queryOption.erITN;
      })[0];
      data = item;
   })
      .then(function () { formatData(data); })
      .then(function () {
         $scope.basicData = data;
      });

   configService.getMaterial("TRES").then(
         function (result) {
            $scope.configs.material = result.data;
         }
   );


   function formatData(data) {


      data.requirement.resMemo = "";
      var formatDate = function (dt) {
         if (!dt) return dt;
         return moment(dt).format("YYYY-MM-DD");
      };
      var formatTime = function (dt) {
         if (!dt) return dt;
         return moment(dt).format("HH:mm:ss");
      };
      data.requirement.recERDate = formatDate(data.requirement.recERDate);
      data.requirement.pickERDate = formatDate(data.requirement.pickERDate);
      data.requirement.oprERDate = formatDate(data.requirement.oprERDate);
      data.requirement.reqDelDate = formatDate(data.requirement.reqDelDate);
      data.requirement.createDate = formatDate(data.requirement.createDate);

      data.requirement.recERTime = formatTime(data.requirement.recERTime);
      data.requirement.pickERStartTime = formatTime(data.requirement.pickERStartTime);
      data.requirement.oprERFinishTime = formatTime(data.requirement.oprERFinishTime);
      data.requirement.reqDelTimeE = formatTime(data.requirement.reqDelTimeE);

      data.requirement.LoadERTimeF = formatTime(data.requirement.LoadERTimeF);
      data.requirement.LoadERTimeS = formatTime(data.requirement.LoadERTimeS);
      data.requirement.createTime = formatTime(data.requirement.createTime);
      data.requirement.loadERStartTime = formatTime(data.requirement.loadERStartTime);
      data.requirement.oprERFinishUnloadTime = formatTime(data.requirement.oprERFinishUnloadTime);
      data.requirement.oprERTimeULF = formatTime(data.requirement.oprERTimeULF);
      data.requirement.oprERTimeULS = formatTime(data.requirement.oprERTimeULS);
      data.requirement.oprERStartTime = formatTime(data.requirement.oprERStartTime);
      data.requirement.oprERStartUnloadTime = formatTime(data.requirement.oprERStartUnloadTime);
      data.requirement.oprERTimeS = formatTime(data.requirement.oprERTimeS);
      data.requirement.pickERFinishTime = formatTime(data.requirement.pickERFinishTime);
      data.requirement.pickERTimeF = formatTime(data.requirement.pickERTimeF);
      data.requirement.loadERFinishTime = formatTime(data.requirement.loadERFinishTime);


   }


   $scope.save = function () {
      var saveHead = function () {
         var tempData = $scope.basicData.requirement;

         var param = {
            ERID: tempData.erID,
            ERStatus: tempData.erStatus,
            lastChangeUser: tempData.lastChangeUser,
            lastChangeDate: tempData.lastChangeDate,
            lastChangeTime: tempData.lastChangeTime,
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
            ResMemo: tempData.resMemo
         };

         return $http.post(config.baseUrl + "ER/ERChange" + "?" + $.param(param));
      };
      var saveItem = function () {
         var tempData = $scope.basicData.requirementDetail;
         var param = {


            ERID: tempData.pk.erID,
            ERITN: tempData.pk.erITN,
            ERITNStatus: tempData.ERITNStatus,
            EOID: tempData.eoid,
            lastChangeUser: tempData.lastChangeUser,
            lastChangeDate: tempData.lastChangeDate,
            lastChangeTime: tempData.lastChangeTime,
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
            Memo: tempData.memo
         };


         return $http.post(config.baseUrl + "ER/ERItemChange" + "?" + $.param(param));
      };
      $q.all([saveHead(), saveItem()]).then(
         function (res) {
            if (isSuccess(res[0].data) && isSuccess(res[1].data)) {
               common.notifier.success("修改成功...");

            }
         }
      );
   };

   function isSuccess(data) {
      return data && (!data.errorMessage || data.errorMessage == "OK");
   }

   $scope.eventHandle = function () {
   };

   $scope.refresh = function () {

   };
}