(function() {
	'use strict';

	angular
		.module('restaurant.restaurant-delivery')
		.controller('TakeAwayController', TakeAwayController);

	TakeAwayController.$inject = [
		'restaurantCartService', 'restaurantOrderProcessor',
		'$rootScope', '$ionicPopup', 'restaurantInfoService', '$ionicHistory', '$state'];

	/* @ngInject */
	function TakeAwayController(
		restaurantCartService, restaurantOrderProcessor, $rootScope,
		$ionicPopup, restaurantInfoService, $ionicHistory, $state) {
		var vm = angular.extend(this, {
			confirm: confirm,
			location: null,
			restaurant: null
		});

		(function activate() {
			loadRestaurantInfo();
		})();

		// ********************************************************************

		function loadRestaurantInfo() {
			restaurantInfoService.getRestaurantInfo().then(function(data) {
				vm.location = data.location;
				vm.restaurant = data.restaurant;
			});
		}

		function confirm() {
			var popup = createConfirmationPopup();

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				var items = restaurantCartService.getAll();
				restaurantOrderProcessor.sendTakeAwayConfirmation(items, vm.restaurant, result.email)
					.then(function() {
						restaurantCartService.flush();
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$state.go('app.home');
					}, function() {
						alert("Error when sending email");
					});
			});
		}
		
		function createConfirmationPopup() {
			var scope = $rootScope.$new();
			scope.data = {
				email: null
			};

			return {
				templateUrl: 'scripts/delivery/take-away/delivery-confirmation.html',
				title: 'Confirmation dialog',
				subTitle: 'Email',
				scope: scope,
				buttons: [{
					text: 'Cancel',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}, {
					text: '<b>Confirm</b>',
					type: 'button-positive',
					onTap: function(e) {
						var email = scope.data.email;
						if (email && email.length > 3) {
							return scope.data;
						} else {
							alert('Enter correct email');
							e.preventDefault();
						}
					}
				}]
			};
		}
	}
})();
