(function() {
	'use strict';

	angular
		.module('restaurant.map', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.map', {
				url: '/map',
				views: {
					'menuContent': {
						templateUrl: 'scripts/map/map.html',
						controller: 'MapController as vm'
					}
				},
				resolve: {
					businessInfo: function(mapService){
						return mapService.getBusiness();
					}
				}
			});
		});
})();
