(function () {
	'use strict';

	angular
		.module('mystyle.auth', [
			'ionic',
			'firebase'
		])
		.config(function ($stateProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'scripts/auth/login.html',
					controller: 'LoginController as vm',
					resolve: {
						signupModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('scripts/auth/signup.html', {
								scope: $rootScope.$new()
							});
						}
					}
				})
		})
		.run(function($rootScope, $state, authService, $timeout) {
			$rootScope.$on('loggedIn', function() {
				$state.go('app.home');
			});
			$rootScope.$on('loggedOut', function() {
				$state.go('login');
			});

			if (authService.user.isSignedIn) {
				$state.go('app.home');
			} else {
				$state.go('login');
			}
		});
})();