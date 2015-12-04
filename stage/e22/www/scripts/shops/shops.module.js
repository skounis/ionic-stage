(function() {
	'use strict';

	angular
		.module('catalogue.shops', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.shops', {
					url: '/shops',
					views: {
						'menuContent': {
							templateUrl: 'scripts/shops/shops.html',
							controller: 'ShopsController as vm'
						}
					},
					resolve: {
						shops: function(shopsService) {
							return shopsService.all();
						}
					}
				});
		});

})();