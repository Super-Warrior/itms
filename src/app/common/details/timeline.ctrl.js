angular
    .module('itms.common')
    .controller('TimeLineCtrl', ['$scope', 'timelineService', 'data', TimeLineCtrl]);

function TimeLineCtrl($scope, timelineService, data) {

   activate();

   function activate() {
      var queryOption = {},
          eoNumber;
      if (data.eoNumber) {
         eoNumber = data.eoNumber.split('/');
         queryOption['eo'] = eoNumber[0];
         queryOption['er'] = eoNumber[1];
         queryOption['eritn'] = eoNumber[2];
      } else if (data.requirementDetail) {
         queryOption['er'] = data.requirementDetail.pk.erID;
         queryOption['eritn'] = data.requirementDetail.pk.erITN;
      } else if (data.eoID || data.eo) {
         queryOption['eo'] = data.eoID || data.eo;
         queryOption['er'] = data.erID;
         queryOption['eritn'] = data.erITN;
      }
      else if (data.erID) {
         queryOption['eo'] = "";
         queryOption['er'] = data.erID;
         queryOption['eritn'] = data.erITN;

      }
      timelineService.getEventTimeLine(queryOption).then(function (result) {
         if (result.data.errorMessage) {
            $scope.timelines = [];
         } else {
            $scope.timelines = result.data;
         }
      });
   }

}