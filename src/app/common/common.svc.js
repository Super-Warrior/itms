angular
    .module('itms.common',[])
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
    .factory('common', ['notifier', '$q', common]);

function common(notifier, $q) {
    return {
        notifier: notifier,
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
