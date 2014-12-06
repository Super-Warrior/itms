angular.module('itms')
    .controller('shellCtrl', ['$rootScope', '$state', 'auth','identity',
        function ($rootScope, $state, auth,identity) {

            $rootScope.isLoginRequired = auth.isLoginRequired;
            $rootScope.currentUser = identity.currentUser;

            if( identity.currentUser)
                $rootScope.currentUser.displayName = identity.currentUser.fisrtName+', '+ identity.currentUser.lastName;

            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.paths = [];
                    getPath(toState);
                    saveLastState(toState.name);
                }
            );

            function getLastState() {
                if (window.localStorage) {
                    return localStorage['lastState'];
                }
                return null;
            }

            function getPath(state) {
                var parent;
                state.data && $rootScope.paths.unshift({
                    state: state.name,
                    displayName: state.data.displayName
                });
                if (state.name.indexOf('.') > 0) {
                    parent = state.name.split('.')[0];
                    getPath($rootScope.$state.get(parent));
                }
            }

            function saveLastState(state) {
                if (window.localStorage) {
                    localStorage['lastState'] = state;
                }
            }

            $('#activity').click(function (e) {
                var $this = $(this);

                if ($this.find('.badge').hasClass('bg-color-red')) {
                    $this.find('.badge').removeClassPrefix('bg-color-');
                    $this.find('.badge').text("0");
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


            var lastState = getLastState();
           

            if (auth.isLoginRequired()) {
                $state.go('app.login');
            }
            else if (lastState) {
                $state.go(lastState);
            }
        }
    ]);
