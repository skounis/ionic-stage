(function() {
	'use strict';

	angular
		.module('localbiz.contact', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.contact', {
					url: '/contact',
					views: {
						'menuContent': {
							templateUrl: 'scripts/contact/contact.html',
							controller: 'ContactController as vm'
						}
					}
				});
		});
})();
