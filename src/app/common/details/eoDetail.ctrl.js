angular
    .module('itms.common')
    .controller('EODetailCtrl', ['$scope', '$modalInstance', 'common', 'eoDetailService', 'eoService', 'dateTimeHelper', 'data', EODetailCtrl]);

function EODetailCtrl($scope, $modalInstance, common, eoDetailService, eoService, dateTimeHelper, data) {

   activate();


   function activate() {
      var queryOption = {};
      if (data.eoid) {
         queryOption['eoid'] = data.eoid;
      } else if (data.requirementDetail) {
         queryOption['eoid'] = data.requirementDetail.pk.eoID;
      } else if (data.eoID) {
         queryOption['eoid'] = data.eoID;
      } else if (data.eo) {
         queryOption['eoid'] = data.eo;
      }

      eoDetailService.getAllConfigData().then(function (result) {
         $scope.configData = result;
      });


      $scope.data = {};
      eoDetailService.getEoDetail(queryOption).then(function (result) {
         console.log(result);
         if (result.data.errorMessage) {
            $scope.data = {};
         } else {
            $scope.data = result.data[0];

            var dateToFormat = ["reqDelDate1", "reqDelDate2", "reqDelDate3", "reqDelDate4", "depDate1", "depDate1act", "arrDate1", "arrDate1act", "depDate2", "depDate2act", "arrDate2", "arrDate2act", "depDate3", "depDate3act", "arrDate3", "arrDate3act"];
            dateToFormat.forEach(
               function (key) {
                  $scope.data.dn[key] = dateTimeHelper.formatDate($scope.data.dn[key]);
               }
            );

            var timeToFormat = ["reqDelTime1", "reqDelTime2", "reqDelTime3", "reqDelTime4", "depTime1", "depTime1act", "arrtime1", "arrtime1act", "depTime2", "depTime2act", "arrtime2", "arrtime2act", "depTime3", "depTime3act", "arrtime3", "arrtime3act"];
            timeToFormat.forEach(
               function (key) {
                  console.log("key:[" + key + "];before[" + $scope.data.dn[key] + "];after:[" + dateTimeHelper.formatTime($scope.data.dn[key]) + "]");
                  $scope.data.dn[key] = dateTimeHelper.formatTime($scope.data.dn[key]);
               });
         }
      });
   }

   $scope.updateEotrvendor1 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.data.dn.eotrvendor1 = value;
   };
   $scope.updateEotrvendor2 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.data.dn.eotrvendor2 = value;
   };

   $scope.updateEotrvendor3 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.data.dn.eotrvendor3 = value;
   };

   $scope.updateDeliverBP1 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.data.dn.deliverBP1 = value;
   };
   $scope.updateDeliverBP2 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.data.dn.deliverBP2 = value;
   };

   $scope.updateScheduleVendor1 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.data.dn.scheduleVendor1 = value;
   };
   $scope.updateScheduleVendor2 = function (item) {
      var value = item.key;
      if (typeof (value) == "undefined" || value == null)
         return;
      $scope.data.dn.scheduleVendor2 = value;
   };



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
   $scope.save = function (tempData) {
      // $scope.data
      //todo:add auto complete
      tempData.BP1 = "";
      tempData.BP2 = "";
      tempData.BP3 = "";

      eoDetailService.save(tempData).success(function (result) {
         $modalInstance.close(result);
      });
   };
   $scope.codes = [];
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
          .success(function (tempData) {
             $scope.codes = _.map(tempData, function (item) {
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
             memo: $scope.event.memo,
             EO: [$scope.data.dn.eo || '-1'],
             ERID: [$scope.data.erItem.pk.erID],
             ERITN: [$scope.data.erItem.pk.erITN]
          })
          .success(function () {
             common.notifier.success("创建成功...");
             $scope.event.reset();
          });
   };

}