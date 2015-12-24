(function() {
	'use strict';

	angular
		.module('bizdir.catalogs', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.catalogs', {
					url: '/catalogs/:url',
					views: {
						'menuContent': {
							templateUrl: 'scripts/catalogs/catalogs.html',
							controller: 'CatalogsController as vm'
						}
					}
				})
				.state('app.catalog', {
					url: '/catalogs/:url/:catalogId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/catalogs/catalog.html',
							controller: 'CatalogController as vm'
						}
					}
				});
		});
})();