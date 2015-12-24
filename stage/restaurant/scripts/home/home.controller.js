(function() {
	'use strict';

	angular
		.module('restaurant.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', 'products', 'categories', 'businessInfo'];

	/* @ngInject */
	function HomeController($state, products, categories, businessInfo) {
		var vm = angular.extend(this, {
			categories: categories,
			products: products,
			showProducts: showProducts,
			showProductDetails: showProductDetails,
			storeName: businessInfo.storeName
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
