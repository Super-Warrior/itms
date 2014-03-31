'use strict';

describe('Service: eoService', function() {
    // load the controller's module
    beforeEach(module('common.directives.breadcrumb'));

    var sut,
        scope,
        httpBackend;

    // Initialize the controller and a mock scope

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should able to create new scope from rootScope', function() {
        expect(scope).not.toBe(null);
    });
});
