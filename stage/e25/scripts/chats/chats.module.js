(function() {
	'use strict';

	angular
		.module('mystyle.chats', [
			'ionic',
			'firebase'
		])
		.config(function($stateProvider) {
			$stateProvider
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