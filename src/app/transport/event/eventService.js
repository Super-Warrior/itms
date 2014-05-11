angular.module('itms.transport.event')
    .factory('eventService', ['$http', '$q', 'config', 'configService', eventService]);

function eventService($http, $q, config, configService) {
    var
        defaultQueryOption = {
            serType: 'OR',
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
            serType: 'OR',
            EOTag: '',
            ERID: [''],
            ERStatus: ['']
        },
        defaultEoQueryOption = {
            serType: 'OR',
            EO: [''],
            eventStatus: [''],
            EOStatus: ['']
        },
        ersearchUrl = config.baseUrl + 'ER/EREventSearch',
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
                configService.getConfig('EVST'),
            ]).then(function (results) {
                var result = {};
                angular.forEach(results, function(res){
                    var confType = getConfType(res.data);
                    result[confType] = res.data;
                });
                return result;
            });

        function getConfType(configs) {
            return configs[0].conType;
        }
    }

    function queryByEvent(payload) {
        //todo: extend from payload
        var data = defaultQueryOption;
        return $http.postXSRF(searchUrl, data);
    }

    function queryByEr() {
        var data = defaultErQueryOption;
        return $http.postXSRF(ersearchUrl, data);
    }

    function queryByEo() {
        var data = defaultEoQueryOption;
        return $http.postXSRF(eosearchUrl, data);
    }

    function getEventPartial(events) {
        return events.map(mapEvent);

        function mapEvent(event) {
            return {
                eventType: event.eventType,
                eventCode: event.eventCode,
                eventDateTime: event.eventDateTime,
                createUser: event.createUser,
                eoNumber: event.eo + '/' + event.erid + '/' + event.eritn

            };
        }
    }
}