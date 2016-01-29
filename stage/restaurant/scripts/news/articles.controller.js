(function() {
	'use strict';

	angular
		.module('restaurant.news')
		.controller('ArticlesController', ArticlesController);

	ArticlesController.$inject = ['$scope', '$state', 'newsService'];

	/* @ngInject */
	function ArticlesController($scope, $state, newsService) {
		var vm = angular.extend(this, {
			articles: [],
			navigate: navigate,
			doRefresh: doRefresh
		});

		// ********************************************************************

		newsService.all().then(function(data) {
			vm.articles = data;
		});

		function navigate(articleId) {
			$state.go('app.article', { articleId: articleId });
		}

		function doRefresh() {
			setTimeout($scope.$broadcast('scroll.refreshComplete'), 16000);
		}
	}
})();