(function() {
	'use strict';

	angular
		.module('catalogue.contact-us', [
			'ionic',
			'ngCordova',
			'catalogue.common'
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
					},
					resolve: {
						businessInfo: function(contactUsService){
							return contactUsService.getBusiness();
						}
          }
				});
		});
})();
