(function() {
	'use strict';

	angular
		.module('bizdir.services')
		.factory('servicesService', servicesService);

	servicesService.$inject = ['$http', '$q', '_'];

	/* @ngInject */
	function servicesService($http, $q, _) {
		var result = {};

		var service = {
			getItems: getItems,
			getItem: getItem
		};
		return service;

		// *******************************************************

		function getItems(url){
			return $http.get(url)
				.then(function(response) {
					result[url] = response.data.result;
					return result[url];
				});
		}

		function getItem(url, articleId) {
			var promise;
			if (result[url]) {
				promise = $q.when(result[url]);
			} else {
				promise = getItems(url);
			}
			
			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item.id === articleId;
				});
			});
		}
	}
})();
