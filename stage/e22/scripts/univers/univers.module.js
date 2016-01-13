(function() {
	'use strict';

	angular
		.module('catalogue.univers', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.univers', {
					url: '/univers',
					views: {
						'menuContent': {
							templateUrl: 'scripts/univers/univers.html',
							controller: 'UniversController as vm'
						}
					}
				})
				.state('app.univer', {
					url: '/univers/:univerId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/univers/univer.html',
							controller: 'UniverController as vm'
						}
					}
				});
		});
})();