(function() {
	'use strict';

	angular
		.module('catalogue.products')
		.factory('productsService', productsService);

	productsService.$inject = ['dataService'];

	/* @ngInject */
	function productsService(dataService) {
		var service = {
			all: all,
			get: get,
			getFeatured: getFeatured,
			points: points
		};
		return service;

		// ******************************************************************

		function all() {
			return dataService.getProducts()
		}

		function get(productGuid) {
			return dataService.getProduct(productGuid);
		}

		function getFeatured(productGuid) {
			return dataService.getFeaturedProduct(productGuid);
		}
		
		function points() {
			return dataService.getPoints();
		}
	}
})();
