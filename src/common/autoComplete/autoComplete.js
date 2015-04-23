angular.module('common.directives.autoComplete', [])
   .directive('imAutoComplete', ['configService', '$q', function (configService, $q) {

      function postLink($scope, element, attrs, ngModel) {
         $scope.onSelect = function (item) {
            $scope.item = item;
            $scope.selected = item.key;
            //  $scope.myCall({ item: item });
         };

         $scope.$watch('selected', function (value) {
            var data = { "key": value };
            if (typeof (value) != "undefined"
               && value != null
               && value != "" &&
               $scope.item && $scope.item.key
               && $scope.item.key == value)
               data = $scope.item;
            $scope.myCall({ "item": data });
         });
         $scope.items = [];

         $scope.getItems = function (keyword) {
            var method = attrs.method;
            return configService[method](keyword);

         };
      }

      return {
         replace: true,
         restrict: 'A',
         templateUrl: "template/autoComplete.tpl.html",
         link: postLink,
         //  require: '?ngModel',
         scope: {
            selected: '=source',
            myCall: "&updateCallback"
         }
      };
   }]).run(function ($templateCache) {
      $templateCache.put('template/autoComplete.tpl.html',
         "<input type=\"text\" ng-model=\"selected\" typeahead-on-select=\"onSelect($item)\"   typeahead=\"state.fullDescription for state in getItems($viewValue)\">"
      );
   });


