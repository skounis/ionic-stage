(function() {
	'use strict';

	angular
		.module('bizdir.catalogs')
		.controller('CatalogController', CatalogController);

	CatalogController.$inject = ['$stateParams', 'externalAppsService', 'catalogsService', '$ionicSlideBoxDelegate'];

	/* @ngInject */
	function CatalogController($stateParams, externalAppsService, catalogsService, $ionicSlideBoxDelegate) {
		var businessId = $stateParams.businessId;
		var catalogId = $stateParams.catalogId;

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
			catalogsService.getItem(businessId, catalogId)
				.then(function(catalog) {
					vm.catalog = catalog;
					$ionicSlideBoxDelegate.update();
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