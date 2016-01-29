(function() {
	'use strict';

	angular
		.module('bizdir.map')
		.factory('mapService', mapService);

	mapService.$inject = ['_', 'businessesService'];

	/* @ngInject */
	function mapService(_, businessesService) {
		var pins;

		var service = {
			getPins: getPins,
			getCommon: getCommon
		};
		return service;

		// ***************************************************************

		function getPins() {
			return businessesService.getBusinesses().then(function(businesses) {
				pins = [];
				_.each(businesses, function(business) {
					if (business.mapdata && business.mapdata.annotations) {
						_.each(business.mapdata.annotations, function(annotation) {
							pins.push({
								title: business.name + '. ' + annotation.title,
								lat: annotation.latitude,
								lon: annotation.longitude,
								businessId: business.guid
							});
						});
					}
				});
				return pins;
			});
		}

		function getCommon() {
			return businessesService.getCommon();
		}
	}
})();
