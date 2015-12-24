(function() {
	'use strict';

	angular
		.module('catalogue.categories')
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
