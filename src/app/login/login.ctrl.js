angular
    .module('itms.login')
    .controller('LoginCtrl'['$scope', '$state', 'auth', LoginCtrl]);

function LoginCtrl($scope, $state, auth) {
    $scope.username = '';
    $scope.password = '';


    $scope.logon = function (username, password) {
        auth
            .logon(username, password)
            .then(function (isLogedin) {
                if(isLogedin) {
                    $state.go('app.user.dashboard');
                }
            });

    }

}