angular.module('common.directives.menu', [])
    .directive('swMenu', function () {
        return {
            restrict: 'A',
            templateUrl: 'common/menu/menu.tpl.html',
            replace: true,
            link: link

        };

        function link (scope, element, attrs){
            $.menu_speed = 235;
            $.navbar_height = 49;
            $.root_ = $('body');
            $.left_panel = $('#left-panel');
            $.shortcut_dropdown = $('#shortcut');
            nav_page_height();
            $('nav ul').jarvismenu({
                accordion: true,
                speed: $.menu_speed,
                closedSign: '<em class="fa fa-plus-square-o"></em>',
                openedSign: '<em class="fa fa-minus-square-o"></em>'
            });

            $('#main').resize(function() {
                nav_page_height();
                //check_if_mobile_width();
            });

            $('nav').resize(function() {
                nav_page_height();
            });

            // COLLAPSE LEFT NAV
            $('.minifyme').click(function(e) {
                $('body').toggleClass("minified");
                $(this).effect("highlight", {}, 500);
                e.preventDefault();
            });

            // HIDE MENU
            $('#hide-menu >:first-child > a').click(function(e) {
                $('body').toggleClass("hidden-menu");
                e.preventDefault();
            });

            $('#show-shortcut').click(function(e) {
                if ($.shortcut_dropdown.is(":visible")) {
                    shortcut_buttons_hide();
                } else {
                    shortcut_buttons_show();
                }
                e.preventDefault();
            });
            $.shortcut_dropdown.click(function(){
                shortcut_buttons_hide();
            });
        }

    });
