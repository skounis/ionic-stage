(function() {
	'use strict';

	angular
		.module('restaurant.menu')
		.factory('menuService', menuService);

	menuService.$inject = ['_', 'dataService'];

	/* @ngInject */
	function menuService(_, dataService) {
		var service = {
			getCategoriesMenuItem: getCategoryMenuItems
		};
		return service;

		// ********************************************************

		function getCategoryMenuItems() {
			return  dataService.getCategories()
				.then(function(categories) {
					var items = [];

					_.each(categories, function(item) {
						items.push({
							title: item.title,
							categoryId: item.guid
						});
					});
					
					return items;
				});
		}
	}
})();