angular
    .module('itms.common')
    .controller('EODetailCtrl', ['$scope', '$modalInstance', 'eoDetailService', 'eoService', 'common', 'data', EODetailCtrl]);

function EODetailCtrl($scope, $modalInstance, eoDetailService, eoService, common, data) {

    var queryOption;

    activate();

    function activate() {
        queryOption = {};
        if (data.eoid) {
            queryOption['eoid'] = data.eoid;
        } else if (data.requirementDetail) {
            queryOption['eoid'] = data.requirementDetail.pk.eoID;
        } else if (data.eoID) {
            queryOption['eoid'] = data.eoID;
        }

        eoDetailService.getAllConfigData().then(function (result) {
            $scope.configData = result;
        });

        eoDetailService.getEoDetail(queryOption).then(function (result) {
            console.log(result);
            if (result.data.errorMessage) {
                $scope.data = {};
            } else {
                var eoDetails = result.data[0];
                eoDetails.dn.reqDelDate1 = formatDate(eoDetails.dn.reqDelDate1);
                eoDetails.dn.reqDelDate2 = formatDate(eoDetails.dn.reqDelDate2);
                eoDetails.dn.reqDelDate3 = formatDate(eoDetails.dn.reqDelDate3);
                eoDetails.dn.reqDelDate4 = formatDate(eoDetails.dn.reqDelDate4);
                eoDetails.dn.depDate1 = formatDate(eoDetails.dn.depDate1);
                eoDetails.dn.depDate2 = formatDate(eoDetails.dn.depDate2);
                eoDetails.dn.depDate1act = formatDate(eoDetails.dn.depDate1act);
                eoDetails.dn.arrDate1 = formatDate(eoDetails.dn.arrDate1);
                eoDetails.dn.arrDate2 = formatDate(eoDetails.dn.arrDate2);
                eoDetails.dn.arrDate1act = formatDate(eoDetails.dn.arrDate1act);
                eoDetails.dn.reqDelTime1 = formatTime(eoDetails.dn.reqDelTime1);
                eoDetails.dn.reqDelTime2 = formatTime(eoDetails.dn.reqDelTime2);
                eoDetails.dn.reqDelTime3 = formatTime(eoDetails.dn.reqDelTime3);
                eoDetails.dn.reqDelTime4 = formatTime(eoDetails.dn.reqDelTime4);
                eoDetails.dn.depTime1 = formatTime(eoDetails.dn.depTime1);
                eoDetails.dn.depTime2 = formatTime(eoDetails.dn.depTime2);
                eoDetails.dn.detTime1act = formatTime(eoDetails.dn.detTime1act);
                eoDetails.dn.arrtime1 = formatTime(eoDetails.dn.arrtime1);
                eoDetails.dn.arrtime2 = formatTime(eoDetails.dn.arrtime2);
                eoDetails.dn.arrtime1act = formatTime(eoDetails.dn.arrtime1act);
                $scope.data = eoDetails;
            }
        });
    }

    var formatDate = function (dt) {
        if (!dt) return dt;
        return moment(dt).format(common.DATEFORMAT);
    };
    var formatTime = function (dt) {
        if (!dt) return dt;
        return moment(dt).format(common.TIMEFORMAT);
    };

    $scope.save = function (data) {
        eoDetailService.save(data).success(function (result) {
            $modalInstance.close(result);
        });
    };

    $scope.event = {
        eventType: '',
        eventCode: '',
        memo: '',
        reset: function () {
            this.eventCode = '';
            this.eventType = '';
            this.memo = '';
        }
    };

    $scope.types = [
        {
            value: 'DELY',
            text: '延迟事件'
        },
        {
            value: 'NORM',
            text: '正常事件'
        },
        {
            value: 'UNRP',
            text: '未报告事件'
        },
        {
            value: 'UNXP',
            text: '未期事件'
        }
    ];

    $scope.getEventCode = function (eventType) {
        eoService.getEventCode(eventType)
            .success(function (data) {
                $scope.codes = _.map(data, function (item) {
                    return {
                        value: item.group2,
                        text: item.description
                    };
                });
            });
    };

    $scope.ok = function () {
        eoService
            .createEvent({
                eventType: $scope.event.eventType,
                eventCode: $scope.event.eventCode,
                memo: $scope.event.memo,
                EO: [queryOption['eoID'] || ''],
                ERID: [queryOption['erID']],
                ERITN: [queryOption['erITN']]
            })
            .success(function () {
                common.notifier.success("创建成功...");
                $scope.event.reset();
            });
    };

}