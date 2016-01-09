(function() {
	'use strict';

	angular
		.module('mystyle.home', [
			'ionic',
			'ngCordova',
			'mystyle.common'
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