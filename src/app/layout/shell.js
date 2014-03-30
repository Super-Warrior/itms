angular.module('itms').controller('shellCtrl', function($rootScope) {

    $.menu_speed = 235;
    $.navbar_height = 49;
    $.root_ = $('body');
    $.left_panel = $('#left-panel');
    $.shortcut_dropdown = $('#shortcut');

    //to generate breadcrumb,

    drawBreadCrumb();
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            $rootScope.paths = [];
            console.log(toState);
            getPath(toState);
        }
    );

    function getPath(state) {
        var parent;
        $rootScope.paths.unshift({
            state: state.name,
            displayName: state.data.displayName
        });
        if (state.name.indexOf('.') > 0) {
            parent = state.name.split('.')[0];
            getPath($rootScope.$state.get(parent));
        }
    }

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

    $('#activity').click(function(e) {
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
        $this.next('.ajax-dropdown').find('.btn-group > .active > input').attr('id');
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
});
