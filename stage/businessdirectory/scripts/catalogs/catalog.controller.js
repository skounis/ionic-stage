(function() {
	'use strict';

	angular
		.module('bizdir.catalogs')
		.controller('CatalogController', CatalogController);

	CatalogController.$inject = ['$scope', '$stateParams', 'externalAppsService', 'catalogsService'];

	/* @ngInject */
	function CatalogController($scope, $stateParams, externalAppsService, catalogsService) {
		var url = $stateParams.url;
		var catalogId = parseInt($stateParams.catalogId);

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
			catalogsService.getItem(url, catalogId)
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