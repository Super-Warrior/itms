angular.module('common.directives.datepicker', [])
    .directive('imDatepicker', function () {
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
