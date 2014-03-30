angular.module('common.directives.breadcrumb', [])
    .directive('swBreadcrumb', function() {
        return {
            restrict: 'A',
            templateUrl: 'template/breadcrumb.tpl.html',
            replace: true
        };

    }).run(function($templateCache) {
        $templateCache.put('template/breadcrumb.tpl.html',
            '<ol class="breadcrumb">\n' +
            '  <li ng-repeat="path in paths"><a data-ui-sref="{{path.state}}">{{path.displayName}}</a></li>\n' +
            '</ol>'
            );
    });
