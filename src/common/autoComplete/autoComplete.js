angular.module('common.directives.autoComplete', [])
   .directive('imAutoComplete', ['configService', '$q', function (configService, $q) {

      function postLink($scope, element, attrs, ngModel) {
         $scope.onSelect = function (item) {
            $scope.selected = item.key;
            //  $scope.myCall({ item: item });
         };

         $scope.$watch('selected', function () {

            $scope.myCall({ "value": $scope.selected });
         });
         $scope.items = [];
         $scope.getItems = function (keyword) {
            var mapFun = function (tempItem) {
               return {
                  "key": tempItem.matnr,
                  "description": tempItem.description,
                  "fullDescription": $.trim(tempItem.description) + "(" + tempItem.matnr + ")"
               };
            };
            var dfd = $q.defer();

            configService.searchMaterial(keyword, "TRES").then(
               function (result) {
                  var items = angular.isArray(result.data) ? result.data : [];
                  items = items.map(mapFun);
                  $scope.items = items;
                  dfd.resolve(items);
               }
            );

            return dfd.promise;
         };

         console.log(ngModel);
         //   $scope.selected = $scope.source;


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


