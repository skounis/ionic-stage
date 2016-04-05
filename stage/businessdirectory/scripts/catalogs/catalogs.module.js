(function() {
	'use strict';

	angular
		.module('bizdir.catalogs', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.catalogs', {
					url: '/businesses/:businessId/catalogs',
					views: {
						'menuContent': {
							templateUrl: 'scripts/catalogs/catalogs.html',
							controller: 'CatalogsController as vm'
						}
					}
				})
				.state('app.catalog', {
					url: '/businesses/:businessId/catalogs/:catalogId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/catalogs/catalog.html',
							controller: 'CatalogController as vm'
						}
					}
				});
		});
})();