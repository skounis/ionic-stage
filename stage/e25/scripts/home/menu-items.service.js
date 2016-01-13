(function() {
	'use strict';

	angular
		.module('mystyle.home')
		.factory('menuItems', menuItems);

	menuItems.$inject = [];

	/* @ngInject */
	function menuItems() {
		var data = [{
			title: 'My Style',
			path: 'gallery-preview',
			icon: 'ion-images'
		}, {
			title: 'Stylists',
			path: 'empty/Stylists',
			icon: 'ion-android-apps'
		}, {
			title: 'Chats',
			path: 'chat-rooms',
			icon: 'ion-chatbubbles'
		}];

		return data;
	}
})();
