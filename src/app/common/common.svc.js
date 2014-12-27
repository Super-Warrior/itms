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
      return moment(dt).format("HH:mm A");
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
         "Language": ["CN"]
      };
   };


   var criteria = getEmptyCriteria();

   var getConfig = function (type, code) {
      criteria = getEmptyCriteria();
      criteria.ConType = [type];
      if (code) criteria.Code = code;
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
          }).then(function () {

          });
   };

   var getMaterial = function (type) {
      var param = {
         "SerType": "OR",
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
      if (type)
         param.type.push(type);

      return $http({
         method: "GET",
         url: config.baseUrl + "search/Material" + "?" + $.param(param),
         dataType: "json"
      });
   };
   return { "getConfig": getConfig, "getConfigs": getConfigs, "getMaterial": getMaterial };
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
         EOTRVendor1: '',
         EOTRVendor2: '',
         EOTRVendor3: '',
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
         customerOrder1: '',
         customerOrder2: '',
         customerOrder3: '',
         VendorOrder1: '',
         VendorOrder2: '',
         VendorOrder3: '',
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
         BP3: ""
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
         reqDelDate3: data.dn.reqDelDate3,
         reqDelDate4: data.dn.reqDelDate4,
         DeliverBP1: data.dn.deliverBP1,
         DeliverBP2: data.dn.deliverBP2,
         DeliverBP3: data.dn.deliverBP3,
         ScheduleVendor1: data.dn.scheduleVendor1,
         ScheduleVendor2: data.dn.scheduleVendor2,
         ScheduleVendor3: data.dn.scheduleVendor3,
         ScheduleClass1: data.dn.scheduleClass1,
         ScheduleClass2: data.dn.scheduleClass2,
         ScheduleClass3: data.dn.scheduleClass3,
         DepDate1: data.dn.depDate1,
         DepDate2: data.dn.depDate2,
         DepDate3: data.dn.depDate3,
         ArrDate1: data.dn.arrDate1,
         ArrDate2: data.dn.arrDate2,
         ArrDate3: data.dn.arrDate3,
         DepTime1: '',
         DepTime2: '',
         DepTime3: '',
         Arrtime1: dateTimeHelper.format(data.dn.arrTime1, 'HH:mm A', 'HH:mm:ss'),
         Arrtime2: dateTimeHelper.format(data.dn.arrTime2, 'HH:mm A', 'HH:mm:ss'),
         Arrtime3: dateTimeHelper.format(data.dn.arrTime3, 'HH:mm A', 'HH:mm:ss'),
         memo: data.dn.memo,
         "BP1": "",
         "BP2": "",
         "BP3": "",
         "project": "",
         "plannedID": ""
      };
   }
}