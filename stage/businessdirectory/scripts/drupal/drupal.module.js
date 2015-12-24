(function() {
	'use strict';

	angular
		.module('bizdir.drupal', [
			'ionic',
			'bizdir.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.drupal-articles', {
					url: '/drupal-articles',
					views: {
						'menuContent': {
							templateUrl: 'scripts/drupal/drupal-articles.html',
							controller: 'DrupalArticlesController as vm'
						}
					}
				})
				.state('app.drupal-article', {
					url: '/drupal-articles/:articleId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/drupal/drupal-article.html',
							controller: 'DrupalArticleController as vm'
						}
					}
				});
		});
})();