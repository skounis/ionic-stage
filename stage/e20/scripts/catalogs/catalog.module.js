(function() {
	'use strict';

	angular
		.module('localbiz.catalogs', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.catalog', {
					url: '/catalog',
					views: {
						'menuContent': {
							templateUrl: 'scripts/catalogs/catalog.html',
							controller: 'CatalogController as vm'
						}
					}
				});
		});
})();
