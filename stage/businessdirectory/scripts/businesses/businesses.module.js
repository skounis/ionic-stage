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
							templateUrl: 'scripts/businesses/businesses.html',
							controller: 'BusinessesController as vm',
							resolve: {
								filterModal: function($ionicModal, $rootScope) {
									return $ionicModal.fromTemplateUrl('scripts/businesses/filter.html', {
										scope: $rootScope,
										animation: 'slide-in-up'
									});
								}
							}
						}
					}
				})
				.state('app.business-details', {
					url: '/businesses/:businessId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/businesses/business.html',
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
