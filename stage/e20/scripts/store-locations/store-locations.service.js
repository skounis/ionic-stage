(function() {
	'use strict';

	angular
		.module('localbiz.store-locations')
		.factory('storeLocationsService', storeLocationsService);

	storeLocationsService.$inject = [];

	/* @ngInject */
	function storeLocationsService() {

		var factory ={
			getBranches: getBranches
		};

		return factory;

		// ******************************************************************

		function getBranches(){
			var branches = [
				{
					location: 'Bahrain',
					address: 'Bahrain City Center Mall',
					open: '07:00am - 03:31pm',
					phoneNumber: '+306973216110',
					email: 'skounis@gmail.com',
					officeLocation: '37.7736854,-122.421034',
				},
				{
					location: 'Dubai',
					address: 'Mall of the Emirates',
					open: '07:00am - 03:31pm',
					phoneNumber: '+306973216110',
					email: 'skounis@gmail.com',
					officeLocation: '37.7736854,-122.421034',
				}
			];

			return branches;
		}

	}
})();
