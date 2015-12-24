(function () {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('remoteDataService', remoteDataService);

	remoteDataService.$inject = ['$http', '$q', '_'];

	/* @ngInject */
	function remoteDataService($http, $q, _) {
		var categoriesUrl = 'http://skounis.s3.amazonaws.com/mobile-apps/catalogue-demo/categories.json';
		var featuredProductsUrl = 'http://skounis.s3.amazonaws.com/mobile-apps/catalogue-demo/featured.json';
		var businessUrl = 'http://skounis.s3.amazonaws.com/mobile-apps/catalogue/business.json';
		var categories = [];
		var featuredProducts;
		var products = {};

		var service = {
			getCategories: getCategories,
			getProducts: getProducts,
			getProduct: getProduct,
			getFeaturedCategories: getFeaturedCategories,
			getFeaturedProducts: getFeaturedProducts,
			getFeaturedProduct: getFeaturedProduct,
			getBusiness: getBusiness
		};

		return service;

		function getBusiness(){
			return $http.get(businessUrl).then(function(response) {
				var business = response.data.result;
				return business;
			});
		}

		function getCategories() {
			if (categories && categories.length > 0) {
				return $q.when(categories);
			}

			return $http.get(categoriesUrl).then(function(response) {
				categories = response.data.result;
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
				return products[categoryGuid];
			});
		}

		function getFeaturedProducts() {
			if (featuredProducts) {
				return $q.when(featuredProducts);
			}

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
