angular
    .module('itms.common', [])
    .factory('notifier', function () {

       var defaultOption = {
          timeout: 4000,
          successIcon: "fa fa-check fa-2x fadeInRight animated",
          successColor: "#659265",
          successTitle: "操作成功",
          cancelIcon: "fa fa-times fa-2x fadeInRight animated",
          cancelColor: "#C46A69",
          cancelTitle: "操作取消"
       };

       return {
          success: success,
          cancel: cancel
       };

       function success(message) {
          $.smallBox({
             title: defaultOption.successTitle,
             content: "<i class='fa fa-clock-o'></i> <i> " + message + " </i>",
             color: defaultOption.successColor,
             iconSmall: defaultOption.successIcon,
             timeout: defaultOption.timeout
          });
       }

       function cancel(message) {
          message = message || "操作取消...";
          $.smallBox({
             title: defaultOption.cancelTitle,
             content: "<i class='fa fa-clock-o'></i> <i> " + message + " </i>",
             color: defaultOption.cancelColor,
             iconSmall: defaultOption.cancelIcon,
             //timeout: defaultOption.timeout
          });
       }
    })
    .factory('fileHelper', function () {
       return {
          getExtName: function (name) {
             var index = name.lastIndexOf(".");
             return index < 0 ? "" : name.substring(index + 1).toLowerCase();
          }
       };
    })
    .factory('common', ['$q', 'notifier', 'fileHelper', common])
   .factory('dateTimeHelper', dateTimeHelper);

function dateTimeHelper() {
   var formatDate = function (dt) {
      if (!dt) return "";
      return moment(dt).format("YYYY-MM-DD");
   };
   var formatTime = function (dt) {
      if (!dt) return "";
      return moment(dt).format("hh:mm A");
   };
   var format = function (value, currentFormat, newFormat) {
      if (!value) return "";
      return moment(value, currentFormat).format(newFormat);
   };

   var mergeDateTime = function (date, time, sourceFormat, targetFormat) {
      if (!date) return "";
      if (!time) time = "12:00 AM";
      var dt = date + " " + time;
      sourceFormat = sourceFormat || "YYYY-MM-DD HH:mm A";
      targetFormat = targetFormat || "YYYY-MM-DD HH:mm:ss";
      return moment(dt, sourceFormat).format(targetFormat);
   };
   return {
      formatDate: formatDate,
      formatTime: formatTime,
      mergeDateTime: mergeDateTime,
      format: format
   };
}

function common($q, notifier, fileHelper) {

   return {
      notifier: notifier,
      fileHelper: fileHelper,
      messageBox: messageBox
   };

   function messageBox(option) {
      var confirm = option.confirm,
          cancel = option.cancel;
      if (!confirm && !cancel) {
         confirm = "是";
         cancel = "否";
      }
      var formatButton = function (text) {
         return text ? ("[" + text + "]") : "";
      };
      var defaultOption = {
         buttons: formatButton(cancel) + formatButton(confirm)
      };
      angular.extend(option, defaultOption);
      var deferred = $q.defer();
      $.SmartMessageBox(option, function (selection, value) {
         if (selection === confirm) {
            deferred.resolve(value);
         }
         if (selection === cancel) {
            deferred.reject(value);
         }
      });
      return deferred.promise;
   }


}


angular.module("itms.common")
    .factory("configService", ["$http", "$q", "config", configService])
    .factory("timelineService", ['$http', 'config', timelineService])
    .factory("eoDetailService", ['$http', '$q', 'config', 'dateTimeHelper', 'configService', eoDetailService])
    .factory("exportService", [exportService]);

function exportService() {
   var exportToExcel = function (columns, result) {
      var dataobj = result;
      $("#btnExport").battatech_excelexport({
         containerid: "btnExport"
          , datatype: 'json'
          , dataset: dataobj
          , columns: convertToExportedColumn(columns)
      });
   };
   return {
      "export": exportToExcel
   };
}

