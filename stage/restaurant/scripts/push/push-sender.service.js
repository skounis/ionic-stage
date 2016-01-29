(function() {
	'use strict';

	angular
		.module('restaurant.push')
		.factory('pushSenderService', pushSenderService);

	pushSenderService.$inject = ['$http', 'pushTokenService', 'ENV', '$base64'];

	/* @ngInject */
	function pushSenderService($http, pushTokenService, ENV, $base64) {
		var pushUrl = 'https://push.ionic.io/api/v1/push';

		var service = {
			send: send
		};
		return service;

		// ***********************************************

		function send(message) {
			var token = pushTokenService.getDeviceToken();
			console.log('Send push using token: ' + token);

			var data = {
				'tokens': [
					token
				],
				'notification': {
					'alert': message,
					'ios': {
						'badge': 1,
						'expiry': 1423238641,
						'priority': 10,
						'contentAvailable': true
					},
					'android':{
      			'collapseKey':'foo',
      			'delayWhileIdle':true,
      			'timeToLive':300,
      			'payload':{
        			'key1':'value',
        			'key2':'value'
      			}
					}
				}
			};

			var auth = ENV.ionicPrivateKey + ':';

			$http({
				method: 'POST',
				url: pushUrl,
				data: data,
				headers: {
					'Authorization': 'Basic ' + $base64.encode(auth),
					'Content-Type': 'application/json',
					'X-Ionic-Application-Id': ENV.ionicAppId
				}
			}).then(function(response) {
				console.log(response);
				// alert(JSON.stringify(response));
			});
		}
	}
})();
