(function() {
	'use strict';

	angular
		.module('firebase-starter.articles', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.articles', {
					url: '/articles',
					views: {
						'menuContent': {
							templateUrl: 'scripts/articles/articles.html',
							controller: 'ArticlesController as vm'
						}
					},
					resolve: {
						filterModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('scripts/articles/filter.html', {
								scope: $rootScope,
								animation: 'slide-in-up'
							});
						}
					}
				})
				.state('app.article', {
					url: '/articles/:id',
					views: {
						'menuContent': {
							templateUrl: 'scripts/articles/article.html',
							controller: 'ArticleController as vm'
						}
					},
					resolve: {
						addCommentModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('scripts/articles/add-comment.html', {
								scope: $rootScope,
								animation: 'slide-in-up'
							});
						}
					}
				});
		});
})();