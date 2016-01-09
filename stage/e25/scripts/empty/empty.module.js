(function() {
	'use strict';

	angular
		.module('mystyle.empty', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.empty', {
					url: '/empty/:title',
					cache: false,
					views: {
						'menuContent': {
							templateUrl: 'scripts/empty/empty.html',
							controller: 'EmptyController as vm'
						}
					}
				});
		});
})();