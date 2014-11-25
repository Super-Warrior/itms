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


        var ERSearchUrl = config.baseUrl + 'ER/ERQuickSearch';
        function queryER() {
            var data = {
                SerType: 'AND',
                userID: '',
                depAreaCode: '',
                depCustomer: '',
                depLocCode: '',
                recCustomer: '',
                recLocCode: '',
                createDate: '',
                ERType: [''],
                customerOrder1: '',
                customerOrder2: '',
                customerOrder3: '',
                ERTag: [''],
                ERTRTag: [''],
                MesUnit1: '',
                reqDelDate: '',
                dep_Country: '',
                dep_State: '',
                dep_City: '',
                dep_Disc: '',
                dep_Group1: '',
                dep_Group2: '',
                rec_Country: '',
                rec_State: '',
                rec_City: '',
                rec_Disc: '',
                rec_Group1: '',
                rec_Group2: '',
                ERITNStatus: ['ASGN'],
                ERStatus: [''],
                ERID: [''],
                ERITN: ['']
            };
            return $http.postXSRF(ERSearchUrl, data);
        }

    }]);