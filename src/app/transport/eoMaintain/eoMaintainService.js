angular.module('itms.transport.eoMaintain')
.factory('eoMaintainService', ['$http', 'config', "configService", function ($http, config, configService){
    	// body...
    	var defaultQueryOption={
    		serType: 'OR',
    		EO=[''],
    		EOStatus=[''],
    		eventstatus=[''],
    		EOType=[''],
    		EOTRType=[''],
    		EOTag=[''],
    		EOTRVendor1='',
    		EOTRVendor2='',
    		EOTRVendor3='',
    		customerOrder1='',
    		customerOrder2='',
    		customerOrder3='',
    		VendorOrder1='',
    		VendorOrder2='',
    		VendorOrder3='',
    		reqDelDate1='',
    		reqDelDate2='',
    		reqDelDate3='',
    		reqDelDate4='',
    		ScheduleVendor1='',
    		ScheduleClass1='',
    		DepDate1='',
    		ArrDate1='',
    		DepTime1='',
    		Arrtime1='',
    		DeliverBP1='',
    		DeliverBP2='',
    		depCustomer='',
    		depLocCode=''
    	};
        var searchUrl= config.baseUrl + 'EO/EOQuickSearch';

        return function () {
             var data = defaultQueryOption;
             return $http.postXSRF(searchUrl, data);
         }

     }]);