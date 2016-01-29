(function() {
	'use strict';

	angular
		.module('restaurant.products')
		.factory('productsService', productsService);

	productsService.$inject = ['dataService'];

	/* @ngInject */
	function productsService(dataService) {
		var service = {
			all: all,
			get: get,
			getFeatured: getFeatured
		};
		return service;

		// ******************************************************************

		function all(categoryGuid) {
			return dataService.getProducts(categoryGuid);
		}

		function get(categoryGuid, productGuid) {
			return dataService.getProduct(categoryGuid, productGuid);
		}

		function getFeatured(productGuid) {
			return dataService.getFeaturedProduct(productGuid);
		}
	}
})();
