(function() {
	'use strict';

	angular
		.module('bizdir.services', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.services', {
					url: '/businesses/:businessId/services',
					views: {
						'menuContent': {
							templateUrl: 'scripts/services/services.html',
							controller: 'ServicesController as vm'
						}
					}
				})
				.state('app.service', {
					url: '/businesses/:businessId/services/:serviceId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/services/service.html',
							controller: 'ServiceController as vm'
						}
					}
				});

		});

})();