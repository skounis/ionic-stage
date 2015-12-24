(function() {
	'use strict';

	angular
		.module('restaurant.categories')
		.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['$state', 'categoriesService'];

	/* @ngInject */
	function CategoriesController($state, categoriesService) {
		var vm = angular.extend(this, {
			categories: [],
			showProducts: showProducts
		});

		(function activate() {
			loadCategories();
		})();

		// ******************************************************

		function loadCategories() {
			return categoriesService.all().then(function(data) {
				vm.categories = data;
			});
		}

		function showProducts(category) {
			$state.go('app.products', {
				categoryId: category.guid,
				categoryName: category.title
			});
		}
	}
})();