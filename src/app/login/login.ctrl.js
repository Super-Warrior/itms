angular
  .module('itms.login')
  .controller('LoginCtrl', ['$scope', '$state', 'auth', 'common', LoginCtrl]);

function LoginCtrl($scope, $state, auth, common) {
   $scope.username = '';
   $scope.password = '';
   $scope.logon = function (username, password) {
      auth
        .logon(username, password)
        .then(function (isLoggedin) {
           if (isLoggedin.success) {
              auth
                .getAuth(isLoggedin.result.userID)
                .then(function (result) {
                   if (result.success) {
                      $state.go('app.user.dashboard');
                   }
                });
           } else {
              common.notifier.cancel(isLoggedin.message === 'NO_USER' ? '用户不存在' : '密码错误');
           }
        });
   }

}