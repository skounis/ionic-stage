(function() {
	'use strict';

	angular
		.module('catalogue.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$state', 'products'];

	/* @ngInject */
	function ProductsController($state, products) {
		var vm = angular.extend(this, {
			products: products,
			showProductDetails: showProductDetails
		});

		(function activate() {
		})();

		// ******************************************************

		function showProductDetails(productId) {
			$state.go('app.product', {
				productId: productId
			});
		}
	}
})();