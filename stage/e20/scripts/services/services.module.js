(function() {
	'use strict';

	angular
		.module('localbiz.services', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.services', {
					url: '/services',
					views: {
						'menuContent': {
							templateUrl: 'scripts/services/services.html',
							controller: 'ServicesController as vm'
						}
					}
				})
				.state('app.service', {
					url: '/services/:serviceId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/services/service.html',
							controller: 'ServiceController as vm'
						}
					}
				});

		});

})();