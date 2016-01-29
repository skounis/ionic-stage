(function() {
	'use strict';

	angular
		.module('bizdir.favorite-businesses')
		.factory('favoriteBusinessesService', favoriteBusinessesService);

	favoriteBusinessesService.$inject = ['localStorageService', 'businessesService', '_'];

	/* @ngInject */
	function favoriteBusinessesService(localStorageService, businessesService, _) {
		var service = {
			addToFavorites: addToFavorites,
			removeFromFavorites: removeFromFavorites,
			isInFavorites: isInFavorites,
			getFavoriteBusinesses: getFavoriteBusinesses
		};
		return service;

		// ***************************************************************
		
		function getFavoriteBusinesses() {
			return businessesService.getBusinesses().then(function(items) {
				var favorites = localStorageService.get('favorites') || [];
				return _.filter(items, function(item) {
					return favorites.indexOf(item.guid) >= 0;
				});
			});
		}
		
		function addToFavorites(businessId) {
			var favorites = localStorageService.get('favorites') || [];
			if (favorites.indexOf(businessId) === -1) {
				favorites.push(businessId);
				localStorageService.set('favorites', favorites);
			}
		}
		
		function removeFromFavorites(businessId) {
			var favorites = localStorageService.get('favorites') || [];
			var index = favorites.indexOf(businessId);
			if (index >= 0) {
				favorites.splice(index, 1);
				localStorageService.set('favorites', favorites);
			}
		}
		
		function isInFavorites(businessId) {
			var favorites = localStorageService.get('favorites') || [];
			return favorites.indexOf(businessId) >= 0;
		}
	}
})();
