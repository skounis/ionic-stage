(function() {
	'use strict';

	angular
		.module('bizdir.businesses')
		.factory('businessesService', businessesService);

	businessesService.$inject = ['$http', '$q', '_', 'ENV'];

	/* @ngInject */
	function businessesService($http, $q, _, ENV) {
		var businesses;
		var common;

		var service = {
			getBusinesses: getBusinesses,
			getBusiness: getBusiness,
			getCommon: getCommon
		};
		return service;

		// ***************************************************************

		function getBusinesses() {
			return $http.get(ENV.apiEndpoint + 'businesses.json').then(function(response) {
				businesses = response.data.result;
				return businesses;
			});
		}

		function getBusiness(businessId) {
			var promise;

			if (businesses) {
				promise = $q.when(businesses);
			} else {
				promise = getBusinesses();
			}

			return promise.then(function(businesses) {
				return _.find(businesses, function(business) {
					return business.guid === businessId;
				});
			})
		}

		function getCommon() {
			return $http.get(ENV.apiEndpoint + 'common.json').then(function(response) {
				common = response.data.result;
				return common;
			});
		}
	}
})();
