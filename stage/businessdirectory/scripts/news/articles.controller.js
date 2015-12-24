(function() {
	'use strict';

	angular
		.module('bizdir.news')
		.controller('ArticlesController', ArticlesController);

	ArticlesController.$inject = ['$scope', '$state', 'newsService'];

	/* @ngInject */
	function ArticlesController($scope, $state, newsService) {
		var url = $state.params.url;

		var vm = angular.extend(this, {
			articles: [],
			navigate: navigate
		});

		// ********************************************************************

		newsService.getItems(url).then(function(data){
			vm.articles = data;
		});

		function navigate(articleId) {
			$state.go('app.article', {
				url: url, 
				articleId: articleId
			});
		}
	}
})();