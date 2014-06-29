angular
    .module('itms.auth', [])
    .factory('auth', ['$rootScope', '$cookieStore','$http','config', auth]);

function auth($rootScope, $cookieStore,$http,config) {

    var url = config.baseUrl+'login';

    return {
        isLoginRequired: isLoginRequired,
        logon: logon
    };

    function isLoginRequired() {
        return false;
//        return !(!!$cookieStore.get('identity'));
    }

    function logon(username, password){
        var payload = {
            username : username,
            password: password
        };
//        $http.postXSRF(url, payload)
//            .success(function(userInfo){
//                $cookieStore.put('identity',userInfo);
//            });

        return true;
    }
}