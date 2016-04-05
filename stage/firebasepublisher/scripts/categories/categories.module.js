(function() {
	'use strict';

	angular
		.module('firebase-starter.categories', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.categories', {
					url: '/categories',
					views: {
						'menuContent': {
							templateUrl: 'scripts/categories/categories.html',
							controller: 'CategoriesController as vm'
						}
					}
				});
		});
})();