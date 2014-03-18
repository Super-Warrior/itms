(function () {
    'use strict'

    // todo: will be moved to it's own module which is common module
    var commonDirectives = angular.module('common.directives', []);

    commonDirectives.directive('itJarvis', function () {

        var defaultOptions = {
            grid: 'article',
            widgets: '.jarviswidget',
            localStorage: true,
            deleteSettingsKey: '#deletesettingskey-options',
            settingsKeyLabel: 'Reset settings?',
            deletePositionKey: '#deletepositionkey-options',
            positionKeyLabel: 'Reset position?',
            sortable: true,
            buttonsHidden: false,
            // toggle button
            toggleButton: true,
            toggleClass: 'fa fa-minus | fa fa-plus',
            toggleSpeed: 200,
            onToggle: function () {
            },
            // delete btn
            deleteButton: true,
            deleteClass: 'fa fa-times',
            deleteSpeed: 200,
//            onDelete: function () {
//            },
            // edit btn
            editButton: true,
            editPlaceholder: '.jarviswidget-editbox',
            editClass: 'fa fa-cog | fa fa-save',
            editSpeed: 200,
//            onEdit: function () {
//            },
            // color button
            colorButton: true,
            // full screen
            fullscreenButton: true,
            fullscreenClass: 'fa fa-expand | fa fa-compress',
            fullscreenDiff: 3,
//            onFullscreen: function () {
//            },
            // custom btn
            customButton: false,
            customClass: 'folder-10 | next-10',
//            customStart: function () {
//                alert('Hello you, this is a custom button...')
//            },
//            customEnd: function () {
//                alert('bye, till next time...')
//            },
            // order
            buttonOrder: '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
            opacity: 1.0,
            dragHandle: '> header',
            placeholderClass: 'jarviswidget-placeholder',
            indicator: true,
            indicatorTime: 600,
            ajax: true,
            timestampPlaceholder: '.jarviswidget-timestamp',
            timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
            refreshButton: true,
            refreshButtonClass: 'fa fa-refresh',
            labelError: 'Sorry but there was a error:',
            labelUpdated: 'Last Update:',
            labelRefresh: 'Refresh',
            labelDelete: 'Delete widget:',
//            afterLoad: function () {
//            },
            rtl: false, // best not to toggle this!
//            onChange: function () {
//
//            },
//            onSave: function () {
//
//            },
            ajaxnav: $.navAsAjax // declears how the localstorage should be saved
        };

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.jarvisWidgets(defaultOptions);
            }
        }
    });

    commonDirectives.directive('itTable', function ($timeout) {
        return {
            'restrict': 'A',
            link: function (scope, elm, attrs) {
                var $el = $(elm[0]);
                //todo: trick work arount, this will be refactor later
                $timeout(function () {
                    $el.dataTable({
                        "sPaginationType": "bootstrap",
                        "sDom": "R<'dt-top-row'Clf>r<'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-6'i><'col-sm-6 text-right'p>>",
                        "fnInitComplete": function () {
                            $('.ColVis_Button').addClass('btn btn-default btn-sm').html('Columns <i class="icon-arrow-down"></i>');
                        }
                    });
                }, 1000);
            }
        }
    });

    /* usage
     *  <div data-im-table header-titles="columns" my-source="orders" select-all=true></div>
     * */
    commonDirectives.directive('imTable', function () {

        var settings = {},
            table;

        return {
            restrict: 'A',
            replace: true,
            scope: {
                headerTitles: "=headerTitles",
                dataSource: "=mySource",
                selectAll: "@selectAll",
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
                "aoColumns": scope.headerTitles,
                "aaData": scope.dataSource,
                "sDom": "R<'dt-top-row'Clf>r<'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-6'i><'col-sm-6 text-right'p>>",
                "fnInitComplete": function (oSettings, json) {
                    $('.ColVis_Button').addClass('btn btn-default btn-sm').html('Columns <i class="icon-arrow-down"></i>');
                }
            };
            setWatchOnTheSource(scope, element);
        }

        function initilizeTable(source, element, scope) {
            settings.aaData = source;
            settings.aoColumns.unshift({"sTitle": "<input type='checkbox' id='selectAll'/>", "mData": null, "sDefaultContent": "<input type='checkbox'/>", "bSortable": false});

            source.forEach(function (element, index) {
                element['_rowId'] = +((new Date).getTime()) + index;
            });
            table = element.dataTable(settings);
            bindEventHandler(scope, table);
        }

        function bindEventHandler(scope, table) {
            // check if has select all set
            table.find('#selectAll').click(function () {
                var that = this;
                table.find('tbody input[type="checkbox"]').each(function (index, element) {
                    if ($(that).is(":checked")) {
                        $(element).prop("checked", true);
                    } else {
                        $(element).prop("checked", false);
                    }
                });
            });

            table.on('click', 'tbody tr', function (e) {
                var selectedRow = this,
                    rowData = table.fnGetData(this),
                    $checkBox = $(selectedRow).find('input[type="checkbox"]');

                scope.$apply(function () {
                    if (isRowSelected(selectedRow)) {
                        $checkBox.prop("checked", false);
                        $(selectedRow).removeClass('highlight');
                        scope.selectedItems.splice(getRowIndex(selectedRow), 1);
                    } else {
                        $checkBox.prop("checked", true);
                        rowData._rowId = selectedRow._DT_RowIndex;
                        $(selectedRow).addClass('highlight');
                        scope.selectedItems.push(rowData);
                    }
//                    //when user click check box directly
//                    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
//                        if ($checkBox.is(':checked')) {
//                            scope.selectedItems.push({
//                                rowId: selectedRow._DT_RowIndex,
//                                value: rowData
//                            });
//                        } else {
//                            removeSelectedItemByRowId(selectedRow._DT_RowIndex);
//                        }
//                    } else if (e.target instanceof HTMLTableCellElement) { //when user clicked on the row toggle the click on checkbox
//                        if ($checkBox.is(":checked")) {
//                            $checkBox.prop("checked", false);
//                            removeSelectedItemByRowId(selectedRow._DT_RowIndex);
//                        } else {
//                            $checkBox.prop("checked", true);
//                            scope.selectedItems.push({
//                                rowId: selectedRow._DT_RowIndex,
//                                value: rowData
//                            });
//                        }
//                    }

                });
            });

            function isRowSelected(row) {
                return scope.selectedItems.some(checkItem);
                function checkItem(item) {
                    if (item._rowId === row._DT_RowIndex) {
                        return true;
                    }
                }
            }

            function getRowIndex(row) {
                var rowIndex;
                scope.selectedItems.forEach(function(item, index){
                    if (item._rowId === row._DT_RowIndex) {
                        rowIndex = index;
                    }
                });
                return rowIndex;
            }

//            table.on('click', 'tbody input[type="checkbox"]', function () {
//                var selectedRow = $(this).parent().parent().get(0);
//                var rowData = table.fnGetData($(this).parent().parent().get(0));
//                var $that = $(this);
//                scope.$apply(function () {
//                    var obj = scope.dataSource.filter(function (element) {
//                        return element["_rowId"] === row["_rowId"];
//                    });
//                    if ($that.is(":checked")) {
//                        obj.forEach(function (element) {
//                            element["selected"] = true;
//                        })
//                    } else {
//                        obj.forEach(function (element) {
//                            element["selected"] = false;
//                        })
//                    }
//                });
//            });

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
                        //  _resetSelected(scope);
                        refreshData(source);
                    }
                });
            }
        }

        function refreshData(source) {
            table.fnClearTable(false);
//            source.forEach(function (element, index) {
//                element['_rowId'] = +((new Date).getTime()) + index;
//            });
            source && table.fnAddData(source);
            table.fnDraw();
        }

        /*function _resetSelected(scope) {
         scope.dataSource.forEach(function (element) {
         element.selected = false;
         });
         }*/
    });

    commonDirectives.directive('imDatepicker', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {

            },
            link: postLink
        };

        function postLink(scope, element, attrs, ngModel) {
            element.datepicker({
                dateFormat: 'yy-mm-dd',
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>'
            });
        }
    });

    commonDirectives.directive('swWidget', function () {

        var defaultOptions = {
            grid: 'article',
            widgets: '.jarviswidget',
            localStorage: true,
            deleteSettingsKey: '#deletesettingskey-options',
            settingsKeyLabel: 'Reset settings?',
            deletePositionKey: '#deletepositionkey-options',
            positionKeyLabel: 'Reset position?',
            sortable: true,
            buttonsHidden: false,
            // toggle button
            toggleButton: true,
            toggleClass: 'fa fa-minus | fa fa-plus',
            toggleSpeed: 200,
            onToggle: function () {
            },
            // delete btn
            deleteButton: true,
            deleteClass: 'fa fa-times',
            deleteSpeed: 200,
//            onDelete: function () {
//            },
            // edit btn
            editButton: true,
            editPlaceholder: '.jarviswidget-editbox',
            editClass: 'fa fa-cog | fa fa-save',
            editSpeed: 200,
//            onEdit: function () {
//            },
            // color button
            colorButton: true,
            // full screen
            fullscreenButton: true,
            fullscreenClass: 'fa fa-resize-full | fa fa-resize-small',
            fullscreenDiff: 3,
//            onFullscreen: function () {
//            },
            // custom btn
            customButton: false,
            customClass: 'folder-10 | next-10',
//            customStart: function () {
//                alert('Hello you, this is a custom button...')
//            },
//            customEnd: function () {
//                alert('bye, till next time...')
//            },
            // order
            buttonOrder: '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
            opacity: 1.0,
            dragHandle: '> header',
            placeholderClass: 'jarviswidget-placeholder',
            indicator: true,
            indicatorTime: 600,
            ajax: true,
            timestampPlaceholder: '.jarviswidget-timestamp',
            timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
            refreshButton: true,
            refreshButtonClass: 'fa fa-refresh',
            labelError: 'Sorry but there was a error:',
            labelUpdated: 'Last Update:',
            labelRefresh: 'Refresh',
            labelDelete: 'Delete widget:',
//            afterLoad: function () {
//            },
            rtl: false, // best not to toggle this!
//            onChange: function () {
//
//            },
//            onSave: function () {
//
//            },
            ajaxnav: $.navAsAjax // declears how the localstorage should be saved
        };

        return {
            restrict: 'A',
            scope: {

            },
            transclude: true,
            templateUrl: 'views/shared/swwidge.html',
            link: function (scope, element, attrs) {
                element.jarvisWidgets(defaultOptions);
            }
        }
    });
}());