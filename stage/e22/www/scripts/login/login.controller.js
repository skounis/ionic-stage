(function() {
	'use strict';

	angular
		.module('catalogue.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', 'loginService'];

	/* @ngInject */
	function LoginController($state, loginService) {
		var vm = angular.extend(this, {
			login: login,
			error: false,
			code: ''
		});

		// ******************************************************

		function login() {
			loginService.validate(vm.code).then(function(isValid) {
				if (isValid) {
					$state.go('app.home');
				} else {
					vm.error = true;
				}
			});
		}
	}
})();
