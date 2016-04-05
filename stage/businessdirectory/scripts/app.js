// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bizdir' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'bizdir.controllers' is found in controllers.js
angular.module('bizdir', [
	'ionic',
	'ionic.service.core',
	'ionic.service.push',
	'ngCordova',

	'firebase',
	'config',
	'gMaps',
	'ionic.rating',

	'bizdir.products',
	'bizdir.news',
	'bizdir.map',
	'bizdir.businesses',
	'bizdir.favorite-businesses',
	'bizdir.push',
	'bizdir.menu',
	'bizdir.services',
	'bizdir.catalogs',
	'bizdir.contact-us',
	'bizdir.wordpress',
	'bizdir.drupal',
	'bizdir.reviews'
])

.value('_', window._)

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
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

.config(function($urlRouterProvider) {
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/businesses');
});
