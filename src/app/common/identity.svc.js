angular
  .module('itms.auth')
  .factory('identity', function () {
    return {
      currentUser: undefined
    }
  });
