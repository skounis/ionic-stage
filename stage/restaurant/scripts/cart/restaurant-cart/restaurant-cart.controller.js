(function() {
	'use strict';

	angular
		.module('restaurant.restaurant-cart')
		.controller('RestaurantCartController', RestaurantCartController);

	RestaurantCartController.$inject = ['$ionicListDelegate', '_', 'restaurantCartService', '$state'];

	/* @ngInject */
	function RestaurantCartController($ionicListDelegate, _, restaurantCartService, $state) {
		var vm = angular.extend(this, {
			items: [],
			proceedToPayment: proceedToPayment,
			changeQuantity: changeQuantity,
			deleteItem: deleteItem,
			getItemTotal: getItemTotal,
			total: 0,
			currency: null
		});

		(function activate() {
			loadItems();
		})();

		// ********************************************************************

		function loadItems() {
			vm.items = restaurantCartService.getAll();
			calculateTotalAmount();
		}

		function proceedToPayment() {
			if (!vm.currency) return;
			
			$state.go('app.delivery-method-selector');
		}

		function flushCart() {
			restaurantCartService.flush();
			vm.items = [];
			calculateTotalAmount();
		}

		function calculateTotalAmount() {
			vm.currency = null;
			var total = 0;
			_.each(vm.items, function(item) {
				total += getItemTotal(item);
				vm.currency = item.currency;
			});
			vm.total = total;
		}

		function getItemTotal(item) {
			var total = item.price * item.quantity;
			if (item.options) {
				_.each(item.options, function(option) {
					total += option.value * item.quantity;
				});
			}
			return total;
		}

		function changeQuantity(item) {
			restaurantCartService.changeQuantity(item)
				.then(loadItems);
			$ionicListDelegate.closeOptionButtons();
		}

		function deleteItem(item) {
			restaurantCartService.deleteItem(item);
			loadItems();
		}
	}
})();
