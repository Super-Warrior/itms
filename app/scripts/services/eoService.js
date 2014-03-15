(function () {
    'use strict'

    angular.module('itmsApp').factory('eoService', ['$http', 'config', eoService]);

    function eoService($http, config) {
        var baseUrl = 'http://211.144.85.15:8080/ordermanagement/rest/';
        var searchUrl = baseUrl + 'EO/EOQuickSearch?SerType=AND&EOStatus=&eventstatus=&EO=&EOType=&EOTRType=&EOTag=&EOTRVendor1=&EOTRVendor2=&EOTRVendor3=&EOTRVendor3=&EOTRVendor3=&EOTRVendor3=&EOTRVendor3=&EOTRVendor3=&EOTRVendor3=';
    }

}());
