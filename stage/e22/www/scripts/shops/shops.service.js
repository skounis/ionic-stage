(function() {
	'use strict';

	angular
		.module('catalogue.shops')
		.factory('shopsService', shopsService);

	shopsService.$inject = ['dataService'];

	/* @ngInject */
	function shopsService(dataService) {
		var service = {
			all: all
		};
		return service;

		// ******************************************************************

		function all() {
			return dataService.getShops();
		}
	}
})();
