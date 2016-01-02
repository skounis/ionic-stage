(function() {
	'use strict';

	angular
		.module('catalogue.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['menuService'];

	/* @ngInject */
	function MenuController(menuService) {
		var vm = angular.extend(this, {
			// categories: categories
		});

		(function activate() {
			menuService.getCategoriesMenuItem().then(function(result){
				vm.categories = result;
			});
		})();


	}
})();
