(function() {
	'use strict';

	angular
		.module('catalogue.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state'];

	/* @ngInject */
	function HomeController($state) {
		var vm = angular.extend(this, {
			showCatalog: showCatalog
		});

		(function activate() {
		})();

		// ******************************************************

		function showCatalog() {
			$state.go('app.products');
		}
	}
})();
