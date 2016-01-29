(function() {
	'use strict';

	angular
		.module('restaurant.common')
		.factory('externalAppsService', externalAppsService);

	externalAppsService.$inject = ['$window'];

	/* @ngInject */
	function externalAppsService($window) {
		var service = {
			openExternalUrl: openExternalUrl,
			openMapsApp: openMapsApp
		};
		return service;

		// ****************************************************************

		function openExternalUrl(url) {
			$window.open(url, '_system', 'location=yes');
			return false;
		}

		function openMapsApp(coords) {
			var q;
			if (ionic.Platform.isAndroid()) {
				q = 'geo:' + coords;
			} else {
				q = 'maps://maps.apple.com/?q=' + coords;
			}
			$window.location.href = q;
		}
	}
})();
