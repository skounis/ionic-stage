(function() {
	'use strict';

	angular
		.module('restaurant.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', 'homeService', '$ionicSlideBoxDelegate'];

	/* @ngInject */
	function HomeController($state, homeService, $ionicSlideBoxDelegate) {
		var vm = angular.extend(this, {
			categories: [],
			products: [],
			showProducts: showProducts,
			showProductDetails: showProductDetails,
			storeName: ''
		});

		(function activate() {
			loadProducts();
			loadCategories();
			loadBusinessInfo();
		})();

		// ******************************************************

		function loadProducts() {
			homeService.getFeaturedProducts()
				.then(function(products) {
					vm.products = products;
					$ionicSlideBoxDelegate.update();
				});
		}

		function loadCategories() {
			homeService.getFeaturedCategories()
				.then(function(categories) {
					vm.categories = categories;
				});
		}

		function loadBusinessInfo() {
			homeService.getBusiness()
				.then(function(businessInfo) {
					vm.storeName = businessInfo.storeName;
				});
		}

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
