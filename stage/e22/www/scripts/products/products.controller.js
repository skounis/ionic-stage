(function() {
	'use strict';

	angular
		.module('catalogue.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$state', 'products', 'points'];

	/* @ngInject */
	function ProductsController($state, products, points) {
		var vm = angular.extend(this, {
			points: points,
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