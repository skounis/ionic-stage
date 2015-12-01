(function() {
	'use strict';

	angular
		.module('localbiz.store-locations', [
			'ionic',
			'ngCordova',
			'localbiz.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.store-locations', {
					url: '/store-locations',
					views: {
						'menuContent': {
							templateUrl: 'scripts/store-locations/store-locations.html',
							controller: 'StoreLocationsController as vm'
						}
					}
				});
		});
})();
