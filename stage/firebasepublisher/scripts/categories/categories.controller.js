(function() {
	'use strict';

	angular
		.module('firebase-starter.categories')
		.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['listsService'];

	/* @ngInject */
	function CategoriesController(listsService) {
		var vm = angular.extend(this, {
			items: listsService.getTags()
		});

		(function activate() {
		})();

		// ********************************************************************
	}
})();