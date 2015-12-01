(function() {
	'use strict';

	angular
		.module('localbiz.catalog')
		.controller('CatalogController', CatalogController);

	CatalogController.$inject = ['$scope','externalAppsService', 'catalog'];

	/* @ngInject */
	function CatalogController($scope, externalAppsService, catalog) {
		var vm = angular.extend(this, {
			catalog: catalog[0],
			openUrl: openUrl,
			openPdf: openPdf
		});

		(function activate() {

		})();

		// **********************************************

		function openPdf() {
			externalAppsService.openPdf(vm.catalog.pdf);
		}

		function openUrl() {
			externalAppsService.openPdf(vm.catalog.url);
		}

	}
})();
