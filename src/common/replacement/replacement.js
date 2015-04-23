angular.module('common.directives.replacement', [])
    .directive('imReplacement', function () {
       return {
          replace: true,
          restrict: 'A',
          templateUrl: function (element, attr) {
             return attr.imReplacement;
          }
       };

    
    });
