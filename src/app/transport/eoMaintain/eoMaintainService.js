angular.module('itms.transport.eoMaintain')
.factory('eoMaintainService', ['$http', 'config', "configService", function ($http, config, configService){
    	// body...
   
        var searchUrl= config.baseUrl + 'EO/EOQuickSearch';

        return function (param) {
           var data = param;
           return $http.postXSRF(searchUrl, data);
       }

   }]);