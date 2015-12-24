(function() {
	'use strict';

	angular
		.module('restaurant.favorites')
		.controller('FavoritesController', FavoritesController);

	FavoritesController.$inject = ['businessInfo', '$state', 'favoritesService', 'favoritesSenderService'];

	/* @ngInject */
	function FavoritesController(businessInfo, $state, favoritesService, favoritesSenderService) {
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
			favoritesSenderService.sendFavorites(businessInfo.email, vm.items);
		}

		function showProductDetails(product) {
			$state.go('app.product', {
				productId: product.guid,
				categoryId: product.categoryId
			});
		}
	}
})();
