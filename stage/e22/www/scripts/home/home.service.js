(function() {
	'use strict';

	angular
		.module('catalogue.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$cordovaGeolocation', '$q', 'geolib', 'convert', 'dataService'];

	/* @ngInject */
	function homeService($cordovaGeolocation, $q, geolib, convert, dataService) {

		var service = {

		};

		return service;

		// ***************************************************************

	}

})();
