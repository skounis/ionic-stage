(function() {
	'use strict';

	angular
		.module('catalogue.login', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'scripts/login/login.html',
					controller: 'LoginController as vm'
				});
		});
})();
