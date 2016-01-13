(function() {
	'use strict';

	angular
		.module('mystyle.chats')
		.factory('chatMessagesService', chatMessagesService);

	chatMessagesService.$inject = ['$q', '$firebaseArray', 'firebaseDb', 'chatRoomsService', 'authService'];

	/* @ngInject */
	function chatMessagesService($q, $firebaseArray, firebaseDb, chatRoomsService, authService) {
		var selectedRoomId;
		var messages;

		var service = {
			all: all,
			remove: remove,
			get: get,
			getSelectedRoomName: getSelectedRoomName,
			selectRoom: selectRoom,
			send: send

		};
		return service;

		// *********************************************

		function all() {
			return messages;
		}

		function remove(message) {
			messages.$remove(message).then(function(ref) {
				return ref.key() === message.$id;
			});
		}

		function get(messageId) {
			for (var i = 0; i < messages.length; i++) {
				if (messages[i].id === parseInt(messageId)) {
					return messages[i];
				}
			}
			return null;
		}

		function getSelectedRoomName() {
			var selectedRoom;
			if (selectedRoomId && selectedRoomId != null) {
				selectedRoom = chatRoomsService.get(selectedRoomId);
				if (selectedRoom) {
					return selectedRoom.name;
				}
			}

			return null;
		}

		function selectRoom(roomId) {
			console.log('selecting the room with id: ' + roomId);
			selectedRoomId = roomId;
			if (!isNaN(roomId)) {
				var room = firebaseDb.child('rooms').child(selectedRoomId);
				messages = $firebaseArray(room.child('messages'));
			}
		}

		function send(message) {
			var from = authService.user;
			console.log('sending message from :' + from.displayName + ' & message is ' + message);
			if (from && message) {
				var chatMessage = {
					from: from.displayName,
					message: message,
					createdAt: window.Firebase.ServerValue.TIMESTAMP
				};
				messages.$add(chatMessage).then(function() {
					console.log('message added');
				});
			}
		}
	}
})();