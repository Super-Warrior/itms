angular
    .module('itms.auth', [])
    .factory('auth', ['$http', '$q', 'config', 'identity', auth]);

function auth($http, $q, config, identity) {

    var url = config.baseUrl + 'auth/login',
        authUrl = config.baseUrl + 'auth/getAuth';

    return {
        isLoginRequired: isLoginRequired,
        logon: logon,
        getAuth: getAuth
    };

    function isLoginRequired() {
        return identity.currentUser === undefined;
    }

    function logon(username, password) {
        var dfd = $q.defer();
        $http.postXSRF(url, {username: username, password: password})
            .success(function (userInfo) {
                if (userInfo.errorMessage) {
                    dfd.resolve({success: false, message: userInfo.errorMessage});
                } else {
                    identity.currentUser = userInfo;
                    dfd.resolve({success: true, result: userInfo});
                }
            });
        return dfd.promise;
    }

    function getAuth(userId) {
        var dfd = $q.defer();
        $http.postXSRF(authUrl, {userID: userId})
            .success(function (authInfo) {
                if (authInfo.errorMessage) {
                    dfd.resolve({success: false, message: authInfo.errorMessage});
                } else {
                    identity.currentUser.auth = authInfo[0];
                    dfd.resolve({success: true});
                }
            });
        return dfd.promise;
    }
}