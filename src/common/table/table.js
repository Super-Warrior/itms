angular.module('common.directives.table', [])
/* usage
     *  <div data-im-table header-titles="columns" my-source="orders" detail-target="app/planning/searchSite.tpl.html" can-select></div>
     optional attributes:can-select
     optional attributes: detailTarget
     * */
.directive('imTable', function($modal) {

    var settings = {},
        table;

    return {
        restrict: 'A',
        replace: true,
        scope: {
            headerTitles: "=headerTitles",
            dataSource: "=mySource",
            canSelect: "@canSelect",
            detailTarget: "@detailTarget",
            selectedItems: "=selectedItems"
        },
        template: '<table class="table table-striped table-hover"></table>',
        link: postLink
    };

    function postLink(scope, element, attrs) {
        scope.clickAll = function() {
            console.log('click all');
        };
        settings = {
            aoColumns: scope.headerTitles,
            aaData: scope.dataSource,
            sDom: "R<'dt-top-row'Clf>r<'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-6'i><'col-sm-6 text-right'p>>",
            fnInitComplete: function(oSettings, json) {
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
        if (scope.detailTarget)
            settings.aoColumns.unshift({
                sTitle: "<i class='fa fa-search'></i>",
                mData: null,
                sDefaultContent: "<a href='#'><i class='fa fa-search'></i></a>",
                bSortable: false
            });

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
        t.find('#selectAll').click(function() {
            var that = this;
            t.find('tbody input[type="checkbox"]').each(function(index, element) {
                if ($(that).is(":checked")) {
                    if(!$(element).is(':checked')){
                        $(element).trigger('click');
                    }
                } else {
                    if($(element).is(':checked')){
                        $(element).trigger('click');
                    }
                }
            });
        });

        if (scope.detailTarget) {
            t.on('click', 'tbody tr a', function(e) {
                var modalInstance = $modal.open({
                    templateUrl: scope.detailTarget
                });
                e.preventDefault();
                return false;
            });
        }

        if (typeof scope.canSelect !== "undefined") {
            t.on('click', 'tbody tr', function(e) {
                var selectedRow = this,
                    rowData = t.fnGetData(this),
                    $checkBox = $(selectedRow).find('input[type="checkbox"]');

                scope.$apply(function() {
                    if (isRowSelected(selectedRow)) {
                        $checkBox.prop("checked", false);
                        $(selectedRow).removeClass('highlight');
                        _.remove(scope.selectedItems, function(item) {
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
                    return scope.selectedItems.some(function(item) {
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
            scope.$watch("dataSource", function(source) {
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
