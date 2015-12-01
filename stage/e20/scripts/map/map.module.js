(function() {
	'use strict';

	angular
		.module('localbiz.map', [
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
				}
			});
		});
})();