(function() {
	'use strict';

	angular
		.module('firebase-starter.chats')
		.controller('ChatsLoginController', ChatsLoginController);

	ChatsLoginController.$inject = [
		'$scope', '$ionicModal', '$state', '$ionicLoading', 'chatsAuthService'];

	/* @ngInject */
	function ChatsLoginController($scope, $ionicModal, $state, $ionicLoading, chatsAuthService) {
		var vm = angular.extend(this, {
			user: {
				email: null,
				password: null
			},
			signIn: signIn,
			signUp: signUp,
			signOut: signOut,
			showChatRooms: showChatRooms,
			loggedUser: chatsAuthService.user
		});

		$ionicModal.fromTemplateUrl('scripts/chats/auth/chats-signup.html', {
			scope: $scope
		}).then(function(modal) {
			vm.modal = modal;
		});

		function signUp(user) {
			if (vm.user.email && vm.user.password && vm.user.displayname) {
				$ionicLoading.show({});
				chatsAuthService.signUp(user).then(function() {
					$ionicLoading.hide();
					vm.modal.hide();
				}).catch(function(error) {
					$ionicLoading.hide();
					alert('Error: ' + error);
				});
			} else {
				alert('Please fill all details');
			}
		}

		function signOut() {
			chatsAuthService.signOut();
		}

		function signIn() {
			if (vm.user.email && vm.user.password) {
				$ionicLoading.show({});
				chatsAuthService.signIn(vm.user.email, vm.user.password).then(function(authData) {
					$ionicLoading.hide();
				}).catch(function(error) {
					$ionicLoading.hide();
					alert('Authentication failed:' + error.message);
				});
			} else {
				alert('Please enter email and password both');
			}
		}

		function showChatRooms() {
			$state.go('app.chat-rooms');
		}
	}
})();