(function() {
	'use strict';

	angular
		.module('catalogue.univers')
		.factory('universService', universService);

	universService.$inject = ['dataService'];

	/* @ngInject */
	function universService(dataService) {
		var service = {
			all: all,
			get: get
		};
		return service;

		// ******************************************************************

		function all() {
			return dataService.getUnivers();
		}

		function get(id) {
			return dataService.getUniver(id);
		}
	}
})();
