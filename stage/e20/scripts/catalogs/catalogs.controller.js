(function() {
	'use strict';

	angular
		.module('localbiz.catalogs')
		.controller('CatalogsController', CatalogsController);

	CatalogsController.$inject = ['$scope', '$state', 'catalogsService'];

	/* @ngInject */
	function CatalogsController($scope, $state, catalogsService) {
		var vm = angular.extend(this, {
			catalogs: [],
			doRefresh: doRefresh,
			openCatalog: openCatalog
		});

		// ******************************************************

		catalogsService.all(function(data) {
			vm.catalogs = data;
		});

		function doRefresh() {
			setTimeout($scope.$broadcast('scroll.refreshComplete'), 16000);
		}

		function openCatalog(catalogId) {
			$state.go('app.catalog', {
				catalogId: catalogId
			});
		}
	}
})();