(function() {
	'use strict';

	angular
		.module('catalogue.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', 'products'];

	/* @ngInject */
	function HomeController($state, products) {
		var vm = angular.extend(this, {
			products: products,
			showProducts: showProducts,
			showProductDetails: showProductDetails
		});

		(function activate() {
		})();

		// ******************************************************

		function showProductDetails(product) {
			$state.go('app.featured-product', {
				productId: product.guid
			});
		}

		function showProducts() {
			$state.go('app.products');
		}
	}
})();
