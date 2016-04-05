(function() {
	'use strict';

	angular
		.module('bizdir.products', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.products', {
					url: '/businesses/:businessId/products',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products/products.html',
							controller: 'ProductsController as vm'
						}
					}
				})
				.state('app.product', {
					url: '/businesses/:businessId/products/:productId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products/product.html',
							controller: 'ProductController as vm'
						}
					}
				});

		});

})();