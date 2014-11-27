var config = {
   version: '0.0.1',
   mode: 'production', //development or production
   baseUrl: 'http://211.144.85.15:8080/itms/rest/',
   userID: 10000
};

angular
    .module('itms')
    .config(['$logProvider', configLog])
    .config(['$provide', configProvider])
//    .config(function (cfpLoadingBarProvider) {
//        cfpLoadingBarProvider.includeSpinner = true;
//    })
    .value('config', config);


function configProvider($provide) {
   $provide.decorator('$exceptionHandler', function ($log) {
      return function (exception, cause) {
         var error = { exception: exception, cause: cause };
         $log.debug(error.exception);
         throw error;
      };
   });

   $provide.decorator('$q', function ($delegate) {
      var defer = $delegate.defer;
      $delegate.defer = function () {
         var deferred = defer();
         deferred.promise.success = function (fn) {
            deferred.promise.then(function (value) {
               fn(value);
            });
            return deferred.promise;
         };

         deferred.promise.error = function (fn) {
            deferred.promise.then(null, function (value) {
               fn(value);
            });
            return deferred.promise;
         };
         return deferred;
      };
      return $delegate;
   });

   $provide.decorator('$http', function ($delegate) {
      $delegate['postXSRF'] = function (url, data) {
         if (data) {
            for (var i in data) {
               var val = data[i];
               if ($.isArray(val)&&val.length==0) {
                  data[i] = [""];
               }
            }
         }
         return $delegate({
            method: 'POST',
            url: url,
            data: $.param(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
         });
      };
      return $delegate;
   });
}

function configLog($logProvider) {
   if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
   }
}