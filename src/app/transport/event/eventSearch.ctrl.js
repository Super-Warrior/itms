angular.module('itms.transport.event')
    .controller('EventSearchCtrl', ['$scope', '$state', EventSearchCtrl]);

function EventSearchCtrl($scope, $state) {

    $scope.module = '运输执行';
    $scope.title = '事件查询';

    $scope.searchByEvent = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEvent');
    };
    $scope.searchByEo = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEo');
    };
    $scope.searchByEr = function () {
        $state.go('app.user.transport.eventSearch.search.searchByEr');
    };
}