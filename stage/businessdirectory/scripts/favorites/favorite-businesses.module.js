(function() {
	'use strict';

	angular
		.module('bizdir.favorite-businesses', [
			'ionic',
			'ngCordova',
			'LocalStorageModule',
			'bizdir.common',
			'ionic-toast'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.favorite-businesses', {
					url: '/favorite-businesses/:random',
					views: {
						'menuContent': {
							templateUrl: 'scripts/favorites/favorite-businesses.html',
							controller: 'FavoriteBusinessesController as vm'
						}
					}
				});
		});
})();
