angular.module('common.directives.timepicker', [])
    .directive('imTimepicker', function () {
       return {
          restrict: 'A',
          require: '?ngModel',
          link: postLink
       };

       function postLink(scope, element, attrs, ngModel) {
          element.timepicker();
       }
    });
