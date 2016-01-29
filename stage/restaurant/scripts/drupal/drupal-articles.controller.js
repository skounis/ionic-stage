(function() {
	'use strict';

	angular
		.module('restaurant.drupal')
		.controller('DrupalArticlesController', DrupalArticlesController);

	DrupalArticlesController.$inject = ['$state', 'drupalService'];

	/* @ngInject */
	function DrupalArticlesController($state, drupalService) {
		var vm = angular.extend(this, {
			articles: [],
			navigate: navigate
		});

		function activate() {
			getArticles();
		}
		activate();

		// ********************************************************************

		function getArticles() {
			drupalService.getArticles()
				.then(function(articles) {
					vm.articles = articles;
				});
		}

		function navigate(articleId) {
			$state.go('app.drupal-article', { articleId: articleId });
		}
	}
})();