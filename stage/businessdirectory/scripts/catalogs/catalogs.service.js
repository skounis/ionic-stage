(function() {
	'use strict';

	angular
		.module('bizdir.catalogs')
		.factory('catalogsService', catalogsService);

	catalogsService.$inject = ['dataService', '$q', '_'];

	/* @ngInject */
	function catalogsService(dataService, $q, _) {
		var service = {
			getItems: getItems,
			getItem: getItem
		};
		return service;

		// *******************************************************

		function getItems(businessId) {
			return dataService.getCatalogs(businessId);
		}

		function getItem(businessId, catalogId) {
			return dataService.getCatalog(businessId, catalogId);
		}
	}
})();
