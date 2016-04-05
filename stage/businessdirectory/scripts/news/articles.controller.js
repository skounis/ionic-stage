(function() {
	'use strict';

	angular
		.module('bizdir.news')
		.controller('ArticlesController', ArticlesController);

	ArticlesController.$inject = ['$state', 'newsService'];

	/* @ngInject */
	function ArticlesController($state, newsService) {
		var businessId = $state.params.businessId;

		var vm = angular.extend(this, {
			articles: [],
			navigate: navigate
		});

		// ********************************************************************

		newsService.getItems(businessId).then(function(data){
			vm.articles = data;
		});

		function navigate(articleId) {
			$state.go('app.article', {
				businessId: businessId,
				articleId: articleId
			});
		}
	}
})();