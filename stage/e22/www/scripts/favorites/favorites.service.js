(function() {
	'use strict';

	angular
		.module('catalogue.favorites')
		.factory('favoritesService', favoritesService);

	favoritesService.$inject = ['$rootScope', '_', 'localStorageService'];

	/* @ngInject */
	function favoritesService($rootScope, _, localStorageService) {
		var items = localStorageService.get('favorites') || [];

		var service = {
			addItem: addItem,
			deleteItem: deleteItem,
			getAll: getAll,
			isInFavorites: isInFavorites
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