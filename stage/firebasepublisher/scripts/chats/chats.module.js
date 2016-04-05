(function() {
	'use strict';

	angular
		.module('firebase-starter.chats', [
			'ionic',
			'firebase'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.chats-login', {
					url: '/chats-login',
					views: {
						'menuContent': {
							templateUrl: 'scripts/chats/auth/chats-login.html',
							controller: 'ChatsLoginController as vm'
						}
					}
				})
				.state('app.chat-rooms', {
					url: '/chat-rooms',
					views: {
						'menuContent': {
							templateUrl: 'scripts/chats/rooms/chat-rooms.html',
							controller: 'ChatRoomsController as vm'
						}
					}
				})
				.state('app.chat-room', {
					url: '/chat-rooms/:roomId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/chats/room/chat-room.html',
							controller: 'ChatRoomController as vm'
						}
					}
				});
		});
})();