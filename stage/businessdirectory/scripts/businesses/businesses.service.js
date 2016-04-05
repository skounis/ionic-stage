(function() {
	'use strict';

	angular
		.module('bizdir.businesses')
		.factory('businessesService', businessesService);

	businessesService.$inject = ['dataService', '$q', '_'];

	/* @ngInject */
	function businessesService(dataService, $q, _) {
		var service = {
			getBusinesses: getBusinesses,
			getBusinessesByCategory: getBusinessesByCategory,
			getBusiness: getBusiness,
			getCommon: getCommon,
			getCategories: getCategories
		};
		return service;

		// ***************************************************************

		function getCategories() {
			return dataService.getCategories();
		};

		function getBusinesses() {
			return dataService.getBusinesses();
		}

		function getBusinessesByCategory(category) {
			return dataService.getBusinessesByCategory(category);
		}

		function getBusiness(businessId) {
			return dataService.getBusiness(businessId);
		}

		function getCommon() {
			return dataService.getCommon();
		}
	}
})();
