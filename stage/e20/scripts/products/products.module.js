(function() {
	'use strict';

	angular
		.module('localbiz.products', [
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
					}
				})
				.state('app.product', {
					url: '/products/:productId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products/product.html',
							controller: 'ProductController as vm'
						}
					}
				});

		});

})();