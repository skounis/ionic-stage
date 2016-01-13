(function() {
	'use strict';

	angular
		.module('catalogue.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['authService', '$state', '$ionicSideMenuDelegate'];

	/* @ngInject */
	function MenuController(authService, $state, $ionicSideMenuDelegate) {
		var vm = angular.extend(this, {
			logout: logout
		});

		// ********************************************************

		function logout() {
			$ionicSideMenuDelegate.toggleLeft();
			authService.logout();
			$state.go('welcome');
		}
	}
})();