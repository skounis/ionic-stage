(function() {
	'use strict';

	angular
		.module('restaurant.favorites')
		.factory('favoritesService', favoritesService);

	favoritesService.$inject = ['dataService', '$rootScope', '_', 'localStorageService'];

	/* @ngInject */
	function favoritesService(dataService, $rootScope, _, localStorageService) {
		var items = localStorageService.get('favorites') || [];

		var service = {
			addItem: addItem,
			deleteItem: deleteItem,
			getAll: getAll,
			isInFavorites: isInFavorites,
			getBusiness: dataService.getBusiness
		};
		return service;

		// ********************************************************

		function deleteItem(guid) {
			_.remove(items, function(item) {
				return item.guid === guid;
			});
			localStorageService.set('favorites', items);
		}

		function getAll() {
			return items;
		}

		function addItem(favoriteItem) {
			items.push(favoriteItem);
			localStorageService.set('favorites', items);
		}

		function isInFavorites(guid) {
			return _.some(items, 'guid', guid);
		}
	}
})();
