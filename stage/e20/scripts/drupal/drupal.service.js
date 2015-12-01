(function() {
	'use strict';

	angular
		.module('localbiz.drupal')
		.factory('drupalService', drupalService);

	drupalService.$inject = ['$http', '$q', '_', 'htmlToPlainText'];

	/* @ngInject */
	function drupalService($http, $q, _, htmlToPlainText) {
		var url = 'http://demo.titaniumtemplates.com/drupal/rest/views/rest_api';
		var articles = [];

		var service = {
			getArticles: getArticles,
			getArticle: getArticle
		};
		return service;

		////////////////

		function parseImgSrc(tag) {
			var match = tag.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);
			return match[1];
		}

		function getArticles() {
			return $http.get(url)
				.then(function(response) {
					articles = [];
					_.each(response.data, function(item) {
						articles.push({
							id: item.nid,
							title: item['node_title'],
							brief: item.teaser,
							image: parseImgSrc(item.image),
							content: item.body,
							tags: item.tags
						});
					});
					return articles;
				});
		}

		function getArticle(articleId) {
			if (articles.length) {
				return $q.when(_.find(articles, 'id', articleId));
			} else {
				var deferred = $q.defer();

				getArticles()
					.then(function() {
						deferred.resolve(_.find(articles, 'id', articleId));
					});

				return deferred.promise;
			}
		}
	}
})();