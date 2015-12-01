(function() {
	'use strict';

	angular
		.module('localbiz.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', 'homeService', 'externalAppsService', 'openHoursService'];

	/* @ngInject */
	function HomeController($state, homeService, externalAppsService, openHoursService) {
		var currentDateTime = (new Date()).format('dddd HH:MM');

		var vm = angular.extend(this, {
			entries: homeService.menuItems,
			isBusinessOpen: openHoursService.isBusinessOpen(),
			currentDateTime: currentDateTime,
			distance: null,
			getDirections: getDirections,
			go: go
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

		function go(target) {
			if(target.substring(0, 4) === 'ext:'){
				var targetURL = target.substring(4);
				externalAppsService.openExternalUrl(targetURL);
			}else{
				$state.go(target);
			}
		}
	}
})();
