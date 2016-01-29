(function() {
	'use strict';

	angular
		.module('restaurant.map')
		.controller('MapController', MapController);

	MapController.$inject = ['$scope', 'businessInfo'];

	/* @ngInject */
	function MapController($scope, businessInfo) {
		var vm = angular.extend(this, {
			origin: {
				lat: businessInfo.map.origin.latitude,
				lon: businessInfo.map.origin.longitude
			},
			zoom: businessInfo.map.zoomLevel,
			markers: []
		});

		var markers = [];
		for (var i = 0; i < businessInfo.map.annotations.length; i++) {
			var annotation = businessInfo.map.annotations[i];
			markers.push({
				name: annotation.title,
				lat: annotation.latitude,
				lon: annotation.longitude
			});
		}
		vm.markers = markers;
	}
})();
