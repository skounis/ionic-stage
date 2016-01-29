(function() {
	'use strict';

	angular
		.module('bizdir.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['homeService', 'externalAppsService', 'openHoursService'];

	/* @ngInject */
	function HomeController(homeService, externalAppsService, openHoursService) {
		var currentDateTime = (new Date()).format('dddd HH:MM');

		var vm = angular.extend(this, {
			entries: homeService.menuItems,
			isBusinessOpen: openHoursService.isBusinessOpen(),
			currentDateTime: currentDateTime,
			distance: null,
			getDirections: getDirections
		});

		(function activate() {
			calculateDistanceToOrigin();
		})();

		// *************************************************************

		function calculateDistanceToOrigin() {
			homeService.getDistanceToOrigin().then(function(distance) {
				vm.distance = distance;
			});
		}

		function getDirections() {
			externalAppsService.openMapsApp(homeService.officeLocation);
		}
	}
})();
