(function() {
	'use strict';

	angular
		.module('restaurant.push', [
			'ionic',
			'ionic.service.core',
			'ionic.service.push',
			'base64'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.push', {
					url: '/push',
					views: {
						'menuContent': {
							templateUrl: 'scripts/push/push.html',
							controller: 'PushController as vm'
						}
					}
				});
		})
		.config(['$ionicAppProvider', 'ENV', function($ionicAppProvider, ENV) {
			// Identify app
			$ionicAppProvider.identify({
				// The App ID (from apps.ionic.io) for the server
				'app_id': ENV.ionicAppId,
				// The public API key all services will use for this app
				'api_key': ENV.ionicPublicKey,
				// The GCM project number
				'gcm_id': ENV.gcmId,
				'dev_push': true
			});
		}]);
})();
