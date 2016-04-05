(function() {
	'use strict';

	angular
		.module('firebase-starter.chats')
		.controller('ChatRoomsController', ChatRoomsController);

	ChatRoomsController.$inject = ['$state', 'chatRoomsService'];

	/* @ngInject */
	function ChatRoomsController($state, chatRoomsService) {
		var vm = angular.extend(this, {
			rooms: chatRoomsService.getAll(),
			openChatRoom: openChatRoom
		});

		(function activate() {
		})();

		// ********************************************************************

		function openChatRoom(roomId) {
			$state.go('app.chat-room', {
				roomId: roomId
			});
		}
	}
})();