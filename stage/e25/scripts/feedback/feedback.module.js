(function() {
	'use strict';

	angular
		.module('mystyle.feedback', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.feedback', {
					url: '/feedback',
					cache: false,
					views: {
						'menuContent': {
							templateUrl: 'scripts/feedback/feedback.html',
							controller: 'FeedbackController as vm'
						}
					}
				});
		});
})();