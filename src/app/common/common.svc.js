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
                timeout: defaultOption.timeout
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
    .factory('common', ['$q', 'notifier', 'fileHelper', common]);

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
    .factory("timelineService", ["$http", "config", timelineService]);

function configService($http, $q, config) {

    var criteria = {
        "Code": null,
        "ConType": [],
        "Group1": null,
        "Group2": null,
        "Group3": null,
        "Language": ["CN"]
    };

    var getConfig = function (type, code) {
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
            "description": [""]
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
        getEventTimeLine : getEventTimeLine
    };

    function getEventTimeLine(options){
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