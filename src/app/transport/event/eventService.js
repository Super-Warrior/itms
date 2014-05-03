angular.module('itms.transport.event')
    .factory('eventService', ['$http', 'config', "configService", eventService]);

function eventService($http, config, configService) {
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
            memo: ''
        },
        defaultErQueryOption = {
            serType: 'OR',
            EOTag:'',
            ERID:[''],
            ERStatus:['']
        },
        defaultEoQueryOption = {
            serType: 'OR',
            EO:[''],
            eventStatus:[''],
            EOStatus:['']
        },
        ersearchUrl = config.baseUrl + 'ER/EREventSearch',
        eosearchUrl = config.baseUrl + 'EO/EOEventSearch',
        searchUrl = config.baseUrl + 'EO/EventSearch';

    return {
        queryByEvent: queryByEvent,
        queryByEr: queryByEr,
        queryByEo: queryByEo,
        getEventPartial: getEventPartial
    }

    function queryByEvent(payload) {
        //todo: extend from payload
        var data = defaultQueryOption;
        return $http.postXSRF(searchUrl, data);
    }

    function queryByEr(){
        var data = defaultErQueryOption;
        return $http.postXSRF(ersearchUrl, data);
    }

    function queryByEo(){
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