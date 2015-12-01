(function() {
	'use strict';

	angular
		.module('localbiz.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$cordovaGeolocation', '$q', 'geolib', 'convert'];

	/* @ngInject */
	function homeService($cordovaGeolocation, $q, geolib, convert) {
		var officeLocation = {
			// Get your location by using the address bar of your
			// browser when you have opened Google Maps
			// eg: https://www.google.gr/maps/@40.9045901,24.3436803,16z?hl=en
			//
			// The information there is provided in latitude,longitude order
			latitude: 40.9045901,
			longitude: 24.3436803,
		};

		var menuItems = [{
			title: 					'Services',
			titleSecondary: 'الموقع',
			path: 					'app.services',
			icon: 					'icon ion-android-list'
		}, {
			title: 					'Website',
			titleSecondary: 'الفروع',
			path:						'ext:https://about.me/stavros.kounis',
			icon: 					'icon ion-calendar'
		}, {
			title: 					'Catalog',
			titleSecondary: 'الموقع',
			path: 					'app.catalog',
			icon: 					'icon ion-ios-cart'
		}, {
			title: 					'Instagram',
			titleSecondary: 'الفروع',
			path: 					'ext:https://instagram.com/krystal_bick/',
			icon: 					'icon ion-social-instagram-outline'

		}, {
			title: 					'Store locations',
 			titleSecondary: 'الموقع',
			path: 					'app.store-locations',
			icon: 					'icon ion-map'
		}, {
			title: 					'About',
 			titleSecondary: 'الفروع',
			path: 					'app.about',
			icon: 					'icon ion-person-stalker'
		}, {
			title: 					'Contact',
 			titleSecondary: 'الموقع',
			path: 					'app.contact',
			icon: 					'icon ion-email'
		}];

		var service = {
			menuItems: menuItems,
			officeLocation: officeLocation,
			getDistanceToOrigin: getDistanceToOrigin
		};
		return service;

		// ***************************************************************

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
