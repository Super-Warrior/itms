;
(function () {
    angular.module('itmsApp').controller('HandleEventCtrl', ['$scope', '$modalInstance','eoService', 'items', function ($scope, $modalInstance,eoService, items) {
        $scope.items = items;

        $scope.event = {
            eventType: '',
            eventCode: '',
            memo: ''
        };

        $scope.types = [{
            value: 'N',
            text: '正常'
        },{
            value: 'D',
            text: '延迟'
        },{
            value: 'E',
            text: '异常'
        }];

        $scope.codes = [{
            value: 'E01',
            text: '天气异常'
        },{
            value: 'E02',
            text: '货物丢失'
        }];

        $scope.ok = function () {
            eoService.createEvent({
                eventType: $scope.event.eventType,
                eventCode: $scope.event.eventCode,
                memo: $scope.event.memo,
                EO: $scope.items.map(function (item) {
                    return item.eo;
                }),
                ERID: $scope.items.map(function (item) {
                    return item.erid;
                }),
                ERITN: $scope.items.map(function (item) {
                    return item.erITN;
                })
            });
            $modalInstance.close($scope.items);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);

}());
