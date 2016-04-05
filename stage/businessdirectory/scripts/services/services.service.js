(function() {
	'use strict';

	angular
		.module('bizdir.services')
		.factory('servicesService', servicesService);

	servicesService.$inject = ['dataService'];

	/* @ngInject */
	function servicesService(dataService) {
		var service = {
			getItems: getItems,
			getItem: getItem
		};
		return service;

		// *******************************************************

		function getItems(businessId) {
			return dataService.getServices(businessId);
		}

		function getItem(businessId, serviceId) {
			return dataService.getService(businessId, serviceId);
		}
	}
})();
