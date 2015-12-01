(function() {
	'use strict';

	angular
		.module('localbiz.news', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.articles', {
					url: '/articles',
					views: {
						'menuContent': {
							templateUrl: 'scripts/news/articles.html',
							controller: 'ArticlesController as vm'
						}
					}
				})
				.state('app.article', {
					url: '/articles/:articleId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/news/article.html',
							controller: 'ArticleController as vm'
						}
					}
				});
		});
})();