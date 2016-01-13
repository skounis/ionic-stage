(function() {
	'use strict';

	angular
		.module('mystyle.home')
		.factory('newsService', newsService);

	newsService.$inject = ['$http', '$q', '_'];

	/* @ngInject */
	function newsService($http, $q, _) {
		var newsList;
		var url = '//skounis-dev.s3.amazonaws.com/mystyle-ionic-e25/feed.json';

		var service = {
			all: all,
			get: get
		};
		return service;

		// ******************************************************************

		function all() {
			return $http.get(url).then(function(response) {
				newsList = response.data.result;
				return newsList;
			});
		}

		function get(newsId) {
			var promise;
			if (newsList) {
				promise = $q.when(newsList);
			} else {
				promise = all();
			}

			return promise.then(function(newsList) {
				return _.find(newsList, function(news) {
					return news.id == newsId;
				});
			});
		}
	}
})();
