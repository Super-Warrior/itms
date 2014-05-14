angular.module('itms.transport.event')
    .factory('eoService', ['$http', 'config', "configService", eoService]);

function eoService($http, config, configService) {

   var defaultQueryOption = {
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
      depLocCode: ''
   };

   var searchUrl = config.baseUrl + 'EO/EOQuickSearch';
   var createEventUrl = config.baseUrl + 'EO/EventCreate';

   var service = {
      queryByEventType: queryByEventType,
      createEvent: createEvent,
      getEventCode: getEventCode
   };

   if (config.mode === 'development') {
      service.queryAll = queryAllLocal
   } else {
      service.queryAll = queryAllRemote
   }

   return service;

   function queryAllRemote() {
      var data = defaultQueryOption;
      return $http.postXSRF(searchUrl, data);
   }

   function queryAllLocal() {
      return $http({
         method: 'GET',
         url: '/mock/eoservice.json'
      });
   }

   function queryByEventType(type) {
      var data = defaultQueryOption;
       defaultQueryOption.eventstatus = [type || ''];
      return $http.postXSRF(searchUrl, data);
   }

   function createEvent(data) {
      var event = {
         createUser: '10000',
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
