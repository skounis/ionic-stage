(function() {
	'use strict';

	angular
		.module('localbiz.about', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.about', {
					url: '/about',
					views: {
						'menuContent': {
							templateUrl: 'scripts/about/about.html',
							controller: 'AboutController as vm'
						}
					}
				});
		});
})();
