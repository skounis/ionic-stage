(function() {
	'use strict';

	angular
		.module('restaurant.news')
		.factory('newsService', newsService);

	newsService.$inject = ['$http', '$q', 'dataService'];

	/* @ngInject */
	function newsService($http, $q, dataService) {

		var result = [];

		var service = {
			all: all,
			get: get
		};
		return service;

		// *******************************************************

		// http://stackoverflow.com/questions/17533888/s3-access-control-allow-origin-header
		function all() {
			return dataService.getNewsUrl().then(function(url) {
				return $http.get(url).then(function(response) {
					result = response.data.result;
					return result;
				});
			});
		}

		function get(articleId) {
			// we take an article from cache but we can request ir from the server
			for (var i = 0; i < result.length; i++) {
				if (result[i].id === articleId) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();
