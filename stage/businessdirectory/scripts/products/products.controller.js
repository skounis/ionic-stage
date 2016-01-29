(function() {
	'use strict';

	angular
		.module('bizdir.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', '$state', 'productsService'];

	/* @ngInject */
	function ProductsController($scope, $state, productsService) {
		var url = $state.params.url;

		var vm = angular.extend(this, {
			products: [],
			showProductDetails: showProductDetails
		});

		(function() {
			loadProducts();
		})();
		// ******************************************************

		function loadProducts() {
			productsService.getItems(url).then(function(data) {
				vm.products = data;
			});
		}

		function showProductDetails(productId) {
			$state.go('app.product', {
				url: url,
				productId: productId
			});
		}
	}
})();