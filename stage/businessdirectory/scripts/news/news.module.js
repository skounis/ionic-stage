(function() {
	'use strict';

	angular
		.module('bizdir.news', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.articles', {
					url: '/businesses/:businessId/articles',
					views: {
						'menuContent': {
							templateUrl: 'scripts/news/articles.html',
							controller: 'ArticlesController as vm'
						}
					}
				})
				.state('app.article', {
					url: '/businesses/:businessId/articles/:articleId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/news/article.html',
							controller: 'ArticleController as vm'
						}
					}
				});
		});
})();