(function() {
	'use strict';

	angular
		.module('firebase-starter.articles')
		.controller('ArticlesController', ArticlesController);

	ArticlesController.$inject = ['articlesService', '$state', 'filterModal'];

	/* @ngInject */
	function ArticlesController(articlesService, $state, filterModal) {
		var vm = angular.extend(this, {
			items: [],
			categories: [],
			openDetails: openDetails,
			selectedCategory: 'all',
			sortBy: 'title',
			filterByCategory: filterByCategory,
			showFilter: showFilter
		});

		(function activate() {
			loadArticles();
			loadCategories();
		})();

		// ********************************************************************

		function applyFilters() {
			filterModal.hide();

			var scope = filterModal.scope;
			vm.selectedCategory = scope.vm.selectedCategory;
			vm.sortBy = scope.vm.sortBy;
			loadArticles();
		}

		function showFilter() {
			var scope = filterModal.scope;
			scope.vm = {
				categories: vm.categories,
				selectedCategory: vm.selectedCategory,
				sortBy: vm.sortBy,
				applyFilters: applyFilters
			};

			filterModal.show();
		}

		function filterByCategory(category) {
			vm.selectedCategory = category;
			loadArticles();
		}

		function loadArticles() {
			articlesService.selectAll(vm.selectedCategory).then(function(articles) {
				vm.items = articles;
			});
		}

		function loadCategories() {
			articlesService.loadCategories().then(function(categories) {
				vm.categories = categories;
			});
		}

		function openDetails(item) {
			$state.go('app.article', {
				id: item.$id
			});
		}
	}
})();