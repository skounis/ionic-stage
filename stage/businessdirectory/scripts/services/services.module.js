(function() {
	'use strict';

	angular
		.module('bizdir.services', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.services', {
					url: '/services/:url',
					views: {
						'menuContent': {
							templateUrl: 'scripts/services/services.html',
							controller: 'ServicesController as vm'
						}
					}
				})
				.state('app.service', {
					url: '/services/:url/:serviceId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/services/service.html',
							controller: 'ServiceController as vm'
						}
					}
				});

		});

})();