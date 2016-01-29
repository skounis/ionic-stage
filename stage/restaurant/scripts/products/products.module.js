(function() {
	'use strict';

	angular
		.module('restaurant.products', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.products', {
					url: '/products/:categoryId?categoryName',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products/products.html',
							controller: 'ProductsController as vm'
						}
					}
				})
				.state('app.featured-product', {
					url: '/products/featured/:productId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products/product.html',
							controller: 'ProductController as vm'
						}
					},
					resolve: {
						product: function($stateParams, $state, productsService) {
							var productId = $stateParams.productId;
							return productsService.getFeatured(productId);
						}
					}
				})
				.state('app.product', {
					url: '/products/:categoryId/:productId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products/product.html',
							controller: 'ProductController as vm'
						}
					},
					resolve: {
						product: function($stateParams, $state, productsService) {
							var categoryId = $stateParams.categoryId;
							var productId = $stateParams.productId;
							return productsService.get(categoryId, productId);
						}
					}
				});

		});

})();