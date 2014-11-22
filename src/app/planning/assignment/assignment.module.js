angular
  .module("itms.planning.assignment", [
    "ui.router",
    "ui.bootstrap",
    "itms.planning.common"
  ])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("app.user.planning.assignment", {
        "url": "/assignment",
        "data": {
          displayName: "需求分配"
        },
        "views": {
          "@app.user": {
            templateUrl: "app/planning/assignment/assignment.tpl.html",
            controller: "EOAssignCtrl"
          }
        }

        //,
        //resolve: {
        //   transportTypes: ["configService", function (configService) {
        //      return configService.getConfig("transport");
        //   }],
        //   eoTypes: ["configService", function (configService) {
        //      return configService.getConfig("eo");
        //   }],
        //   tags: ["configService", function (configService) {
        //      return configService.getConfig("tag");
        //   }],
        //   carriers: ["customerService",
        //      function (customerService) {
        //         return customerService.searchCustomer("car");
        //      }],

        //   nets: ["customerService",
        //      function (customerService) {
        //         return customerService.searchCustomer("net");
        //      }]
        //}

      });
  }]);
