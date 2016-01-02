// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('catalogue', [
	'ionic',
	'config',
	'ionic.service.core',
	'ionic.service.push',
	'catalogue.categories',
	'catalogue.products',
	'catalogue.news',
	'catalogue.map',
	'catalogue.home',
	'catalogue.push',
	'catalogue.menu',
	'catalogue.contact-us',
	'catalogue.wordpress',
	'catalogue.drupal',
	'catalogue.favorites',

	'LocalStorageModule',
	'gMaps',
	'ngCordova',
	'ionic-toast'
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

.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($cordovaNetwork, $q, $rootScope, $injector) {
		return {
			request: function(config) {
				if (!ionic.Platform.isReady) {
					return config;
				}

				if (config.url.indexOf('http') !== 0) {
					return config;
				}

				// Make the request protocol agonistic
				var re = /^http(s)?:\/\//gmi;
				var subst = '//';

				config.url = config.url.replace(re, subst);

				var isOnline = getNetworkStatus();

				if (isOnline) {
					return config;
				}

				var $ionicPopup = $injector.get('$ionicPopup');
				var alertPopup = $ionicPopup.alert({
					title: 'Alert',
					template: 'There is no internet connection'
				});

				return $q.reject('No internet connection');
			},
			response: function(response) {
				return response;
			}
		};

		function getNetworkStatus() {

			// On Android and when only the 3G interface is on
			// the return connection type is `unknown` even the device is online.
			// To work around this we will assume that only Connection.NONE
			// is declaring an offline device. Which is returned when data are
			// disabled.

			var isPluginAvailable = !!navigator.connection;

			if (isPluginAvailable) {

				var networkState = JSON.stringify(navigator.connection); //.type
				console.log('Internet connectivity chech. NetworkState: ' + networkState);

				// HACK: this is a temporary hack due to Android 3G related issue
				//       described above.
				if (navigator.connection.type.toLowerCase() == 'unknown'){
					return true;
				}else {
					return $cordovaNetwork.isOnline();
				}
			}

			return navigator.onLine;
		}
	});
})

.config(function($urlRouterProvider) {
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');
});
