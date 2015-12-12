(function() {
	'use strict';

	angular
		.module('catalogue.featured-products')
		.factory('featuredProductsService', featuredProductsService);

	featuredProductsService.$inject = ['dataService'];

	/* @ngInject */
	function featuredProductsService(dataService) {
		var service = {
			all: all,
			get: get
		};
		return service;

		// ******************************************************************

		function all() {
			return dataService.getFeaturedProducts();
		}

		function get(id) {
			return dataService.getFeaturedProduct(id);
		}
	}
})();
