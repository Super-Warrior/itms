angular
    .module('itms.auth', [])
    .factory('auth', ['$rootScope', '$cookieStore', auth]);

function auth($rootScope, $cookieStore) {

    return {
        isLoginRequired: isLoginRequired,
        logon: logon
    };

    function isLoginRequired() {
        return !(!!$cookieStore.get('identity'));
    }

    function logon(username, password){
        //for now, just simply put indentity into cookies
        $cookieStore.put('identity',username);
        return true;
    }
}