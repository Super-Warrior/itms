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
        }
        timelineService.getEventTimeLine(queryOption).then(function (result) {
            if (result.data.errorMessage) {
                $scope.timelines = [];
            } else {
                $scope.timelines = result.data
            }
        });
    }

}