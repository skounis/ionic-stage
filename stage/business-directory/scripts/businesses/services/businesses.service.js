(function() {
	'use strict';

	angular
		.module('bizdir.businesses')
		.factory('businessesService', businessesService);

	businessesService.$inject = ['dataService', '$q', '_'];

	/* @ngInject */
	function businessesService(dataService, $q, _) {
		var businesses;
		var common;

		var service = {
			getBusinesses: getBusinesses,
			getBusinessesByCategory: getBusinessesByCategory,
			getBusiness: getBusiness,
			getCommon: getCommon,
			getCategories: getCategories
		};
		return service;

		// ***************************************************************

		function getCategories(businesses) {
			var categories = _.map(businesses, function (business) {
				return business.category;
			});
			categories = ['All'].concat(_.sortBy(_.unique(categories)));
			return categories;
		};

		function getBusinesses() {
			return dataService.getBusinesses().then(function(data) {
				businesses = data;
				return businesses;
			});
		}

		function getBusinessesByCategory(category) {
			var promise;

			if (businesses) {
				promise = $q.when(businesses);
			} else {
				promise = getBusinesses();
			}

			return promise.then(function(businesses) {
				return _.filter(businesses, function(business) {
					return category === 'All' || business.category === category;
				})
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
			return dataService.getCommon().then(function(data) {
				common = data;
				return common;
			});
		}
	}
})();
