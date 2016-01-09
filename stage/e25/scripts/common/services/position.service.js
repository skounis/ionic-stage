(function () {
	'use strict';

	angular
		.module('mystyle.common')
		.factory('positionService', positionService);

	positionService.$inject = ['$cordovaGeolocation', '$q'];

	/* @ngInject */
	function positionService($cordovaGeolocation, $q) {
		var watch;

		var service = {
			getCurrentPosition: getCurrentPosition,
			startWatching: startWatching
		};
		return service;

		// ************************************************

		function startWatching(callback) {
			var watchOptions = {
				frequency: 1000,
				timeout: 3000,
				enableHighAccuracy: false // may cause errors if true
			};

			if (!watch) {
				watch = $cordovaGeolocation.watchPosition(watchOptions);
				watch.then(null, function(err) {
					console.log("Error while watching for position changes: " + JSON.stringify(err));
				}, function(position) {
					processGeolocation(position).then(function(params) {
						if (callback) {
							callback(params);
						}
					});
				});
			}
		}

		function getCurrentPosition() {
			var posOptions = {
				timeout: 10000,
				enableHighAccuracy: false
			};

			return $cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(processGeolocation);
		}

		function processGeolocation(position) {
			var params = [];
			for (var key in position.coords) {
				params.push({
					key: key,
					value: position.coords[key]
				});
			}
			var date = new Date(position.timestamp);
			params.push({
				key: 'timestamp',
				value: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
			});

			return $q.when(params);
		}
	}
})();