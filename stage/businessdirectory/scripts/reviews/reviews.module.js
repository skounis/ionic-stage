(function() {
	'use strict';

	angular
		.module('bizdir.reviews', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.reviews', {
					url: '/businesses/:businessId/reviews',
					views: {
						'menuContent': {
							templateUrl: 'scripts/reviews/reviews.html',
							controller: 'ReviewsController as vm'
						}
					},
					resolve: {
						addReviewModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('scripts/reviews/add-review.html', {
								scope: $rootScope,
								animation: 'slide-in-up'
							});
						}
					}
				});
		});

})();