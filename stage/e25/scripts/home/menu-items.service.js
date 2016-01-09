(function() {
	'use strict';

	angular
		.module('mystyle.home')
		.factory('menuItems', menuItems);

	menuItems.$inject = [];

	/* @ngInject */
	function menuItems() {
		var data = [
		// {
		// 	title: 'Home',
		// 	path: 'home',
		// 	icon: 'ion-ios-home'
		// }, {
		// 	title: 'Feedback',
		// 	path: 'feedback',
		// 	icon: 'ion-images'
		// },
		{
			title: 'My Style',
			path: 'galleries',
			icon: 'ion-images'
		}, {
			title: 'Chat',
			path: 'chats-login',
			icon: 'ion-chatbubbles'
		}];

		return data;
	}
})();
