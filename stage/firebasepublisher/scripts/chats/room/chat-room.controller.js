(function() {
	'use strict';

	angular
		.module('firebase-starter.chats')
		.controller('ChatRoomController', ChatRoomController);

	ChatRoomController.$inject = ['$state', 'chatMessagesService'];

	/* @ngInject */
	function ChatRoomController($state, chatMessagesService) {
		var vm = angular.extend(this, {
			IM: {
				textMessage: ''
			},
			messages: null,
			roomName: null,
			sendMessage: sendMessage,
			remove: remove
		});

		(function activate() {
			chatMessagesService.selectRoom($state.params.roomId);
			var roomName = chatMessagesService.getSelectedRoomName();

			// Fetching Chat Records only if a Room is Selected
			if (roomName) {
				vm.roomName = ' - ' + roomName;
				vm.messages = chatMessagesService.all();
			}
		})();

		// ********************************************************************

		function sendMessage(msg) {
			chatMessagesService.send(msg);
			vm.IM.textMessage = '';
		}

		function remove(chat) {
			chatMessagesService.remove(chat);
		}
	}
})();