(function() {
	'use strict';

	angular
		.module('restaurant.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = [
		'$scope', '$stateParams', '$state', 'product', 'favoritesService',
			'ionicToast', 'restaurantCartService', '_'];

	/* @ngInject */
	function ProductController($scope, $stateParams, $state, product, favoritesService,
			ionicToast, restaurantCartService, _) {

		var categoryId = $stateParams.categoryId;
		product = angular.copy(product);

		var vm = angular.extend(this, {
			product: product,
			selectedPrice: product.price[0],
			addToCart: addToCart,
			isInFavorites: favoritesService.isInFavorites(product.guid),
			showCart: showCart,
			toggleFavorites: toggleFavorites,
			hasStandardOptions: false,
			hasExtraOptions: false,


		});


		(function activate() {
			 $scope.$on('$ionicView.enter', function() {
				if (vm.product) {
					vm.isInFavorites = favoritesService.isInFavorites(vm.product.guid);
				}
				if (vm.product.standardOptions && vm.product.standardOptions.length > 0) {
					return $scope.hasStandardOptions = true;
				}
				if (vm.product.extraOptions && vm.product.extraOptions.length > 0) {
					return $scope.hasExtraOptions = true;
				}
			});
		})();

		// **********************************************

		function showCart() {
			$state.go('app.restaurant-cart');
		}

		function addToCart() {
			restaurantCartService.addToCart({
				name: vm.product.title,
				price: vm.selectedPrice.value,
				currency: vm.selectedPrice.currency,
				size: vm.selectedPrice.name,
				picture: vm.product.pictures[0],
				description: vm.product.body,
				options:  getSelectedOptions(vm.product.standardOptions).concat(getSelectedOptions(vm.product.extraOptions)),
			});
		}

		function getSelectedOptions(options) {
			var selectedOptions = _.filter(options, function(option) {
				return option.selected;
			});

			return _.map(selectedOptions, function(option) {
				return {
					name: option.name,
					value: option.value || 0
				};
			});
		}

		function toggleFavorites() {
			if (vm.isInFavorites) {
				favoritesService.deleteItem(vm.product.guid);
				ionicToast.show('\'' + vm.product.title +
					'\' has been removed from your Favorites', 'bottom', false, 2000);

			} else {
				favoritesService.addItem({
					guid: vm.product.guid,
					categoryId: categoryId,
					thumb: vm.product.thumb,
					name: vm.product.title,
					description: vm.product.body
				});
				ionicToast.show('\'' + vm.product.title +
					'\' has been added to your Favorites', 'bottom', false, 2000);
			}
			vm.isInFavorites = !vm.isInFavorites;
		}
	}
})();
