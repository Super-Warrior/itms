angular
    .module('itms.common')
    .controller('TimeLineCtrl', ['$scope', 'timelineService', 'queryOption', TimeLineCtrl]);

function TimeLineCtrl($scope, timelineService, data) {

    activate();

    function activate() {
        var queryOption = {},
            eoNumber = data.eoNumber.split('/');
        queryOption['eo'] = eoNumber[0];
        queryOption['er'] = eoNumber[1];
        queryOption['eritn'] = eoNumber[2];
        timelineService.getEventTimeLine(queryOption).then(function (result) {
            if (result.data.errorMessage) {
                $scope.timelines = [];
            } else {
                $scope.timelines = result.data
            }
        });
    }

}