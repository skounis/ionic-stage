(function() {
	'use strict';

	angular
		.module('catalogue.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', 'authService'];

	/* @ngInject */
	function HomeController($state, authService) {
		var vm = angular.extend(this, {
			showCatalog: showCatalog,
			user: authService.getUser()
		});

		(function activate() {
		})();

		// ******************************************************

		function showCatalog() {
			$state.go('app.products');
		}
	}
})();
