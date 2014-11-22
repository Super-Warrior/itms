angular
  .module('itms.common')
  .controller('EODetailCtrl', ['$scope', '$modalInstance', 'common', 'eoDetailService', 'eoService', 'data', EODetailCtrl]);

function EODetailCtrl($scope, $modalInstance, common, eoDetailService, eoService, data) {

  activate();


  function activate() {
    var queryOption = {};
    if (data.eoid) {
      queryOption['eoid'] = data.eoid;
    } else if (data.requirementDetail) {
      queryOption['eoid'] = data.requirementDetail.pk.eoID;
    } else if (data.eoID) {
      queryOption['eoid'] = data.eoID;
    } else if (data.eo) {
      queryOption['eoid'] = data.eo;
    }

    eoDetailService.getAllConfigData().then(function (result) {
      $scope.configData = result;
    });


    $scope.data = {};
    eoDetailService.getEoDetail(queryOption).then(function (result) {
      console.log(result);
      if (result.data.errorMessage) {
        $scope.data = {};
      } else {
        $scope.data = result.data[0];
      }
    });
  }

  $scope.event = {
    eventType: '',
    eventDate: moment().format("YYYY-MM-DD"),
    eventTime: moment().format("HH:mm:ss"),
    eventCode: "",
    memo: '',
    reset: function () {
      var date = moment().format("YYYY-MM-DD");
      var time = moment().format("HH:mm:ss");
      this.eventDate = date;
      this.eventTime = time;
      this.eventCode = '';
      this.eventType = '';
      this.memo = '';
    }
  };
  $scope.save = function (data) {
    eoDetailService.save(data).success(function (result) {
      $modalInstance.close(result);
    });
  };
  $scope.codes = [];
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
    var dt = null;
    var inputDate = $scope.event.eventDate;
    var inputTime = $scope.event.eventTime;
    if (inputDate && inputTime) {
      var section = inputTime.substring(inputTime.length - 3, inputTime.length);
      section = $.trim(section);

      inputTime = inputTime.substring(0, inputTime.length - 3);
      var index = inputTime.indexOf(":");

      var hour = parseInt(inputTime.substring(0, index));
      if (section.toUpperCase() == "PM" && hour != 12)
        hour += 12;
      inputTime = hour + inputTime.substring(index);
      dt = inputDate + " " + inputTime;
      dt = moment(dt).format("YYYY-MM-DD hh:mm:ss");

    }

    eoService
      .createEvent({
        eventType: $scope.event.eventType,
        eventCode: $scope.event.eventCode,
        eventDateTime: dt,
        memo: $scope.event.memo,
        EO: [$scope.data.dn.eo || '-1'],
        ERID: [$scope.data.erItem.pk.erID],
        ERITN: [$scope.data.erItem.pk.erITN]
      })
      .success(function () {
        common.notifier.success("创建成功...");
        $scope.event.reset();
      });
  };

}