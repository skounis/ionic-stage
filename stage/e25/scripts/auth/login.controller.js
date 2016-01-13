(function() {
	'use strict';

	angular
		.module('mystyle.auth')
		.controller('LoginController', LoginController);

	LoginController.$inject = [
		'signupModal', '$ionicLoading', 'authService'];

	/* @ngInject */
	function LoginController(signupModal, $ionicLoading, authService) {
		var vm = signupModal.scope.vm = angular.extend(this, {
			user: {
				email: null,
				password: null
			},
			signIn: signIn,
			signUp: signUp,
			signOut: signOut,
			loggedUser: authService.user,
			signupModal: signupModal
		});

		function signUp(user) {
			if (vm.user.email && vm.user.password && vm.user.displayname) {
				$ionicLoading.show({});
				authService.signUp(user).then(function() {
					$ionicLoading.hide();
					vm.signupModal.hide();
				}).catch(function(error) {
					$ionicLoading.hide();
					alert('Error: ' + error);
				});
			} else {
				alert('Please fill all details');
			}
		}

		function signOut() {
			authService.signOut();
		}

		function signIn() {
			if (vm.user.email && vm.user.password) {
				$ionicLoading.show({});
				authService.signIn(vm.user.email, vm.user.password).then(function() {
					$ionicLoading.hide();
				}).catch(function(error) {
					$ionicLoading.hide();
					alert('Authentication failed:' + error.message);
				});
			} else {
				alert('Please enter email and password both');
			}
		}
	}
})();