function convertToExportedColumn(columns) {
   var result = [];
   columns.forEach(function (value, index) {
      if (index == 0) return false;
      if (value.sTitle == '&nbsp;明细&nbsp;') return false;
      var newItem = { headertext: value.sTitle, datatype: "string", datafield: value.mData, ishidden: false };
      result.push(newItem);
   });
   return result;
}

function configService($http, $q, config) {
   var getEmptyCriteria = function () {

      return {
         "Code": null,
         "ConType": [],
         "Group1": null,
         "Group2": null,
         "Group3": null,
         "Language": ["ZHCN"]
      };
   };


   var criteria = getEmptyCriteria();

   var getConfig = function (type, code, group1, group2) {
      criteria = getEmptyCriteria();
      criteria.ConType = [type];
      if (code) criteria.Code = code;
      if (group1) criteria.Group1 = group1;
      if (group2) criteria.Group2 = group2;
      return $http({
         method: "GET",
         url: config.baseUrl + "Config/ConSearch" + "?" + $.param(criteria),
         dataType: "json"
      });

   };

   var getConfigs = function (configs) {
      var promises = {};
      for (var name in configs) {
         promises[name] = getConfig(name);
      }
      return $q.all(promises).then(
          function (result) {
             for (name in configs) {
                configs[name] = result[name].data;
             }
          });
   };

   var locationAuto = function (type, keyword) {
      var mapFun = function (tempItem) {
         var fields = ["locID", "description", "address1", "address2", "group1", "group2"];
         var text = "";
         for (var k = 0; k < fields.length; k++)
            text += tempItem[fields[k]] + " ";
         return {
            "key": $.trim(tempItem.locID),
            "country": $.trim(tempItem.country),
            "state": $.trim(tempItem.state),
            "city": $.trim(tempItem.city),
            "group1": $.trim(tempItem.group1),
            "fullDescription": $.trim(text)
         };
      };

      var param = { "input": keyword, "type": type };

      var dfd = $q.defer();
      $http({
         method: "GET",
         url: config.baseUrl + "search/LocationAuto" + "?" + $.param(param),
         dataType: "json"
      }).then(
         function (result) {
            var items = angular.isArray(result.data) ? result.data : [];
            items = items.map(mapFun);
            dfd.resolve(items);
         }
      );

      return dfd.promise;
   };

   var customerAuto = function (type, keyword) {
      var mapFun = function (tempItem) {
         var fields = ["customer", "name", "address1", "group1", "group2"];
         var text = "";
         for (var k = 0; k < fields.length; k++) {
            text += tempItem[fields[k]] + " ";
         }
         text = $.trim(text);
         var key = $.trim(tempItem.customer);
         return { "key": key, "fullDescription": text };
      };

      var param = { "input": keyword, "type": type };

      var dfd = $q.defer();
      $http({
         method: "GET",
         url: config.baseUrl + "search/CustomerAuto" + "?" + $.param(param),
         dataType: "json"
      }).then(
         function (result) {
            var items = angular.isArray(result.data) ? result.data : [];
            items = items.map(mapFun);
            dfd.resolve(items);
         }
      );

      return dfd.promise;
   };

   var materialAuto = function (type, keyword) {
      var mapFun = function (tempItem) {
         var fields = ["matnr", "cusMatnr", "description"];
         var text = "";
         for (var k = 0; k < fields.length; k++) {
            text += tempItem[fields[k]] + " ";
         }
         text = $.trim(text);
         var key = $.trim(tempItem.matnr);
         return { "key": key, "fullDescription": text };
      };

      //if (typeof (type) == "undefined" || type == null)
      //    type = "TRES";
      var param = { "input": keyword, "type": type };


      var dfd = $q.defer();
      $http({
         method: "GET",
         url: config.baseUrl + "search/MaterialAuto" + "?" + $.param(param),
         dataType: "json"
      }).then(
         function (result) {
            var items = angular.isArray(result.data) ? result.data : [];
            items = items.map(mapFun);
            dfd.resolve(items);
         }
      );

      return dfd.promise;
   };


   function curry(fn) {

      var args = [];
      for (var i = 1, len = arguments.length; i < len; i++) {
         args.push(arguments[i]);
      }

      return function () {
         var args2 = [];
         for (var j = 0; j < arguments.length; j++) {
            args2.push(arguments[j]);
         }

         var allArgs = [];
         args.forEach(function (item) {
            allArgs.push(item);

         });
         args2.forEach(function (item) {
            allArgs.push(item);
         });
         return fn.apply(window, allArgs);
      };
   }


   var getMaterial = function (option) {
      var param = {
         "SerType": "AND",
         "matnr": [""],
         "type": [],
         "cusmatnr": [""],
         "tag": [""],
         "customer": [""],
         "description": [""],
         "Owner": "",
         "LoadWgt": "",
         "LoadWgtWarning": "",
         "Speed": "",
         "Vol": "",
         "VolWarning": "",
         "SpecialTag1": "",
         "SpecialTag2": "",
         "SpecialTag3": "",
         "PckType": "",
         "Length": "",
         "Width": "",
         "High": "",
         "NetWeight": "",
         "GrossWeight": "",
         "StaQty": "",
         "DefaultPack": "",
         "vendor": "",
         "vendorlocation": "",
      };
      if (option.type)
         param.type.push(option.type);
      else {
         param.type = [""];
      }

      if (option.owner)
         param.Owner = option.owner;

      if (option.Owner)
         param.Owner = option.Owner;

      if (option.matnr)
         param.matnr[0] = option.matnr;
      if (option.description)
         param.description[0] = option.description;

      if (option.LoadWgt)
         param.LoadWgt = option.LoadWgt;

      if (option.Speed)
         param.Speed = option.Speed;
      if (option.Vol)
         param.Vol = option.Vol;
      if (option.SpecialTag1)
         param.SpecialTag1 = option.SpecialTag1;

      return $http({
         method: "GET",
         url: config.baseUrl + "search/Material" + "?" + $.param(param),
         dataType: "json"
      });
   };



   var getRoute = function (option) {
      var param = {
         "SerType": "AND",
         RouteID: "",
         RouteDesc: "",
         TRType: "",
         RouteOrigin: "",
         RouteOriginDesc: "",
         RouteDest: "",
         RouteDesiDesc: "",
         Distance1: "",
         Distance2: "",
         Distance3: "",
         AvgDuration1: "",
         AvgDuration2: "",
         AvgDuration3: "",
         avgCost1: "",
         avgCost2: "",
         avgCost3: "",
         trVendor: "",
         TRmode: "",
         SpecTag: "",
         Route: [],
      };
      if (option)
         $.extend(param, option);

      return $http({
         method: "GET",
         url: config.baseUrl + "search/Route" + "?" + $.param(param),
         dataType: "json"
      });
   };

   return {
      "getConfig": getConfig, "getConfigs": getConfigs,
      "getMaterial": getMaterial,
      "getRoute": getRoute,
      "materialAutoPack": curry(materialAuto, ["PACK"]),
      "customerAuto12": curry(customerAuto, [1, 2]),
      "customerAuto1": curry(customerAuto, [1]),
      "customerAuto2": curry(customerAuto, [2]),
      "customerAuto3": curry(customerAuto, [3]),
      "customerAuto4": curry(customerAuto, [4]),
      "customerAuto5": curry(customerAuto, [5]),
      "customerAuto6": curry(customerAuto, [6]),
      "locationAuto1": curry(locationAuto, [1]),
      "locationAuto2": curry(locationAuto, [2])
   };
}

