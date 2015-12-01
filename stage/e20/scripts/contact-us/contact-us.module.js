(function() {
	'use strict';

	angular
		.module('localbiz.contact-us', [
			'ionic',
			'ngCordova',
			'localbiz.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.contact-us', {
					url: '/contact-us',
					views: {
						'menuContent': {
							templateUrl: 'scripts/contact-us/contact-us.html',
							controller: 'ContactUsController as vm'
						}
					}
				});
		});
})();
