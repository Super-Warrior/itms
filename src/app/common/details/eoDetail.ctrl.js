angular
    .module('itms.common')
    .controller('EODetailCtrl', ['$scope', '$modalInstance', 'eoDetailService', 'data', EODetailCtrl]);

function EODetailCtrl($scope, $modalInstance, eoDetailService, data) {

    activate();

    function activate() {
        var queryOption = {};
        if (data.eoid) {
            queryOption['eoid'] = data.eoid;
        } else if (data.requirementDetail) {
            queryOption['eoid'] = data.requirementDetail.pk.eoID;
        }

        eoDetailService.getAllConfigData().then(function (result) {
            $scope.configData = result;
        });

        eoDetailService.getEoDetail(queryOption).then(function (result) {
            console.log(result.data);
            if (result.data.errorMessage) {
                $scope.data = {};
            } else {
                $scope.data = result.data[0];
            }
        });
    }

    $scope.save = function (data) {
        eoDetailService.save(data).success(function (result) {
            $modalInstance.close(result);
        });
    };

}