(function() {
	'use strict';

	angular
		.module('bizdir.reviews')
		.controller('ReviewsController', ReviewsController);

	ReviewsController.$inject = ['$state', 'reviewsService', 'addReviewModal', '$ionicPopup'];

	/* @ngInject */
	function ReviewsController($state, reviewsService, addReviewModal, $ionicPopup) {
		var businessId = $state.params.businessId;

		var vm = angular.extend(this, {
			reviews: [],
			showAddReviewView: showAddReviewView
		});

		(function activate() {
			loadReviews();
		})();
		// ******************************************************

		function showAddReviewView() {
			var scope = addReviewModal.scope;
			scope.vm = {
				submit: addReview,
				cancel: function() {
					addReviewModal.hide();
				},
				review: {}
			};

			addReviewModal.show();
		}

		function addReview() {
			var scope = addReviewModal.scope;
			var review = scope.vm.review;

			if (!review.author || !review.comment) {
				$ionicPopup.alert({
					title: 'Validation',
					template: 'You must feel \'Full name\' and \'Review\' fields',
					buttons: [{
						text: 'OK',
						type: 'button'
					}]
				});
				return;
			}
			addReviewModal.hide();

			review.business = businessId;
			reviewsService.addReview(review).then(function() {
				loadReviews();
			});
		}

		function loadReviews() {
			reviewsService.getItems(businessId).then(function(data) {
				vm.reviews = data;
			});
		}
	}
})();