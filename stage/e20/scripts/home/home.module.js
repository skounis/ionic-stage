(function() {
	'use strict';

	angular
		.module('localbiz.home', [
			'ionic',
			'ngCordova',
			'localbiz.common'
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
