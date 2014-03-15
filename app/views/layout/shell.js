(function() {
    'use strict'

    angular.module('itmsApp').controller('shellCtrl', function($rootScope) {

        drawBreadCrumb();
        $rootScope.$on('$routeChangeStart',
            function(event, current, previous) {
                console.log('rout change start');
                drawBreadCrumb();
                // update title with breadcrumb...
                document.title = $(".breadcrumb li:last-child").text();
            });

        $.menu_speed = 235;

        nav_page_height();
        $('nav ul').jarvismenu({
            accordion: true,
            speed: $.menu_speed,
            closedSign: '<em class="fa fa-expand-o"></em>',
            openedSign: '<em class="fa fa-collapse-o"></em>'
        });

        $('#main').resize(function() {
            nav_page_height();
            //check_if_mobile_width();
        });

        $('nav').resize(function() {
            nav_page_height();
        });

        // COLLAPSE LEFT NAV
        $('.minifyme').click(function (e) {
            $('body').toggleClass("minified");
            $(this).effect("highlight", {}, 500);
            e.preventDefault();
        });

        // HIDE MENU
        $('#hide-menu >:first-child > a').click(function (e) {
            $('body').toggleClass("hidden-menu");
            e.preventDefault();
        });

        $('#show-shortcut').click(function (e) {
            if ($.shortcut_dropdown.is(":visible")) {
                shortcut_buttons_hide();
            } else {
                shortcut_buttons_show();
            }
            e.preventDefault();
        });

        $('#activity').click(function (e) {
            var $this = $(this);

            if ($this.find('.badge').hasClass('bg-color-red')) {
                $this.find('.badge').removeClassPrefix('bg-color-');
                $this.find('.badge').text("0");
                // console.log("Ajax call for activity")
            }

            if (!$this.next('.ajax-dropdown').is(':visible')) {
                $this.next('.ajax-dropdown').fadeIn(150);
                $this.addClass('active');
            } else {
                $this.next('.ajax-dropdown').fadeOut(150);
                $this.removeClass('active')
            }

            var mytest = $this.next('.ajax-dropdown').find('.btn-group > .active > input').attr('id');
            //console.log(mytest)

            e.preventDefault();
        });

        $('#show-shortcut').click(function (e) {
            if ($.shortcut_dropdown.is(":visible")) {
                shortcut_buttons_hide();
            } else {
                shortcut_buttons_show();
            }
            e.preventDefault();
        });



    });

}());
