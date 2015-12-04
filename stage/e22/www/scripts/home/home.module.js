(function() {
	'use strict';

	angular
		.module('catalogue.home', [
			'ionic',
			'ngCordova',
			'catalogue.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/home.html',
							controller: 'HomeController as vm'
						}
					},
					resolve: {
						products: function(homeService) {
							return homeService.getFeaturedProducts();
						}
					}
				});
		});
})();
