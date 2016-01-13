(function () {
	'use strict';

	angular
		.module('mystyle.home', [
			'ionic',
			'ngCordova',
			'mystyle.common'
		])
		.config(function ($stateProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/home.html',
							controller: 'HomeController as vm'
						}
					}
				})
				.state('app.news-item', {
					url: '/news/:newsId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/news-item.html',
							controller: 'NewsItemController as vm',
							resolve: {
								news: function ($stateParams, newsService) {
									var newsId = parseInt($stateParams.newsId);
									return newsService.get(newsId);
								}
							}
						}
					}
				});
		});
})();