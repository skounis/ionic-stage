(function() {
	'use strict';

	angular
		.module('restaurant.restaurant-cart')
		.factory('restaurantCartService', restaurantCartService);

	restaurantCartService.$inject = ['$rootScope', '$ionicPopup', '$state', '_', 'localStorageService'];

	/* @ngInject */
	function restaurantCartService($rootScope, $ionicPopup, $state, _, localStorageService) {
		var restaurantCartKey = 'restaurant-cart';
		var cart = localStorageService.get(restaurantCartKey) || [];

		var service = {
			addToCart: addToCart,
			showMyCart: showMyCart,
			deleteItem: deleteItem,
			changeQuantity: changeQuantity,
			flush: flush,
			getAll: getAll
		};
		return service;

		// ********************************************************

		function deleteItem(itemToRemove) {
			_.remove(cart, function(item) {
				return item === itemToRemove;
			});
			localStorageService.set(restaurantCartKey, cart);
		}

		function flush() {
			cart = [];
			localStorageService.set(restaurantCartKey, cart);
		}

		function showMyCart() {
			$state.go('app.restaurant-cart');
		}

		function getAll() {
			return cart;
		}

		function addToCart(cartItem) {
			var popup = createAddToCartPopup(cartItem.name);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				cart.push(cartItem);

				localStorageService.set(restaurantCartKey, cart);
			});
		}

		function changeQuantity(cartItem) {
			var popup = createAddToCartPopup(cartItem.name, cartItem.quantity);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				localStorageService.set(restaurantCartKey, cart);
			});
		}

		function createAddToCartPopup(title, quantity) {
			var scope = $rootScope.$new();
			scope.data = {
				quantity: quantity || 1
			};

			return {
				templateUrl: 'scripts/cart/add-to-cart.html',
				title: title,
				subTitle: 'Quantity:',
				scope: scope,
				buttons: [{
					text: 'Cancel',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}, {
					text: '<b>Add to cart</b>',
					type: 'button-positive',
					onTap: function(e) {
						var quantity = parseInt(scope.data.quantity);
						if (quantity > 0) {
							scope.data.quantity = quantity;
							return scope.data;
						} else {
							alert('Quantity should be greather then zero');
							e.preventDefault();
						}
					}
				}]
			};
		}
	}
})();