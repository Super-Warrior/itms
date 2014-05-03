﻿angular.module('common.directives.table', [])
/* usage
     *  <div data-im-table header-titles="columns" my-source="orders" detail-config="config" can-select></div>
     optional attributes:can-select
     optional attributes: detailConfig
     * */
.directive('imTable', function ($modal) {

   var settings = {},
       table;

   return {
      restrict: 'A',
      replace: true,
      scope: {
         headerTitles: "=headerTitles",
         dataSource: "=mySource",
         canSelect: "@canSelect",
         detailConfig: "=detailConfig",
         selectedItems: "=selectedItems"
      },
      template: '<table class="table table-striped table-hover"></table>',
      link: postLink
   };

   function postLink(scope, element, attrs) {
      scope.clickAll = function () {
         console.log('click all');
      };
      settings = {
         aoColumns: scope.headerTitles,
         aaData: scope.dataSource,
         sDom: "R<'dt-top-row'Clf>r<'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-6'i><'col-sm-6 text-right'p>>",
         fnInitComplete: function (oSettings, json) {
            $('.ColVis_Button')
                .addClass('btn btn-default btn-sm')
                .html('Columns <i class="icon-arrow-down"></i>');
         }
      };
      setWatchOnTheSource(scope, element);
   }

   function initilizeTable(source, element, scope) {
      var canSelect = ((typeof element.attr("can-select")) !== "undefined");
      settings.aaData = source;

      if (scope.detailConfig) {
         var content = [];
         if (scope.detailConfig.erDetail)
            content.push( '<a href="javascript:void(0)" template="erDetail.tpl.html"><i class="fa fa-truck"></i></a>');
         if (scope.detailConfig.eoDetail)
            content.push( '<a href="javascript:void(0)" template="eoDetail.tpl.html"><i class="fa fa-inbox"></i></a>');
         if (scope.detailConfig.timeLine)
            content.push('<a href="javascript:void(0)" template="timeLine.tpl.html"><i class="fa fa-clock-o"></i></a>');
         settings.aoColumns.push({
            sTitle: "&nbsp;明细&nbsp;",
            mData: null,
            sDefaultContent: content.join("&nbsp;"),
            bSortable: false
         });
      }

      if (canSelect)
         settings.aoColumns.unshift({
            sTitle: "<input type='checkbox' id='selectAll'>",
            mData: null,
            sDefaultContent: "<input type='checkbox'>",
            bSortable: false
         });
      table = element.dataTable(settings);
      bindEventHandler(scope, table);
   }

   function bindEventHandler(scope, t) {
      // check if has select all set
      t.find('#selectAll').click(function () {
         var that = this;
         t.find('tbody input[type="checkbox"]').each(function (index, element) {
            if ($(that).is(":checked")) {
               if (!$(element).is(':checked')) {
                  $(element).trigger('click');
               }
            } else {
               if ($(element).is(':checked')) {
                  $(element).trigger('click');
               }
            }
         });
      });

      if (scope.detailConfig) {
         t.on('click', 'tbody tr a', function (e) {
            var target = "app/planning/detail/" + $(e.target).parent().attr("template");
            var modalInstance = $modal.open({
               templateUrl: target
            });
            e.preventDefault();
            return false;
         });
      }

      if (typeof scope.canSelect !== "undefined") {
         t.on('click', 'tbody tr', function (e) {
            var selectedRow = this,
                rowData = t.fnGetData(this),
                $checkBox = $(selectedRow).find('input[type="checkbox"]');

            scope.$apply(function () {
               if (isRowSelected(selectedRow)) {
                  $checkBox.prop("checked", false);
                  $(selectedRow).removeClass('highlight');
                  _.remove(scope.selectedItems, function (item) {
                     return item._rowId === selectedRow._DT_RowIndex;
                  });
               } else {
                  $checkBox.prop("checked", true);
                  rowData._rowId = selectedRow._DT_RowIndex;
                  $(selectedRow).addClass('highlight');
                  scope.selectedItems.push(rowData);
               }
            });

            function isRowSelected(row) {
               return scope.selectedItems.some(function (item) {
                  if (item._rowId === row._DT_RowIndex) {
                     return true;
                  }
               });
            }
         });
      }
   }

   function setWatchOnTheSource(scope, element) {
      var isInitilize = true,
          dataSource = scope.dataSource;
      if (dataSource) {
         scope.$watch("dataSource", function (source) {
            if (isInitilize && source && source.length > 0) {
               initilizeTable(source, element, scope);
               isInitilize = false;
            } else if (!isInitilize) {
               refreshData(source);
            }
         });
      }
   }

   function refreshData(source) {
      table.fnClearTable(false);
      source && table.fnAddData(source);
      table.fnDraw();
   }
});
