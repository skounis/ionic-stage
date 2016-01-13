(function() {
	'use strict';

	angular
		.module('catalogue.featured-products', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.featured-products', {
					url: '/featured-products',
					views: {
						'menuContent': {
							templateUrl: 'scripts/featured-products/featured-products.html',
							controller: 'FeaturedProductsController as vm'
						}
					}
				})
				.state('app.featured-product', {
					url: '/featured-products/:id',
					views: {
						'menuContent': {
							templateUrl: 'scripts/featured-products/featured-product.html',
							controller: 'FeaturedProductController as vm'
						}
					}
				});
		});
})();