(function() {
	'use strict';

	angular
		.module('firebase-starter.articles')
		.controller('ArticleController', ArticleController);

	ArticleController.$inject = [
		'$ionicSlideBoxDelegate', 'articlesService', '$stateParams', 'addCommentModal', '$ionicPopup'];

	/* @ngInject */
	function ArticleController($ionicSlideBoxDelegate, articlesService, $stateParams, addCommentModal, $ionicPopup) {
		var vm = angular.extend(this, {
			rating: 0,
			item: null,
			showAddComment: showAddComment
		});

		(function activate() {
			loadItem();
		})();

		// ********************************************************************

		function showAddComment() {
			var scope = addCommentModal.scope;
			scope.vm = {
				submit: addComment,
				cancel: function() {
					addCommentModal.hide();
				},
				comment: {}
			};

			addCommentModal.show();
		}

		function addComment() {
			var scope = addCommentModal.scope;
			var comment = scope.vm.comment;

			if (!comment.author || !comment.text) {
				$ionicPopup.alert({
					title: 'Validation',
					template: 'You must feel \'Full name\' and \'Comment\' fields',
					buttons: [{
						text: 'OK',
						type: 'button'
					}]
				});
				return;
			}
			addCommentModal.hide();
			articlesService.addCommentAndRate(vm.item, comment);
		}

		function loadItem() {
			articlesService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;
				$ionicSlideBoxDelegate.update();
			});
		}
	}
})();
