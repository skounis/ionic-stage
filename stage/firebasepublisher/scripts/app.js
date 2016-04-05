// Ionic firebase-starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'firebase-starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'firebase-starter.controllers' is found in controllers.js
angular.module('firebase-starter', [
	'ionic',

	'ngCordova',
	'firebase',
	'ionic.rating',

	'config',
	'firebase-starter.infrastructure',
	'firebase-starter.common',
	'firebase-starter.articles',
	'firebase-starter.menu',
	'firebase-starter.tags',
	'firebase-starter.categories',
	'firebase-starter.chats'
])

.value('_', window._)

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)

		if (window.cordova && window.cordova.plugins.Keyboard) {
			window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($urlRouterProvider, $compileProvider) {
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/articles');
});
