angular.module('common.directives.tinyTable', [])
    .directive('tinyTable', function () {
       return {
          restrict: 'A',
          templateUrl: 'common/tinyTable/tinyTable.tpl.html',
          replace: true,


          scope: {
             items: '=mySource',
             columns: "=columns"
          },

          link: link

       };
       function link($scope, element, attrs) {

          $scope.goToPage = function (arr, index) {
             if (typeof (index) != "undefined" && (index < 1 || index == $scope.index || index > $scope.pageCount))
                return;
             if (typeof (index) == "undefined")
                index = 1;
             $scope.index = index;
             var start = $scope.size * ($scope.index - 1);
             var end = $scope.size * ($scope.index) - 1;
             if (end > $scope.total - 1) end = $scope.total;
             for (var i = 0; i < $scope.total; i++) {
                if (i >= start && i <= end)
                   arr[i].show = true;
                else
                   arr[i].show = false;
             }






          };
          $scope.index = 1;
          $scope.pages = [];
          $scope.total = 0;
          $scope.pageCount = 1;
          $scope.size = 5;

          $scope.$watchCollection(
          "items",
             function (newItems) {

                if (newItems.length > 0) {
                   $scope.index = 1;
                   $scope.total = newItems.length;
                   $scope.pageCount = parseInt(($scope.total - 1) / $scope.size) + 1;

                   $scope.pages = [];
                   for (var j = 1; j <= $scope.pageCount; j++) {
                      $scope.pages.push(j);
                   }

                } else {
                   $scope.index = 1;
                   $scope.pages = [];
                   $scope.total = 0;
                   $scope.pageCount = 1;

                }

                $scope.goToPage(newItems);
             }
          );



          $scope.isSingle = attrs.selectMode === "single";
          $scope.type = (attrs.selectMode === "single") ? "radio" : "checkbox";


          $scope.select = function (item) {


             if ($scope.isSingle) {
                $scope.items.forEach(
                   function (temp) {
                      temp.checked = false;
                   }
                );
                item.checked = true;
             } else {
                if (typeof (item.checked) == "undefined")
                   item.checked = false;
                item.checked = !item.checked;


             }
             
             $scope.$emit("selectionChange", item);
            
          };

       }

    });
