(function() {
	'use strict';

	angular
		.module('localbiz.catalog', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.catalog', {
					url: '/catalog',
					views: {
						'menuContent': {
							templateUrl: 'scripts/catalog/catalog.html',
							controller: 'CatalogController as vm'
						}
					},
					resolve: {
						catalog: function(catalogService) {
							return catalogService.getCatalog();
						}
					}
				});
		});
})();
