angular.module('itms.planning.adjustment')
    .factory('orderService', orderService);

function orderService($http, config) {

    var searchUrl = config.baseUrl + 'ER/ERQuickSearch';

    function queryAllLocal() {
        return $http({ method: 'GET', url: '/mock/order.json' });
    }

    function queryAllRemote() {
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
            ERTRType: [''],
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
        return $http.postXSRF(searchUrl, data);
    }

    function query(data) {
       return $http.postXSRF(searchUrl, data);
   }

   // data: {selectedItems:[], eoid:''}
    function erAssignChange(data) {
        var erid = data.selectedItems.map(function (item) {
            return item.erID;
        });
        var eritn = data.selectedItems.map(function (item) {
            return item.erITN;
        });
        var assignChange = config.baseUrl + 'ER/ERAssignChange?ERID[]=' + erid.join() + '&ERITN[]=' + eritn.join() + '&EOID=' + data.eoid;
        return $http.post(assignChange);
    }

    // data: {selectedItems:[]}
    function erDeleteAssignment(data) {
        var erid = data.selectedItems.map(function (item) {
            return item.erID;
        });
        var eritn = data.selectedItems.map(function (item) {
            return item.erITN;
        });
        var assignChange = config.baseUrl + 'ER/ERAssignDel?ERID[]=' + erid.join() + '&ERITN[]=' + eritn.join();
        return $http.post(assignChange);
    }

    function getRequirementPartial(items) {
        if (!items.map)return [];
        return items.map(mapRequirement);

        function mapRequirement(item) {
            return {
                eoID: item.requirementDetail && item.requirementDetail.eoid,
                erID: item.requirementDetail && item.requirementDetail.pk.erID,
                erITN: item.requirementDetail && item.requirementDetail.pk.erITN,
                erType: item.requirement.erType,
                erTypeDesc: item.ertypeDesc,
                erTag: item.requirement.erTag,
                depCustomer: item.requirement.depCustomer,
                depCustomerDesc: item.depCustomerDesc,
                recCustomer: item.recCustomer,
                recCustomerDesc: item.recCustomerDesc,
                project: item.requirement.project,
                plannedID: item.requirement.plannedID,
                customerOrder1: item.requirement.customerOrder1,
                customerOrder2: item.requirement.customerOrder2,
                customerOrder3: item.requirement.customerOrder3,
                matIID: item.requirementDetail && item.requirementDetail.matIID,
                resAmtCS1: item.requirementDetail && item.requirementDetail.resAmtCS1,
                subPackNumner: item.requirementDetail && item.requirementDetail.packNum,
                packNum: item.requirementDetail && item.requirementDetail.subPackNumner,
                amt: item.requirementDetail && item.requirementDetail.amt,
                resID1:item.requirementDetail&& item.requirementDetail.resID1,
                resAmt1:item.requirementDetail&& item.requirementDetail.resAmt1,
                pickERDate: item.requirement.pickERDate,
                reqDelDate: item.requirement.reqDelDate,
                ertrType: item.requirement.erTRType,
                ertrTypeDesc: item.ertrtypeDesc,
                eritnstatusDesc:item.eritnstatusDesc,
                ertrVendor: item.requirement.ertrvendor,
                ertrVendorDesc: item.ertrvendorDesc
            };
        }
    }


    function getRequirementPartialForAssigment(items) {
        if (!items.map)return [];
        return items.map(mapRequirement);

        function mapRequirement(item) {
            return {
                erID: item.requirementDetail && item.requirementDetail.pk.erID,
                erITN: item.requirementDetail && item.requirementDetail.pk.erITN,
                ertypeDesc: item.ertypeDesc,
                erTag: item.requirement.erTag,
                depCustomerDesc: item.depCustomerDesc,
                recCustomerDesc: item.recCustomerDesc,
                project: item.requirement.project,
                plannedID: item.requirement.plannedID,
                customerOrder1: item.requirement.customerOrder1,
                customerOrder2: item.requirement.customerOrder2,
                customerOrder3: item.requirement.customerOrder3,
                matIID: item.requirementDetail && item.requirementDetail.matIID,
                resID1:item.requirementDetail&& item.requirementDetail.resID1,
                resAmt1:item.requirementDetail&& item.requirementDetail.resAmt1,
                resAmtCS1: item.requirementDetail && item.requirementDetail.resAmtCS1,
                subPackNumner: item.requirementDetail && item.requirementDetail.packNum,
                packNum: item.requirementDetail && item.requirementDetail.subPackNumner,
                amt: item.requirementDetail && item.requirementDetail.amt,
                pickERDate: item.requirement.pickERDate,
                reqDelDate: item.requirement.reqDelDate,
                ertrtypeDesc: item.ertrtypeDesc,
                eritnstatusDesc:item.eritnstatusDesc,
                ertrvendorDesc: item.ertrvendorDesc
            };
        }
    }
    var orderService = {
        getRequirementPartial: getRequirementPartial,
        erAssignChange: erAssignChange,
        erDeleteAssignment: erDeleteAssignment,
        getRequirementPartialForAssigment:getRequirementPartialForAssigment
    };

    if (config.mode === 'development') {
        orderService.queryAll = queryAllLocal;
    } else {
        orderService.queryAll = queryAllRemote;
    }
   orderService.query = query;
    return orderService;
}