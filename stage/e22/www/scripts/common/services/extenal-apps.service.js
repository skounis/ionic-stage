(function() {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('externalAppsService', externalAppsService);

	externalAppsService.$inject = ['$window'];

	/* @ngInject */
	function externalAppsService($window) {
		var service = {
			openExternalUrl: openExternalUrl,
			openPdf: openPdf,
			openMapsApp: openMapsApp
		};
		return service;

		// ****************************************************************

		function openPdf(url) {
			openExternalUrl(url);
		}

		function openExternalUrl(url) {
			$window.open(url, '_system', 'location=yes');
			return false;
		}

		function openMapsApp(coords) {

			if (angular.isObject(coords)) {
				coords = coords.latitude + ',' + coords.longitude;
			}

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
