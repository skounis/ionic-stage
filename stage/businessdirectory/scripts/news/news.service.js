(function() {
	'use strict';

	angular
		.module('bizdir.news')
		.factory('newsService', newsService);

	newsService.$inject = ['dataService'];

	/* @ngInject */
	function newsService(dataService) {
		var service = {
			getItems: getItems,
			getItem: getItem
		};
		return service;

		// *******************************************************

		function getItems(businessId) {
			return dataService.getArticles(businessId);
		}

		function getItem(businessId, articleId) {
			return dataService.getArticle(businessId, articleId);
		}
	}
})();
