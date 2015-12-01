(function() {
	'use strict';

	angular
		.module('localbiz.services')
		.factory('servicesService', servicesService);

	servicesService.$inject = ['$q', '$http'];

	/* @ngInject */
	function servicesService($q, $http) {
		var url = 'http://skounis.s3.amazonaws.com/mobile-apps/local-business/services.json';
		var result = [];

		var factory = {
			all: all,
			get: get
		};
		return factory;

		// ******************************************************************

		// http://stackoverflow.com/questions/17533888/s3-access-control-allow-origin-header
		function all(callback) {
			$http.get(url)
				.success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					result = data.result;
					callback(result);
				})
				.error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log('ERROR (Services):' + status);
					callback(result);
				});
		}

		function get(serviceId) {
			for (var i = 0; i < result.length; i++) {
				if (result[i].id === serviceId) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();
