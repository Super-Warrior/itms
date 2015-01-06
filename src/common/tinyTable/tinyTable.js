angular.module('common.directives.tinyTable', [])
    .directive('tinyTable', function () {
       return {
          restrict: 'A',
          templateUrl: 'common/tinyTable/tinyTable.tpl.html',
          replace: true,
          items: '=mySource',
          columns: "=columns",
          link: link

       };
       function link($scope, element, attrs) {
          $scope.type = (attrs.selectMode === "single") ? "radio" : "checkbox";
          //  { title: "国家", field: "country" },

       }

    });
