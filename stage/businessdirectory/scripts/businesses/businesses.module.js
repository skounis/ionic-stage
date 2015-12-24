(function() {
	'use strict';

	angular
		.module('bizdir.businesses', [
			'ionic',
			'ngCordova',
			'LocalStorageModule',
			'bizdir.common',
			'ionic-toast'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.businesses', {
					url: '/businesses',
					views: {
						'menuContent': {
							templateUrl: 'scripts/businesses/directory/businesses.html',
							controller: 'BusinessesController as vm'
						}
					}
				})
				.state('app.favorite-businesses', {
					url: '/favorite-businesses/:random',
					views: {
						'menuContent': {
							templateUrl: 'scripts/businesses/favorites/favorite-businesses.html',
							controller: 'FavoriteBusinessesController as vm'
						}
					}
				})
				.state('app.business-details', {
					url: '/businesses/:businessId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/businesses/details/business-details.html',
							controller: 'BusinessDetailsController as vm',
							resolve: {
								business: function($stateParams, businessesService) {
									return businessesService.getBusiness($stateParams.businessId);
								}
							}
						}
					}
				});
		});
})();
