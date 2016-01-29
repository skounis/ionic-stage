(function() {
	'use strict';

	angular
		.module('restaurant.restaurant-delivery', [
			'ionic'
		])
		.config(function($stateProvider) {
			var baseUrl = 'scripts/delivery/';

			$stateProvider
				.state('app.delivery-method-selector', {
					url: '/delivery-method-selector',
					views: {
						'menuContent': {
							templateUrl: baseUrl + 'delivery-selector/delivery-method-selector.html',
							controller: 'DeliveryMethodSelectorController as vm'
						}
					}
				})
				.state('app.home-delivery', {
					url: '/home-delivery',
					views: {
						'menuContent': {
							templateUrl: baseUrl + 'home-delivery/home-delivery.html',
							controller: 'HomeDeliveryController as vm'
						}
					}
				})
				.state('app.take-away', {
					url: '/take-away',
					views: {
						'menuContent': {
							templateUrl: baseUrl + 'take-away/take-away.html',
							controller: 'TakeAwayController as vm'
						}
					}
				});
		});
})();