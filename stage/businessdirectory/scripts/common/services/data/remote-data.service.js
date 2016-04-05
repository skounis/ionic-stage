(function() {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('remoteDataService', remoteDataService);

	remoteDataService.$inject = ['$http', '$q', '_', 'ENV'];

	/* @ngInject */
	function remoteDataService($http, $q, _, ENV) {
		var catalogs = {};
		var products = {};
		var services = {};
		var news = {};
		var businesses;
		var common;

		var commonUrl = ENV.apiUrl + 'common.json';
		var businessUrl = ENV.apiUrl + 'businesses.json';

		var service = {
			getBusinesses: getBusinesses,
			getBusiness: getBusiness,
			getBusinessesByCategory: getBusinessesByCategory,
			getCategories: getCategories,
			getCatalogs: getCatalogs,
			getCatalog: getCatalog,
			getCommon: getCommon,
			getProducts: getProducts,
			getProduct: getProduct,
			getServices: getServices,
			getService: getService,
			getArticle: getArticle,
			getArticles: getArticles,
			getReviews: getReviews,
			addReview: addReview
		};
		return service;

		// ***********************************************************************

		function getArticles(businessId) {
			return getBusiness(businessId).then(function(business) {
				return $http.get(business.news)
					.then(function(response) {
						news[businessId] = response.data.result;
						return news[businessId];
					});
			})
		}

		function getArticle(businessId, articleId) {
			var promise;
			if (services[businessId]) {
				promise = $q.when(news[businessId]);
			} else {
				promise = getArticles(businessId);
			}

			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item.guid == articleId;
				});
			});
		}

		function getServices(businessId) {
			return getBusiness(businessId).then(function(business) {
				return $http.get(business.services)
					.then(function(response) {
						services[businessId] = response.data.result;
						return services[businessId];
					});
			});
		}

		function getService(businessId, serviceId) {
			var promise;
			if (services[businessId]) {
				promise = $q.when(services[businessId]);
			} else {
				promise = getServices(businessId);
			}

			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item.guid == serviceId;
				});
			});
		}

		function getProducts(businessId) {
			return getBusiness(businessId).then(function(business) {
				return $http.get(business.products)
					.then(function(response) {
						products[businessId] = response.data.result;
						return products[businessId];
					});
			});
		}

		function getProduct(businessId, productId) {
			var promise;
			if (products[businessId]) {
				promise = $q.when(products[businessId]);
			} else {
				promise = getProducts(businessId);
			}

			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item.guid == productId;
				});
			});
		}

		function getCategories() {
			return getBusinesses().then(function(businesses) {
				var categories = _.map(businesses, function(business) {
					return business.category;
				});
				categories = ['All'].concat(_.sortBy(_.unique(categories)));
				return categories;
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

		function getBusinesses() {
			return $http.get(businessUrl).then(function(response) {
				businesses = response.data.result
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
				var business = _.find(businesses, function(business) {
					return business.guid === businessId;
				});
				business = enrichBusiness(business);
				return business;
			});
		}

		function enrichBusiness(item) {
			if (!item.rating) {
				item.rating = {
					value: 0,
					reviews: 0
				}
			}
			return item;
		}

		function getCatalogs(businessId) {
			return getBusiness(businessId).then(function(business) {
				return $http.get(business.catalogs)
					.then(function(response) {
						catalogs[businessId] = response.data.result;
						return catalogs[businessId];
					});
			});
		}

		function getCatalog(businessId, catalogId) {
			var promise;
			if (catalogs[businessId]) {
				promise = $q.when(catalogs[businessId]);
			} else {
				promise = getCatalogs(businessId);
			}

			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item.guid == catalogId;
				});
			});
		}

		function getReviews(businessId) {
			return $q.when([{
				author: 'John Snow',
				comment: 'Good business',
				date: 1
			}, {
				author: 'Tyrion Lanniste',
				comment: 'Not bad',
				date: 2
			}, {
				author: 'Daenerys Targaryen',
				comment: 'Wonderful',
				date: 3
			}]);
		}

		function addReview(review) {
			alert('Not implemented: Please use a persistent storage for a real serialization experience');
			return $q.when(true);
		}

		function getCommon() {
			return $http.get(commonUrl).then(function(response) {
				common = response.data.result;
				return common;
			});
		}
	}
})();
