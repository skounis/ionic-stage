(function() {
	'use strict';

	angular
		.module('restaurant.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', '$state', 'productsService'];

	/* @ngInject */
	function ProductsController($scope, $state, productsService) {
		var categoryId = $state.params.categoryId;
		var categoryName = $state.params.categoryName;

		var vm = angular.extend(this, {
			products: [],
			doRefresh: doRefresh,
			showProductDetails: showProductDetails,
			category: categoryName
		});

		(function activate() {
			loadProducts();
		})();

		// ******************************************************

		function loadProducts() {
			return productsService.all(categoryId).then(function(data) {
				vm.products = data;
			});
		}

		function doRefresh() {
			loadProducts().then(function() {
				$scope.$broadcast('scroll.refreshComplete');
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