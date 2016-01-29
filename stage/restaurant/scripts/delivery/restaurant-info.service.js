(function() {
	'use strict';

	angular
		.module('restaurant.restaurant-delivery')
		.factory('restaurantInfoService', restaurantInfoService);

	restaurantInfoService.$inject = ['dataService'];

	/* @ngInject */
	function restaurantInfoService(dataService) {
		var service = {
			getRestaurantInfo: getRestaurantInfo
		};
		return service;

		// ************************************************************

		function getRestaurantInfo() {
			return dataService.getBusiness().then(function(data) {
				var origin = data.officeLocation.split(',');
				origin = {
					lat: parseFloat(origin[0]),
					lon: parseFloat(origin[1])
				};
				var location = {
					origin: origin,
					zoom: 15,
					markers: [{
						lat: origin.lat,
						lon: origin.lon,
						name: data.storeName
					}]
				};
				var restaurant = {
					name: data.storeName,
					address: data.address,
					email: data.email
				};
				return {
					location: location,
					restaurant: restaurant
				}
			});
		}
	}
})();
