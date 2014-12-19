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

            var dateToFormat = ["reqDelDate1", "reqDelDate2", "reqDelDate3", "reqDelDate4", "depDate1", "depDate1act", "arrDate1", "arrDate1act"];
            dateToFormat.forEach(
               function (key) {
                  $scope.data.dn[key] = dateTimeHelper.formatDate($scope.data.dn[key]);
               }
            );

            var timeToFormat = ["reqDelTime1", "reqDelTime2", "reqDelTime3", "reqDelTime4", "depTime1", "detTime1act", "arrtime1", "arrtime1act"];
            timeToFormat.forEach(
               function (key) {
                  $scope.data.dn[key] = dateTimeHelper.formatTime($scope.data.dn[key]);
               });
         }
      });
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
   $scope.save = function (tempData) {
      

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