function timelineService($http, config) {
   var searchUrl = config.baseUrl + 'EO/EventSearch';

   return {
      getEventTimeLine: getEventTimeLine
   };

   function getEventTimeLine(options) {
      var queryOption = {
         serType: 'AND',
         createUser: '',
         eventType: [''],
         eventCode: '',
         eventListener1: '',
         eventListener2: '',
         eventListener3: '',
         eventListener4: '',
         EO: [options['eo']],
         ERID: [options['er']],
         ERITN: [options['eritn']],
         eventStatus: [''],
         resEventID: [''],
         memo: ''
      };
      return $http.postXSRF(searchUrl, queryOption);
   }

}

function eoDetailService($http, $q, config, dateTimeHelper, configService) {

   var searchUrl = config.baseUrl + 'EO/EOQuickSearch';
   var emoChangeUrl = config.baseUrl + 'EO/EOMChange';
   return {
      getEoDetail: getEoDetail,
      getAllConfigData: getAllConfigData,
      save: save
   };

   function getAllConfigData() {
      return $q.all([
          configService.getConfig('ERTP'),
          configService.getConfig('TRPY'),
          configService.getConfig('ERTG'),
          configService.getConfig('EOST'),
          configService.getConfig('EVST')
      ]).then(function (results) {
         var result = {};
         angular.forEach(results, function (res) {
            var confType = getConfType(res.data);
            result[confType] = res.data;
         });
         return result;
      });

      function getConfType(configs) {
         return configs[0].conType;
      }
   }


   function getEoDetail(queryOptions) {
      var data = {
         SerType: 'AND',
         EOStatus: [''],
         eventstatus: [''],
         EO: [queryOptions['eoid']],
         EOType: [''],
         EOTRType: [''],
         EOTag: [''],
         ERTag: "",
         EOTRVendor1: [''],
         EOTRVendor2: [''],
         EOTRVendor3: [''],
         MesUnit1: '',
         reqDelDate: '',
         dep_Country: '',
         dep_State: '',
         dep_City: '',
         dep_Disc: '',
         dep_Group1: '',
         dep_Group2: '',
         rec_Country: '',
         rec_State: '',
         rec_City: '',
         rec_Disc: '',
         rec_Group1: '',
         rec_Group2: '',
         customerOrder1: [''],
         customerOrder2: [''],
         customerOrder3: [''],
         VendorOrder1: [''],
         VendorOrder2: [''],
         VendorOrder3: [''],
         reqDelDate1: '',
         reqDelDate2: '',
         reqDelDate3: '',
         reqDelDate4: '',
         ScheduleVendor1: '',
         ScheduleClass1: '',
         DepDate1: '',
         ArrDate1: '',
         DepTime1: '',
         Arrtime1: '',
         DeliverBP1: '',
         DeliverBP2: '',
         depCustomer: '',
         depLocCode: '',
         BP1: "",
         BP2: "",
         BP3: "",
          reqDelDate1S :"",
          reqDelDate1E :"",
          reqDelDate2S :"",
          reqDelDate2E :"",
          reqDelDate3S :"",
          reqDelDate3E :"",
          reqDelDate4S :"",
          reqDelDate4E :"",
          DepDate2 :"",
          DepDate3 :"",
          DepDate1S :"",
          DepDate1E :"",
          DepDate2S :"",
          DepDate2E :"",
          DepDate3S :"",
          DepDate3E :"",
          DepDate1act :"",
          DepDate2act :"",
          DepDate3act :"",
          DepDate1actS :"",
          DepDate1actE :"",
          DepDate2actS :"",
          DepDate2actE :"",
          DepDate3actS :"",
          DepDate3actE :"",
          ArrDate2 :"",
          ArrDate3 :"",
          ArrDate1S :"",
          ArrDate1E :"",
          ArrDate2S :"",
          ArrDate2E :"",
          ArrDate3S :"",
          ArrDate3E :"",
          ArrDate1act :"",
          ArrDate2act :"",
          ArrDate3act :"",
          ArrDate1actS :"",
          ArrDate1actE :"",
          ArrDate2actS :"",
          ArrDate2actE :"",
          ArrDate3actS :"",
          ArrDate3actE :""

      };
      return $http.postXSRF(searchUrl, data);
   }

   function save(data) {
      var eodetail = eoDataMapping(data);

      return $http.postXSRF(emoChangeUrl, eodetail);
   }

   function eoDataMapping(data) {
      return {
         EO: [data.dn.eo],
         userID: config.userID,
         EOStatus: data.dn.eoStatus,
         EOType: data.dn.eotype,
         EOTRType: data.dn.eotrtype,
         EOTag: data.dn.eotag,
         EOTRVendor1: data.dn.eotrvendor1,
         EOTRVendor2: data.dn.eotrvendor2,
         EOTRVendor3: data.dn.eotrvendor3,
         customerOrder1: data.dn.customerOrder1,
         customerOrder2: data.dn.customerOrder2,
         customerOrder3: data.dn.customerOrder3,
         VendorOrder1: data.dn.vendorOrder1,
         VendorOrder2: data.dn.vendorOrder2,
         VendorOrder3: data.dn.vendorOrder3,
         reqDelDate1: data.dn.reqDelDate1,
         reqDelDate2: data.dn.reqDelDate2,
         reqDelDate3: '',
         reqDelDate4: '',
         DeliverBP1: data.dn.deliverBP1,
         DeliverBP2: data.dn.deliverBP2,
         DeliverBP3: '',
         ScheduleVendor1: data.dn.scheduleVendor1,
         ScheduleVendor2: data.dn.scheduleVendor2,
         ScheduleVendor3: '',
         ScheduleClass1: data.dn.scheduleClass1,
         ScheduleClass2: data.dn.scheduleClass2,
         ScheduleClass3: '',
         DepDate1: '',
         DepDate2: data.dn.depDate2,
         DepDate3: data.dn.depDate3,
         ArrDate1: '',
         ArrDate2: data.dn.arrDate2,
         ArrDate3: data.dn.arrDate3,
         DepTime1: '',
         DepTime2: dateTimeHelper.format(data.dn.depTime2, 'HH:mm A', 'HH:mm:ss'),
         DepTime3: dateTimeHelper.format(data.dn.depTime3, 'HH:mm A', 'HH:mm:ss'),
         Arrtime1: "",
         Arrtime2: dateTimeHelper.format(data.dn.arrtime2, 'HH:mm A', 'HH:mm:ss'),
         Arrtime3: dateTimeHelper.format(data.dn.arrtime3, 'HH:mm A', 'HH:mm:ss'),
         memo: data.dn.memo,
         "BP1": "",
         "BP2": "",
         "BP3": "",
         "project": "",
         "plannedID": "",
         DepDate1act :data.dn.depDate1act,
         DepDate2act :data.dn.depDate2act,
         DepDate3act :data.dn.depDate3act,
         ArrDate1act :data.dn.arrDate1act,
         ArrDate2act :data.dn.arrDate2act,
         ArrDate3act :data.dn.arrDate3act,
         DepTime1act :dateTimeHelper.format(data.dn.depTime1act, 'HH:mm A', 'HH:mm:ss'),
         DepTime2act :dateTimeHelper.format(data.dn.depTime2act, 'HH:mm A', 'HH:mm:ss'),
         DepTime3act :dateTimeHelper.format(data.dn.depTime3act, 'HH:mm A', 'HH:mm:ss'),
         Arrtime1act :dateTimeHelper.format(data.dn.arrtime1act, 'HH:mm A', 'HH:mm:ss'),
         Arrtime2act :dateTimeHelper.format(data.dn.arrtime2act, 'HH:mm A', 'HH:mm:ss'),
         Arrtime3act :dateTimeHelper.format(data.dn.arrtime3act, 'HH:mm A', 'HH:mm:ss')
      };
   }
}