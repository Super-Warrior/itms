angular.module('itms')
    .controller('shellCtrl', ['$rootScope', '$state', 'auth', 'identity', "config", 'common',
        function ($rootScope, $state, auth, identity, config, common) {
           var userTypes = {
              "1": "管理员",
              "2": "海通业务员",
              "3": "合作伙伴"
           };
           $rootScope.logout = function () {
              $rootScope.currentUser = undefined;
              identity.currentUser = undefined;
              window.location.reload(true);
              //  $state.go('app.login');
           };

           $rootScope.askLogout = function () {
              common.messageBox({
                 title: "提示信息:",
                 content: "是否退出系统?"
              }).success($rootScope.logout)
                  .error(function () { });
           };



           $rootScope.refreshPage = function () {
              window.location.reload(true);
           };
           $rootScope.isLoginRequired = auth.isLoginRequired;
           $rootScope.currentUser = identity.currentUser;

           if (identity.currentUser) {
              $rootScope.currentUser.displayName = identity.currentUser.lastName + identity.currentUser.fisrtName;
              $rootScope.currentUser.userType = userTypes[identity.currentUser.userType];
              config.userID = identity.currentUser.userID;
           }
           $rootScope.$on('$stateChangeSuccess',
               function (event, toState, toParams, fromState, fromParams) {
                  $rootScope.paths = [];
                  getPath(toState);
                  if (toState.name && toState.name != "app.login")
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
                 $this.removeClass('active');
              }
              $this.next('.ajax-dropdown').find('.btn-group > .active > input').attr('id');
              e.preventDefault();
           });


           var lastState = getLastState();


           if (auth.isLoginRequired()) {
              if (!($state.current && $state.current.name && $state.current.name === 'app.login'))
                 $state.go('app.login');
           }
           else if (lastState) {
              if (lastState == 'app.login')
                 $state.go("app.user.dashboard");
              else
                 $state.go(lastState);
           }
        }
    ]);
