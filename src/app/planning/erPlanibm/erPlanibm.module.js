angular
    .module("itms.planning.erPlanibm", [
        "ui.router",
        "ui.bootstrap",
        "itms.planning.common"
    ])
   .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
         .state("app.user.planning.erPlanibm", {
             "url": "/erPlan",
            "data": {
               displayName: "资源计划"
            },
            "views": {
               "@app.user": {
                   templateUrl: "app/planning/erPlanibm/erPlanibm.tpl.html",
                   controller: "erPlanibmCtrl"
               }
            }
         });
   }]);
