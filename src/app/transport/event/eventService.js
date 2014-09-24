angular.module('itms.transport.event')
    .factory('eventService', ['$http', '$q', 'config', 'configService', eventService]);

function eventService($http, $q, config, configService) {
    var
        defaultQueryOption = {
            serType: 'AND',
            createUser: '',
            eventType: [''],
            eventCode: '',
            eventListener1: '',
            eventListener2: '',
            eventListener3: '',
            eventListener4: '',
            EO: [''],
            ERID: [''],
            ERITN: [''],
            eventStatus: [''],
            resEventID: [''],
            memo: ''
        },
        defaultErQueryOption = {
            serType: 'AND',
            EOTag: '',
            ERID: [''],
            ERITN: [''],
            ERITNStatus: ['']
        },
        defaultEoQueryOption = {
            serType: 'OR',
            EO: [''],
            eventStatus: [''],
            EOStatus: ['']
        },
        ersearchUrl = config.baseUrl + 'ER/ERITNEventSearch',
        eosearchUrl = config.baseUrl + 'EO/EOEventSearch',
        searchUrl = config.baseUrl + 'EO/EventSearch';

    return {
        queryByEvent: queryByEvent,
        queryByEr: queryByEr,
        queryByEo: queryByEo,
        getEventPartial: getEventPartial,
        getAllConfigData: getAllConfigData
    };

    function getAllConfigData() {
        return $q.all([
                configService.getConfig('EVTP'),
                configService.getConfig('EPST'),
                configService.getConfig('ERNT'),
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

    function queryByEvent(queryOptions) {
        //todo: extend from payload
        var data = angular.extend({}, defaultQueryOption);
        if (queryOptions.eventType && queryOptions.eventType.length > 0) {
            data.eventType = queryOptions.eventType.map(function (item) {
                return item.code;
            });
        }
        if (queryOptions.eventStatus && queryOptions.eventStatus.length > 0) {
            data.eventStatus = queryOptions.eventStatus.map(function (item) {
                return item.code;
            });
        }
        if (queryOptions.eventCode) data.eventCode = queryOptions.eventCode;
        if (queryOptions.eventListener1) data.eventListener1 = queryOptions.eventListener1;
        if (queryOptions.eventListener2) data.eventListener2 = queryOptions.eventListener2;
        if (queryOptions.eventListener3) data.eventListener3 = queryOptions.eventListener3;
        if (queryOptions.eventListener4) data.eventListener4 = queryOptions.eventListener4;
        if (queryOptions.eoNumber) data.EO = [queryOptions.eoNumber];
        if (queryOptions.erNumber) data.ERID = [queryOptions.erNumber];

        return $http.postXSRF(searchUrl, data);
    }

    function queryByEr(queryOptions) {
        var data = angular.extend({}, defaultErQueryOption);
        if (queryOptions.ERStatus && queryOptions.ERStatus.length > 0) {
            data.ERITNStatus = queryOptions.ERStatus.map(function (item) {
                return item.code;
            });
        }
        data.ERID=[queryOptions.ERID || ''];
        data.ERITN=[queryOptions.ERITN || ''];
        return $http.postXSRF(ersearchUrl, data);
    }

    function queryByEo(queryOptions) {
        var data = angular.extend({}, defaultEoQueryOption);
        if (queryOptions.eoStatus && queryOptions.eoStatus.length > 0) {
            data.EOStatus = queryOptions.eoStatus.map(function (item) {
                return item.code;
            });
        }
        if (queryOptions.eoEventStatus && queryOptions.eoEventStatus.length > 0) {
            data.eventStatus = queryOptions.eoEventStatus.map(function (item) {
                return item.code;
            });
        }
        data.EO = [queryOptions.eoID || ''];
        return $http.postXSRF(eosearchUrl, data);
    }

    function getEventPartial(events) {
        if (!events || events.errorMessage === 'NO_RESULT') return [];
        return events.map(mapEvent);

        function mapEvent(item) {
            return {
                eventType: item.event.eventType,
                eventCode: item.event.eventCode,
                eventDesc: item.event.eventDesc|| item.eventDesc || '',
                eventDateTime: item.event.eventDateTime,
                createUser: item.event.createUser,
                eoNumber: item.event.eo + '/' + item.event.erid + '/' + item.event.eritn,
                eoid: item.event.eo,
                erid: item.event.erid,
                eritn: item.event.eritn
            };
        }
    }
}