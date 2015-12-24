(function() {
	'use strict';

	angular
		.module('bizdir.catalogs')
		.controller('CatalogsController', CatalogsController);

	CatalogsController.$inject = ['$scope', '$state', 'catalogsService'];

	/* @ngInject */
	function CatalogsController($scope, $state, catalogsService) {
		var url = $state.params.url;

		var vm = angular.extend(this, {
			catalogs: [],
			openCatalog: openCatalog
		});

		(function activate() {
			loadCatalogs();
		})();
		// ******************************************************

		function loadCatalogs() {
			catalogsService.getItems(url).then(function(data) {
				vm.catalogs = data;
			});
		}

		function openCatalog(catalogId) {
			$state.go('app.catalog', {
				url: url,
				catalogId: catalogId
			});
		}
	}
})();