angular.module('itms.transport.eoMaintain')
    .factory('myElectricOrderService', ['$http', 'config', "configService", function ($http, config, configService) {
        // body...

        var searchUrl = config.baseUrl + 'EO/MyEOQuickSearch';

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
                    eoStatus: item.eostatusDesc,
                    customerOrder: item.dn.customerOrder1,
                    eoType: item.eotypeDesc,
                    eoTag: item.eotagDesc,
                    depCustomer: item.depCustomerDesc,
                    recCustomer: item.recCustomerDesc,
                    reDelDate: item.dn.reqDelDate1,
                    eoTrtype: item.eotrtypeDesc,
                    eoTrvendor: item.eotrvendor1Desc,
                    vendorOrder: item.dn.vendorOrder1,
                    eventstatus:item.dn.eventstatus,
                    vendorOrder1:item.dn.vendorOrder1,
                    routeClassID:item.erItem.routeClassID,
                    tranResLicense:item.erItem.tranResLicense,
                    transDriverID:item.erItem.transDriverID,
                    resAmt1:item.erItem.resAmt1,
                    matIIDDesc:item.matIIDDesc


                };
            }
        }


    }]);