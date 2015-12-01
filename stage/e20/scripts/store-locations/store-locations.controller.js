(function() {
	'use strict';

	angular
		.module('localbiz.store-locations')
		.controller('StoreLocationsController', StoreLocationsController);

	StoreLocationsController.$inject = [
		'storeLocationsService', 'externalAppsService'];

	/* @ngInject */
	function StoreLocationsController(storeLocationsService, externalAppsService) {
		var vm = angular.extend(this, {
			phoneNumber: storeLocationsService.phoneNumber,
			getDirections: getDirections,
			openFacebookPage: openFacebookPage,
			openHours: [],
			branches: []
		});

		(function activate() {
			vm.branches = storeLocationsService.getBranches();
		})();

		// **********************************************************************

		function getDirections(officeLocation) {
			externalAppsService.openMapsApp(officeLocation);
		}

		function openFacebookPage(facebookPage) {
			externalAppsService.openExternalUrl(facebookPage);
		}
	}
})();
