(function() {
	'use strict';

	angular
		.module('localbiz.catalogs', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.catalogs', {
					url: '/catalogs',
					views: {
						'menuContent': {
							templateUrl: 'scripts/catalogs/catalogs.html',
							controller: 'CatalogsController as vm'
						}
					}
				})
				.state('app.catalog', {
					url: '/catalogs/:catalogId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/catalogs/catalog.html',
							controller: 'CatalogController as vm'
						}
					}
				});
		});
})();