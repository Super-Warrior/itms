'use strict';

describe('Service: eoService', function () {
    this.timeout(15000);
    // load the controller's module
    beforeEach(module('itmsApp'));

    var sut,
        scope,
        httpBackend;

    // Initialize the controller and a mock scope

    beforeEach(inject(function (orderService, $httpBackend, $rootScope, config) {
        sut = orderService;
        scope = $rootScope.$new();
        //httpBackend = $httpBackend;
        //httpBackend.when('POST', config.baseUrl + 'EO/EOQuickSearch').respond({name: 'test'});
    }));

    it('should get all data', function (done) {
        scope.$apply(function(){
            sut.queryAll()
                .success(function (data) {
                    console.log(data);
                    done();
                }).error(function () {
                    done();
                });
        });


    })

});
