angular.module('itms.transport.eoMaintain')
    .factory('eoMaintainService', ['$http', 'config', function ($http, config) {

       return {
          quickSearch: quickSearch,
          getResultPartial: getResultPartial,
          queryER: queryER,
          getLocation: getLocation,
          getEventLocation: getEventLocation,
          getRoutePath: getRoutePath
       };

       function getLocation(option) {
          $.extend(option, { S: ["S1"], E: ["E1"] });
          return $http.postXSRF(config.baseUrl + 'EO/EOItemLocationSearch', option);
       }

       function getEventLocation(option) {
          return $http.postXSRF(config.baseUrl + 'EO/EOItemEventLocationSearch', option);

       }

       function getRoutePath(option) {
          $.extend(option, { S: ["S1"], E: ["E1"] });
          return $http.postXSRF(config.baseUrl + 'EO/EOItemRoutePathSearch', option);

       };

       function quickSearch(param) {
          var data = param;
          return $http.postXSRF(config.baseUrl + 'EO/EOQuickSearch', data);
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
                eoTag: item.dn.eotag,
                depCustomer: item.depCustomerDesc,
                recCustomer: item.recCustomerDesc,
                reDelDate: item.dn.reqDelDate1,
                eoTrtype: item.eotrtypeDesc,
                eoTrvendor: item.eotrvendor1Desc,
                vendorOrder: item.dn.vendorOrder1,
                eventstatus: item.dn.eventstatus,
                routeClassID: item.erItem.routeClassID,
                tranResLicense: item.erItem.tranResLicense,
                transDriverID: item.erItem.transDriverID,
                resAmt1: item.erItem.resAmt1,
                matIIDDesc: item.matIIDDesc,
                amt: item.erItem.amt,
                deliverBP1: item.dn.deliverBP1,
                project: item.erHead.project,
                plannedID: item.erHead.plannedID,
                pickERDate: item.erHead.pickERDate,
                resID1: item.erItem.resID1,
                subPackNumner: item.erItem.subPackNumner,
                resAmtCS1: item.erItem.resAmtCS1

             };
          }
       }


       function queryER(option) {
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
             customerOrder1: [''],
             customerOrder2: [''],
             customerOrder3: [''],
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
             ERITN: [''],
             ERTRType: [""],
             project: "",
             plannedID: "",
             OMSOrderID: "",
             contractID: "",
             pickERDate: "",
             ERTRVendor: "",
             BP1: "",
             BP2: "",
             BP3: "",
             TransResPlanTag: "",
             ItemSplitPlan: "",
             RoutePlanTag: "",
             PackNum: "",
             PackNum2: "",
             PackNum3: "",
             SubPackNum: "",
             SubPackNum2: "",
             SubPackNum3: "",
             vendor: "",
             MatIID: "",
             customerMatID: "",
             RouteID: "",
             RouteClassName: "",
             RouteClassID: "",
             TranResType: "",
             TranResID: "",
             TranResLicense: "",
             TransDriverID: "",
             TrVendor: "",
             resType1: "",
             resID1: "",
             resType2: "",
             resID2: "",
             resType3: "",
             resID3: "",
             ResAmtCS1: "",
             ResAmtCS2: "",
             ResAmtCS3: "",
             EOID: "",
              reqDelDateS: "",
              reqDelDateE: "",
              pickERDateS: "",
              pickERDateE: ""
          };
          $.extend(data, option);
          return $http.postXSRF(config.baseUrl + 'ER/ERQuickSearch', data);
       }

    }]);