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

    it('count should changed when name changes', function() {
        scope.name = 'sean';
        scope.count = 0;

        expect(scope.count).toBe(0);

        scope.$watch('name', function(newValue, oldValue) {
            console.log(newValue);
            console.log(oldValue);
            console.log(arguments);
            scope.count = scope.count + 1;
        });
        expect(scope.count).toBe(0);

        //the count will not change if digest cicle didn't fired
        scope.name = 'anna';
        expect(scope.count).toBe(0);

        //the watch expression will only be called once after digest
        scope.$digest();
        expect(scope.count).toBe(1);

    });
});
