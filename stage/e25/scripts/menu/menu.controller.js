(function() {
	'use strict';

	angular
		.module('mystyle.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['authService', '$rootScope'];

	/* @ngInject */
	function MenuController(authService, $rootScope) {
		angular.extend(this, {
			authService: authService,
			logout: logout
		});

		function logout() {
			authService.signOut();
		}
	}
})();