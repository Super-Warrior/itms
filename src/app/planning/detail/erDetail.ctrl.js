angular.module("itms.planning")
    .controller("erDetailCtrl", ["$scope", "$log",
        "$http", "$q", "config", "common", "configService", "customerService", erDetailCtrl]);

function erDetailCtrl($scope, $log, $http, $q, config, common, configService, customerService, data) {
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


   var configData = {
      "ERST": null,
      "ERNT": null,
      "ERTP": null,
      "TRPY": null,
      "ERTG": null,
      "PKST": null,
   };
   $scope.configs = {};
   configService.getConfigs(configData).then(
         function () {
            $.extend($scope.configs, configData);
            $scope.basicData = data;
         }
      );
   configService.getMaterial("TRES").then(
         function (result) {
            $scope.configs.material = result.data;
         }
   );

   $scope.save = function () {
      var saveHead = function () {

         var param = {};
         $.extend(param, $scope.basicData.requirement);
         param.ERID = param.erID;
         param.ERStatus = param.erStatus;
         param.ERType = param.erType;
         param.ERTRType = param.erTRType;
         param.ERTRTypeSM = param.ertrtypeSM;
         param.ERTag = param.erTag;
         param.ERTRVendor = param.ertrvendor;
         param.ERTRVendorSM = param.ertrvendorSM;
         param.ResAmt1 = param.resAmt1;
         param.ResAmt2 = param.resAmt2;
         param.ResAmt3 = param.resAmt3;
         param.ResMemo = "";
         param.pickERTimeS = param.pickERStartTime;
         param.pickERTimeF = param.pickERFinishTime;
         param.LoadERTimeS = param.loadERStartTime;
         param.LoadERTimeF = param.loadERFinishTime;
         param.oprERTimeULS = param.oprERStartUnloadTime;
         param.oprERTimeULF = param.oprERFinishUnloadTime;
         param.oprERTimeS = param.oprERStartTime;
         param.oprERTimeF = param.oprERFinishTime;
         return $http.post(config.baseUrl + "ER/ERChange" + "?" + $.param(param));
      };
      var saveItem = function () {
         var param = {};
         $.extend(param, $scope.basicData.requirementDetail);
         param.ERID = param.pk.erID;
         param.ERITN = param.pk.erITN;
         param.ERITNStatus = param.ERITNStatus;
         param.EOID = param.eoid;
         param.lastChangeUser = param.lastChangeUser;
         param.lastChangeDate = param.lastChangeDate;
         param.lastChangeTime = param.lastChangeTime;
         param.ERITNType = param.erITNType;
         param.ERITNTag = param.erITNTag;
         param.Status = param.status;
         param.MatIID = param.matIID;
         param.customerMatID = param.customerMatID;
         param.customerOrder2 = param.customerOrder2;
         param.Amt = param.amt;
         param.Wgt = param.wgt;
         param.Vol = param.vol;
         param.VolWgt = param.volWgt;
         param.long = param.longe;
         param.width = param.width;
         param.height = param.height;
         param.PackNum = param.packNum;
         param.Memo = param.memo;

         return $http.post(config.baseUrl + "ER/ERItemChange" + "?" + $.param(param));
      };
      $q.all([saveHead(), saveItem()]).then(
         function (result) {
            alert(result.length);
         }
      );
   };

   $scope.eventHandle = function () {
   };

   $scope.refresh = function () {

   };
}