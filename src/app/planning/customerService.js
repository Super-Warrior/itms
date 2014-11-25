angular.module('itms.planning.common')
    .factory('customerService', ['$http', 'config', customerService]);

function customerService($http, config) {

    return { "searchCustomer": searchCustomer };

    function Criteria(type) {
        this.type = [];
        this.SerType = "OR";
        this.customer = [""];
        this.name = [""];
        this.contact = [""];
        this.Email = [""];
        this.phone = [""];
        this.Country = [""];
        this.State = [""];
        this.City = [""];
        this.Disc = [""];
        this.postcode = [""];
        this.address1 = [""];
        this.SalesArea = [""];
        this.Group1 = [""];
        this.Group2 = [""];

        switch (type) {
            case "dep":
                this.type = [1];
                break;
            case "rec":
                this.type = [2];
                break;
            case "car":
                this.type = [5];
                break;
            case "net":
                this.type = [3];
                this.Group1 = ["TTP2"];
                break;
        }
    }

    function searchCustomer(type) {
        var criteria = new Criteria(type);
        return $http({
            method: "GET",
            url: config.baseUrl + "search/Customer" + "?" + $.param(criteria),
            dataType: "json"
        });
    }

}