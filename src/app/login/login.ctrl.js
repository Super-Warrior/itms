angular
    .module('itms.login')
    .controller('LoginCtrl'['$scope', '$state', 'auth', LoginCtrl]);

function LoginCtrl($scope, $state, auth) {
    $scope.username='';
    $scope.password='';

    $scope.logon = function (username, password) {
        if (auth.logon(username, password)) {
            $state.go('app.dashboard');
        }
    }

}