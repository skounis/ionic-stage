(function() {
	'use strict';

	angular
		.module('restaurant.categories')
		.factory('categoriesService', categoriesService);

	categoriesService.$inject = ['dataService'];

	/* @ngInject */
	function categoriesService(dataService) {
		var service = {
			all: all
		};
		return service;

		// ******************************************************************

		function all() {
			return dataService.getCategories();
		}
	}
})();
