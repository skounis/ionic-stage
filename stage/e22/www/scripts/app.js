// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('catalogue', [
	// ionic
	'ionic',
	'ionic.service.core',
	'ionic.service.push',

	// 3rd party
	'LocalStorageModule',
	'ngCordova',
	'ionic-toast',

	// common
	'config',
	'gMaps',

	// components
	'catalogue.welcome',
	'catalogue.login',
	'catalogue.products',
	'catalogue.shops',
	'catalogue.news',
	'catalogue.map',
	'catalogue.home',
	'catalogue.push',
	'catalogue.menu',
	'catalogue.contact-us',
	'catalogue.wordpress',
	'catalogue.drupal',
	'catalogue.favorites',
])
	.value('_', window._)

	.run(function ($ionicPlatform, $rootScope) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)

			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})

	.config(function ($urlRouterProvider) {
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/welcome');
	});
