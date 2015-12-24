(function() {
	'use strict';

	angular
		.module('catalogue.map')
		.factory('mapService', mapService);

	mapService.$inject = ['dataService'];

	/* @ngInject */
	function mapService(dataService) {

		var service ={
			getBusiness: dataService.getBusiness
		}
		return service;
	}
})();
