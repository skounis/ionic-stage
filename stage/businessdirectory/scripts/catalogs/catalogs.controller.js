(function() {
	'use strict';

	angular
		.module('bizdir.catalogs')
		.controller('CatalogsController', CatalogsController);

	CatalogsController.$inject = ['$scope', '$state', 'catalogsService'];

	/* @ngInject */
	function CatalogsController($scope, $state, catalogsService) {
		var businessId = $state.params.businessId;

		var vm = angular.extend(this, {
			catalogs: [],
			openCatalog: openCatalog
		});

		(function activate() {
			loadCatalogs();
		})();
		// ******************************************************

		function loadCatalogs() {
			catalogsService.getItems(businessId).then(function(data) {
				vm.catalogs = data;
			});
		}

		function openCatalog(catalogId) {
			$state.go('app.catalog', {
				businessId: businessId,
				catalogId: catalogId
			});
		}
	}
})();