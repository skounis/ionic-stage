(function() {
	'use strict';

	angular
		.module('restaurant.push')
		.controller('PushController', PushController);

	PushController.$inject = ['$ionicPopup', 'pushSenderService', 'pushTokenService'];

	/* @ngInject */
	function PushController($ionicPopup, pushSenderService, pushTokenService) {
		var vm = angular.extend(this, {
			identifyUser: identifyUser,
			registerDevice: registerDevice,
			sendMessage: sendMessage,
			identified: false,
			registered: false,
			message: ''
		});

		// ********************************************************************

		function sendMessage() {
			pushSenderService.send(vm.message);
			vm.message = null;
		}

		function registerDevice() {
			pushTokenService.registerDevice()
				.then(function() {
					vm.registered = true;
					$ionicPopup.alert({
						title: 'Push service',
						template: 'Device registered'
					});
				});
		}

		function identifyUser() {
			pushTokenService.identifyUser()
				.then(function() {
					vm.identified = true;
					$ionicPopup.alert({
						title: 'Push service',
						template: 'User identified'
					});
				});
		}
	}
})();