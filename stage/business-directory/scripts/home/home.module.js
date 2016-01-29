(function() {
	'use strict';

	angular
		.module('bizdir.home', [
			'ionic',
			'ngCordova',
			'bizdir.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/home.html',
							controller: 'HomeController as vm'
						}
					}
				});
		});
})();
