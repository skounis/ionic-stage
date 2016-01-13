(function() {
	'use strict';

	angular
		.module('catalogue.products', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.products', {
					url: '/products',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products/products.html',
							controller: 'ProductsController as vm'
						}
					},
					resolve: {
						products: function(productsService) {
							return productsService.all();
						},
						points: function(productsService) {
							return productsService.points()
						}
					}
				})
				.state('app.product', {
					url: '/products/:productId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products/product.html',
							controller: 'ProductController as vm'
						}
					},
					resolve: {
						product: function($stateParams, $state, productsService) {
							var productId = $stateParams.productId;
							return productsService.get(productId);
						}
					}
				});

		});

})();