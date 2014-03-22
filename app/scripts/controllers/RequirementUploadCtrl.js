;
(function () {
   "use strict";
   angular.module("itmsApp").controller("RequirementUploadCtrl",
       ["$scope", "config", "$compile", "$modal", "$log", "common", requirementUploadCtrl]);

   function requirementUploadCtrl($scope, config, $compile, $modal, $log, common) {
      $scope.module = "需求管理";
      $scope.title = "站点上载";

      $scope.selectFile = function (element) {
         $("#fileDisplay").val($(element).val());
      };
      $scope.showMessage = function (msg) {
         $.smallBox({
            title: "操作回执",
            content: "<i class='fa fa-clock-o'></i>" + msg,
            color: "#659265",
            iconSmall: "fa fa-check fa-2x fadeInRight animated",
            timeout: 4000
         });
      };
      $scope.getExtName = function (name) {
         var index = name.lastIndexOf(".");
         if (index < 0)
            return "";
         var extName = name.substring(index + 1).toLowerCase();
         return extName;
      };

      $scope.updateTable = function (data) {
         $scope.previewData = data;
         $("#datatable_col_reorder_wrapper").remove();

         var table =
            '<table id="datatable_col_reorder" class="table table-striped table-hover">' +
               '<thead>' +
               '<tr>' +
               '<th><i class="fa fa-search"></i></th>' +
               '<th>类型</th>' +
               '<th>客户订单号</th>' +
               '<th>ERITN</th>' +
               '<th>物料描述</th>' +
               '<th>数量</th>' +
               '<th>箱号</th>' +
               '<th>客户名称</th>' +
               '<th>客户运单号</th>' +
               '<th>客户出库号</th>' +
               '<th>收货地</th>' +
               '<th>目的地</th>' +
               '<th>要求到达日期</th>' +
               '</tr>' +
               '</thead>' +
               '<tbody>' +
               '<tr ng-repeat="item in previewData.list">' +
               '<td><a href="javascript:void(0);" data-target="#ERTemp" data-toggle="modal"><i class="fa fa-search"></i></a></td>' +
               '<td>{{item.erType}}</td>' +
               '<td>{{item.id.customerOrder1}}</td>' +
               '<td>{{item.id.erITN}}</td>' +
               '<td>{{item.matIID}}</td>' +
               '<td>{{item.amt}}</td>' +
               '<td>{{item.packNum}}</td>' +
               '<td>{{item.depAreaCode}}</td>' +
               '<td>{{item.customerOrder2}}</td>' +
               '<td>{{item.customerOrder3}}</td>' +
               '<td>{{item.depCustomer}}</td>' +
               '<td>{{item.recLocCode}}</td>' +
               '<td>{{item.reqDelDate}}</td>' +
               '</tr>' +
               '</tbody>' +
               '</table>';

         $compile(table)($scope, function (clonedElement) {
            $("#tableWidget").append(clonedElement);
         });
         try {
            $scope.$apply();
         } catch (e) {
         }
         $('#datatable_col_reorder').dataTable({
            "sPaginationType": "bootstrap",
            "sDom": "R<'dt-top-row'Clf>r<'dt-wrapper't><'dt-row dt-bottom-row'<'row'<'col-sm-6'i><'col-sm-6 text-right'p>>",
            "fnInitComplete": function (oSettings, json) {
               $('.ColVis_Button').addClass('btn btn-default btn-sm').html('Columns <i class="icon-arrow-down"></i>');
            }
         });
      };
      $scope.validate = function () {
         var ele = $("#fileUpload")[0];
         if (!ele.files
             || !ele.files[0])
            return "请选择上传文件。";
         var file = ele.files[0];

         if (file.size > 2000000)
            return "文件太大。";
         var extName = $scope.getExtName(file.name);
         if (extName != "xls" && extName != "xlsx")
            return "文件类型错误。";
      };
      $scope.handleUpload = function () {
         var msg = $scope.validate();
         if (msg) {

            common.messageBox({
               title: "错误信息:",
               content: msg,
               cancel: "取消"
            });

         } else {
            // $('#checkout-form')[0].action = route.upload;
            $("#type").val($scope.getExtName($("#fileUpload")[0].files[0].name));
            var submitData = {
               type: 'post',
               dataType: "",
               url: config.baseUrl + "ER/Upload",
               success: function (data) {
                  alert(data);
                  var re1 = />-</gi;
                  data = data.replace(re1, '');

                  var re2 = /<[^>]+>/gi;
                  data = data.replace(re2, '');

                  var result = JSON.parse(data);
                  $scope.updateTable(result);
                  if (result && result.key) {
                     $scope.showMessage("上载内容已成功");
                     $scope.hasUploaded = true;
                     $scope.expandTable();
                  } else {

                     $scope.hasUploaded = false;
                  }

               },
               error: function () {
                  alert("error");
               }
            };
            $('#checkout-form').ajaxSubmit(submitData);
         }
      };
      $scope.previewData = {
         "key": null,
         "list": []
      };
      $scope.showData = function () {
         alert(JSON.stringify($scope.previewData));
      };

      $scope.confirm = function () {
         if (!$scope.hasUploaded)
            return false;
         var data =
         {
            "userID": $("#userID").val(),
            "KEY": $scope.previewData.key,
         };
         $.ajax({
            type: "POST",
            url: route.confirm,
            data: data,
            success: function (result) {
               if (result.errorMessage)
                  $scope.showMessage("上载操作已成功完成");
               $scope.hasUploaded = false;

            },
            dataType: "json"
         });
      };
      $scope.cancel = function () {
         if (!$scope.hasUploaded)
            return false;
         var data =
         {
            "userID": $("#userID").val(),
            "KEY": $scope.previewData.key,
         };
         $.ajax({
            type: "POST",
            url: route.cancel,
            data: data,
            success: function (result) {
               if (result.errorMessage && result.errorMessage == "OK")
                  $scope.showMessage("上载内容已取消");
               $scope.updateTable({
                  "key": null,
                  "list": []
               });
               $scope.hasUploaded = false;

            },
            dataType: "json"
         });

      };
      $scope.hasUploaded = false;
      $scope.expandTable = function () {
         var icon = $("#wid-id-1");
         if (icon.hasClass("jarviswidget-collapsed"))
            icon.find(".jarviswidget-toggle-btn").click();
      };
   }
})();



