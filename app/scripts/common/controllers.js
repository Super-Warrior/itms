var SearchSiteCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.adjust = {
        deliveryMethod: '',
        vendor: ''
    };
    $scope.ok = function () {
        $scope.items.forEach(function (element) {
            if (!!element.selected) {
                element.deliveryMethod = $scope.adjust.deliveryMethod;
                element.thirdParty = $scope.adjust.vendor;
            }
        });
        $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var SearchCustomerCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.adjust = {
        deliveryMethod: '',
        vendor: ''
    }
    $scope.ok = function () {
        $scope.items.forEach(function (element) {
            if (!!element.selected) {
                element.deliveryMethod = $scope.adjust.deliveryMethod;
                element.thirdParty = $scope.adjust.vendor;
            }
        });
        $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var SearchLocationCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.adjust = {
        deliveryMethod: '',
        vendor: ''
    }
    $scope.ok = function () {
        $scope.items.forEach(function (element) {
            if (!!element.selected) {
                element.deliveryMethod = $scope.adjust.deliveryMethod;
                element.thirdParty = $scope.adjust.vendor;
            }
        });
        $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};