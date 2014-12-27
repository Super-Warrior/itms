angular.module('itms.transport.event')
    .factory('eoService', ['$http', 'config', "configService", eoService]);

function eoService($http, config, configService) {

   var defaultQueryOption = {
      ERTag: "",
      MesUnit1: '',
      reqDelDate: '',
      dep_Country: '',
      dep_State: $scope.dep_State,
      dep_City: $scope.dep_City,
      dep_Disc: '',
      //dep_Group1: $scope.dep_Group1,
      //dep_Group2: '',
      //rec_Country: '',
      //rec_State: $scope.rec_State,
      //rec_City: $scope.rec_City,
      //rec_Disc: '',
      //rec_Group1: '',
      //rec_Group2: '',
      SerType: 'OR',
      EOStatus: ['S001'],
      eventstatus: [''],
      EO: [''],
      EOType: [''],
      EOTRType: [''],
      EOTag: [''],
      EOTRVendor1: '',
      EOTRVendor2: '',
      EOTRVendor3: '',
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

   var searchUrl = config.baseUrl + 'EO/EOQuickSearch';
   var createEventUrl = config.baseUrl + 'EO/EventCreateANY';
   //var createEventUrl = config.baseUrl + 'EO/EventCreate';

   var service = {
      queryByEventType: queryByEventType,
      createEvent: createEvent,
      getEventCode: getEventCode
   };


   service.queryAll = queryAllRemote;


   return service;

   function queryAllRemote() {
      var data = defaultQueryOption;
      return $http.postXSRF(searchUrl, data);
   }



   function queryByEventType(type) {
      var data = defaultQueryOption;
      defaultQueryOption.eventstatus = [type || ''];
      return $http.postXSRF(searchUrl, data);
   }

   function createEvent(data) {
      var event = {
         createUser: config.userID,
         eventListener1: '',
         eventListener2: '',
         eventListener3: '',
         eventListener4: '',
         EO: [],
         ERID: [],
         ERITN: []
      };
      angular.extend(event, data);
      return $http.postXSRF(createEventUrl, event);
   }

   function getEventCode(type) {
      return configService.getConfig("EVNT", type);
   }
}
