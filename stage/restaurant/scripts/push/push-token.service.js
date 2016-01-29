(function() {
	'use strict';

	angular
		.module('restaurant.push')
		.service('pushTokenService', pushTokenService);

	pushTokenService.$inject = ['$ionicPush', '$ionicUser', '$rootScope'];

	/* @ngInject */
	function pushTokenService($ionicPush, $ionicUser, $rootScope) {
		var userId = '';
		var token = null;

		// Handles incoming device tokens
		$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
			console.log('Ionic Push: Got token ', data.token, data.platform);
			token = data.token;
		});

		var service = {
			getDeviceToken: getDeviceToken,
			registerDevice: registerDevice,
			identifyUser: identifyUser,
			identified: false
		};

		return service;

		// ***************************************

		function getDeviceToken() {
			return token;
		}

		// Registers a device for push notifications and stores its token
		function registerDevice() {
			console.log('Ionic Push: Registering a device');

			// Register with the Ionic Push service.  All parameters are optional.
			return $ionicPush.register({
				canShowAlert: true, //Can pushes show an alert on your screen?
				canSetBadge: true, //Can pushes update app icon badges?
				canPlaySound: true, //Can notifications play a sound?
				canRunActionsOnWake: true, //Can run actions outside the app,
				onNotification: function(notification) {
					// Handle new push notifications here
					console.log(notification);
					// alert("notification received:" + JSON.stringify(notification));
					return true;
				}
			});
		}

		// Identifies a user with the Ionic User service
		function identifyUser() {
			console.log('Ionic User: Identifying with Ionic User service');

			var user = $ionicUser.get();
			if (!user['user_id']) {
				// Set your user_id here, or generate a random one.
				user['user_id'] = $ionicUser.generateGUID();
			}

			// Identify your user with the Ionic User Service
			return $ionicUser.identify(user).then(function() {
				service.identified = true;
				userId = user['user_id'];
			});
		}
	}
})();
