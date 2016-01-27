(function() {
	'use strict';

	angular
		.module('catalogue.terms', [
			'ionic',
			'ngCordova'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.terms', {
					url: '/terms',
					views: {
						'menuContent': {
							templateUrl: 'scripts/terms/terms.html',
							controller: 'TermsController as vm'
						}
					}
				});
		});
})();
