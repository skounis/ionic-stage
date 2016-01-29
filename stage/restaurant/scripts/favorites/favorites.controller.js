(function() {
	'use strict';

	angular
		.module('restaurant.favorites')
		.controller('FavoritesController', FavoritesController);

	FavoritesController.$inject = ['$state', 'favoritesService', 'favoritesSenderService'];

	/* @ngInject */
	function FavoritesController($state, favoritesService, favoritesSenderService) {
		var businessInfo;
		var vm = angular.extend(this, {
			items: [],
			deleteItem: deleteItem,
			sendFavorites: sendFavorites,
			showProductDetails: showProductDetails
		});

		(function activate() {
			loadItems();
			loadBusinessInfo();
		})();

		// ********************************************************************

		function loadBusinessInfo() {
			favoritesService.getBusiness()
				.then(function(business) {
					businessInfo = business;
				});
		}

		function loadItems() {
			vm.items = favoritesService.getAll();
		}

		function deleteItem(item) {
			favoritesService.deleteItem(item.guid);
			loadItems();
		}

		function sendFavorites() {
			debugger;
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
