angular.module('itms.transport.eoMaintain')
  .factory('eoMaintainService', ['$http', 'config', "configService", function ($http, config, configService) {
    // body...

    var searchUrl = config.baseUrl + 'EO/EOQuickSearch';

    return {
      quickSearch: quickSearch,
      getResultPartial: getResultPartial
    };

    function quickSearch(param) {
      var data = param;
      return $http.postXSRF(searchUrl, data);
    }

    function getResultPartial(items) {
      return items.map(mapResult);

      function mapResult(item) {
        return {
          eo: item.dn.eo,
          erID: item.erHead.erID,
          erITN: item.erItem.pk.erITN,
          eoStatus: item.dn.eoStatus,
          customerOrder: item.dn.customerOrder1,
          eoType: item.dn.eotype,
          eoTag: item.dn.eotag,
          depCustomer: item.erHead.depCustomer,
          recCustomer: item.erHead.recCustomer,
          reDelDate: item.dn.reqDelDate1,
          eoTrtype: item.dn.eotrtype,
          eoTrvendor: item.dn.eotrvendor1,
          vendorOrder: item.dn.vendorOrder1
        };
      }
    }


  }]);