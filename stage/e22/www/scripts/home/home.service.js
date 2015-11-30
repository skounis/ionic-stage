(function() {
	'use strict';

	angular
		.module('catalogue.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$cordovaGeolocation', '$q', 'geolib', 'convert', 'dataService'];

	/* @ngInject */
	function homeService($cordovaGeolocation, $q, geolib, convert, dataService) {
		var officeLocation = {
			// Get your location by using the address bar of your
			// browser when you have opened Google Maps
			// eg: https://www.google.gr/maps/@40.9045901,24.3436803,16z?hl=en
			//
			// The information there is provided in latitude,longitude order
			latitude: 40.9045901,
			longitude: 24.3436803,
		};

		var service = {
			getFeaturedCategories: getFeaturedCategories,
			getFeaturedProducts: getFeaturedProducts,
			officeLocation: officeLocation,
			getDistanceToOrigin: getDistanceToOrigin
		};
		return service;

		// ***************************************************************

		function getFeaturedCategories() {
			return dataService.getFeaturedCategories();
		}

		function getFeaturedProducts() {
			return dataService.getFeaturedProducts();
		}

		function getDistanceToOrigin() {
			var posOptions = {
				enableHighAccuracy: true
			};

			var deferred = $q.defer();

			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function(position) {
					var distance = geolib.getDistance({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}, officeLocation);

					if (distance < 1000) {
						distance = distance + ' m';
					} else {
						distance = distance = convert(distance, 'meters', {
							precision: 2
						}).toKilometers() + ' km';
					}

					return deferred.resolve(distance);
				});

			return deferred.promise;
		}
	}

})();
