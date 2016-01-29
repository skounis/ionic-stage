(function() {
	'use strict';

	angular
		.module('restaurant.home', [
			'ionic',
			'ngCordova',
			'restaurant.common'
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
