angular
    .module('itms.auth', [])
    .factory('auth', ['$http', '$q', 'config', 'identity', auth]);

function auth($http, $q, config, identity) {

    var url = config.baseUrl + 'auth/login';

    return {
        isLoginRequired: isLoginRequired,
        logon: logon
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
                    dfd.resolve({success: true});
                }

            });
        return dfd.promise;
    }
}