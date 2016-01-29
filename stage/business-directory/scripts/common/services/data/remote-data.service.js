(function () {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('remoteDataService', remoteDataService);

	remoteDataService.$inject = ['$http', '$q', '_', 'ENV'];

	/* @ngInject */
	function remoteDataService($http, $q, _, ENV) {
		var urlPrefix = 'https://skounis.s3.amazonaws.com/mobile-apps/business-directory/';

		var commonUrl = urlPrefix + 'common.json';
		var businessUrl = urlPrefix + 'businesses.json';

		var service = {
			getBusinesses: getBusinesses,
			getCommon: getCommon
		};

		return service;

		function getBusinesses() {
			return $http.get(businessUrl).then(function(response) {
				return response.data.result;
			});
		}

		function getCommon() {
			return $http.get(commonUrl).then(function(response) {
				return response.data.result;
			});
		}
	}
})();
