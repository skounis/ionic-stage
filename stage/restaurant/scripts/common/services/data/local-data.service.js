(function () {
	'use strict';

	angular
		.module('restaurant.common')
		.factory('localDataService', localDataService);

	localDataService.$inject = ['$http', '$q', '_'];

	/* @ngInject */
	function localDataService($http, $q, _) {
		var urlPrefix = 'misc/';
		var categoriesUrl = urlPrefix + 'categories.json';
		var featuredProductsUrl = urlPrefix + 'featured.json';
		var businessUrl = urlPrefix + 'business.json';
		var newsUrl = urlPrefix + 'news.json';
		var categories = [];
		var featuredProducts = [];
		var products = {};

		var service = {
			getCategories: getCategories,
			getProducts: getProducts,
			getProduct: getProduct,
			getFeaturedCategories: getFeaturedCategories,
			getFeaturedProducts: getFeaturedProducts,
			getFeaturedProduct: getFeaturedProduct,
			getBusiness: getBusiness,
			getNewsUrl: getNewsUrl
		};

		return service;

		function getBusiness(){
			return $http.get(businessUrl).then(function(response) {
				var business = response.data.result;
				return business;
			});
		}

		function getNewsUrl() {
			if (newsUrl) {
				return $q.when(newsUrl);
			}
		}

		function getCategories() {
			return $http.get(categoriesUrl).then(function(response) {
				categories = response.data.result;

				_.each(categories, function(category) {
					var index = category.url.lastIndexOf('/');
					category.url = urlPrefix + category.url.substring(index + 1);
				});

				return categories;
			});
		}

		function getFeaturedCategories() {
			return getCategories().then(function(categories) {
				return _.filter(categories, 'featured', true);
			});
		}

		function getProducts(categoryGuid) {
			var category = _.find(categories, function(category) {
				return category.guid === categoryGuid;
			});
			return $http.get(category.url).then(function(response) {
				products[categoryGuid] = response.data.result;
				_.each(products[categoryGuid], function(product) {
					// We do not need this touch. price should always coming with a currency property 
					// _.each(product.price, function(price) {
					// 	price.currency = price.value[0];
					// 	price.value = parseFloat(price.value.substring(1));
					// });
				});
				return products[categoryGuid];
			});
		}

		function getFeaturedProducts() {
			return $http.get(featuredProductsUrl).then(function(response) {
				featuredProducts = response.data.result;
				return featuredProducts;
			});
		}

		function getProduct(categoryGuid, productGuid) {
			var promise;
			if (!products[categoryGuid]) {
				promise = getProducts(categoryGuid);
			} else {
				promise = $q.when(products[categoryGuid]);
			}

			return promise.then(function(products) {
				return _.find(products, function(product) {
					return product.guid === productGuid;
				});
			});
		}

		function getFeaturedProduct(productGuid) {
			var product = _.find(featuredProducts, function(product) {
				return product.guid === productGuid;
			});
			return $q.when(product);
		}
	}
})();
