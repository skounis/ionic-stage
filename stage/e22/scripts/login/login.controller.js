(function() {
	'use strict';

	angular
		.module('catalogue.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', 'authService'];

	/* @ngInject */
	function LoginController($state, authService) {
		var vm = angular.extend(this, {
			login: login,
			error: false,
			code: '',
			email: ''
		});

		// ******************************************************

		function login() {
			authService.login(vm.email, vm.code)
				.then(function(isValid) {
					if (isValid) {
						vm.code = null;
						vm.email = null;
						$state.go('app.home');
					} else {
						vm.error = true;
					}
				}, function() {
						vm.error = true;
				});
		}
	}
})();
