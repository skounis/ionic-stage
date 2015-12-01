(function() {
	'use strict';

	angular
		.module('localbiz.catalogs')
		.controller('CatalogController', CatalogController);

	CatalogController.$inject = ['$scope', '$stateParams', 'externalAppsService', 'catalogsService'];

	/* @ngInject */
	function CatalogController($scope, $stateParams, externalAppsService, catalogsService) {
		var vm = angular.extend(this, {
			catalog: null,
			openUrl: openUrl,
			openPdf: openPdf
		});

		(function activate() {
			loadCatalog();
		})();
		// **********************************************

		function loadCatalog() {
			var catalogId = parseInt($stateParams.catalogId);

			catalogsService.get(catalogId)
				.then(function(catalog) {
					vm.catalog = catalog;
				});
		}

		function openPdf() {
			externalAppsService.openPdf(vm.catalog.pdf);
		}

		function openUrl() {
			externalAppsService.openPdf(vm.catalog.url);
		}
	}

})();