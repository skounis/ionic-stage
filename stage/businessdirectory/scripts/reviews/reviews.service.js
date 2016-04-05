(function() {
	'use strict';

	angular
		.module('bizdir.reviews')
		.factory('reviewsService', reviewsService);

	reviewsService.$inject = ['dataService'];

	/* @ngInject */
	function reviewsService(dataService) {
		var service = {
			getItems: getItems,
			addReview: addReview
		};
		return service;

		// *******************************************************

		function addReview(review) {
			review.date = new Date().getTime();
			return dataService.addReview(review);
		}

		function getItems(businessId) {
			return dataService.getReviews(businessId);
		}
	}
})();
