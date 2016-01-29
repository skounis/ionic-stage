(function() {
	'use strict';

	angular
		.module('bizdir.contact-us', [
			'ionic',
			'ngCordova',
			'bizdir.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.contact-us', {
					url: '/contact-us/:businessId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/contact-us/contact-us.html',
							controller: 'ContactUsController as vm'
						}
					},
					resolve: {
						business: function($stateParams, businessesService) {
							return businessesService.getBusiness($stateParams.businessId);
						}
					}
				});
		});
})();
