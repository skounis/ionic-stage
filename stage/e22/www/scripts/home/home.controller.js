(function() {
	'use strict';

	angular
		.module('catalogue.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', 'products', 'categories'];

	/* @ngInject */
	function HomeController($state, products, categories) {
		var vm = angular.extend(this, {
			categories: categories,
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

		function showProducts(category) {
			$state.go('app.products', {
				categoryId: category.guid,
				categoryName: category.title
			});
		}
	}
})();
