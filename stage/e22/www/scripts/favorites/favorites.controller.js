(function() {
	'use strict';

	angular
		.module('catalogue.favorites')
		.controller('FavoritesController', FavoritesController);

	FavoritesController.$inject = ['$state', 'favoritesService', 'favoritesSenderService'];

	/* @ngInject */
	function FavoritesController($state, favoritesService, favoritesSenderService) {
		var vm = angular.extend(this, {
			items: [],
			deleteItem: deleteItem,
			sendFavorites: sendFavorites,
			showProductDetails: showProductDetails
		});

		(function activate() {
			loadItems();
		})();

		// ********************************************************************

		function loadItems() {
			vm.items = favoritesService.getAll();
		}

		function deleteItem(item) {
			favoritesService.deleteItem(item.guid);
			loadItems();
		}

		function sendFavorites() {
			favoritesSenderService.sendFavorites(vm.items);
		}
		
		function showProductDetails(product) {
			$state.go('app.product', {
				productId: product.guid,
				categoryId: product.categoryId
			});
		}
	}
})();
