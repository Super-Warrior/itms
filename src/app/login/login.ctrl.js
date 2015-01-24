angular
    .module('itms.login')
    .controller('LoginCtrl'['$http', '$scope', '$state', 'auth', 'common', 'identity', 'Base64', LoginCtrl]);

function LoginCtrl($http, $scope, $state, auth, common, identity, Base64) {

   $scope.username = '';
   $scope.password = '';
   $scope.logon = function(username, password) {
      $scope.currentForm.validating = true;
      if (!$scope.currentForm.$valid) return;
      auth
         .logon(username, password)
         .then(function(isLoggedin) {
            if (isLoggedin.success) {
               var authdata = Base64.encode(username + ':' + password);
               $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
               auth
                  .getAuth(isLoggedin.result.userID)
                  .then(function(result) {
                     if (result.success) {
                        $state.go('app.user.dashboard');
                     }
                  });
            } else {
               common.notifier.cancel(isLoggedin.message === 'NO_USER' ? '用户不存在' : '密码错误');
            }
         });
   };

}