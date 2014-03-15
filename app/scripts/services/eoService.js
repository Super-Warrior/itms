(function () {
    'use strict'

    angular.module('itmsApp').factory('eoService', ['$http', 'config', eoService]);

    function eoService($http, config) {

        var defaultQueryOption = {
            SerType: 'AND',
            EOStatus: 'S001',
            eventstatus: '',
            EO: '',
            EOType: '',
            EOTRType: '',
            EOTag: '',
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

        return {
            queryAll: queryAllRemote,
            queryByEventType: queryByEventType,
            createEvent: createEvent
        };

        function queryAllRemote() {
            var data = defaultQueryOption;
            return $http.postXSRF(searchUrl, data);
        }

        function queryByEventType(type) {
            var data = defaultQueryOption;
            data.eventstatus = type || '';
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

    }
}());
