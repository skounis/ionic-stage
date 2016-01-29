(function() {
	'use strict';

	angular
		.module('restaurant.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$state', 'productsService'];

	/* @ngInject */
	function ProductsController($state, productsService) {
		var categoryId = $state.params.categoryId;
		var categoryName = $state.params.categoryName;

		var vm = angular.extend(this, {
			products: [],
			showProductDetails: showProductDetails,
			showCart: showCart,
			category: categoryName
		});

		(function activate() {
			loadProducts();
		})();

		// ******************************************************

		function showCart() {
			$state.go('app.restaurant-cart');
		}

		function loadProducts() {
			return productsService.all(categoryId).then(function(data) {
				vm.products = data;
			});
		}

		function showProductDetails(productId) {
			$state.go('app.product', {
				categoryId: categoryId,
				productId: productId
			});
		}
	}
})();