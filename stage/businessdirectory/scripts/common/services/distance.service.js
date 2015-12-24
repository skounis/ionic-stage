(function() {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('distanceService', distanceService);

	distanceService.$inject = ['$cordovaGeolocation', 'convert', 'geolib', '$q'];

	/* @ngInject */
	function distanceService($cordovaGeolocation, convert, geolib, $q) {
		var service = {
			getDistanceToOrigin: getDistanceToOrigin
		};
		return service;
		
		// ********************************************************
		
		function getDistanceToOrigin(origin) {
			var posOptions = {
				enableHighAccuracy: true
			};

			origin = origin.split(',');
			origin = {
				latitude: origin[0],
				longitude: origin[1]
			};

			var deferred = $q.defer();

			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function(position) {
					var distance = geolib.getDistance({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}, origin);

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
