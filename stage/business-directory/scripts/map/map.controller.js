(function() {
	'use strict';

	angular
		.module('bizdir.map')
		.controller('MapController', MapController);

	MapController.$inject = ['$scope', 'common', 'pins', '_'];

	/* @ngInject */
	function MapController($scope, common, pins, _) {
		var vm = angular.extend(this, {
			origin: {
				lat: common.map.origin.latitude,
				lon: common.map.origin.longitude
			},
			zoom: common.map.zoomLevel,
			markers: loadPoints()
		});

		// ******************************************************************

		function loadPoints() {
			var markers = [];
			_.each(pins, function(pin) {
				markers.push({
					name: pin.title + getBusinessLink(pin.businessId),
					lat: pin.lat,
					lon: pin.lon
				});
			});
			return markers;
		}

		function getBusinessLink(businessId) {
			return '<br> <a href="#/app/businesses/' + businessId + '">More details</a>';
		}
	}
})();
