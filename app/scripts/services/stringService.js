(function () {
   'use strict';
   angular.module('itmsApp').factory('stringService', [stringService]);
   function stringService() {
      return {
         "format": function (source) {
            var args = arguments;
            return source.replace(/\{(\d+)\}/g,
                function (m, i) {
                   return args[i - 0 + 1];
                });
         }
      };
   }
}());