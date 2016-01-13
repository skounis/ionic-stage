(function () {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('localDataService', localDataService);

	localDataService.$inject = ['$http', '$q', '_'];

	/* @ngInject */
	function localDataService($http, $q, _) {
		var urlPrefix = 'misc/';
		var productsUrl = urlPrefix + 'cat-a.json';
		var shopsUrl = urlPrefix + 'shops.json';
		var featuredProductsUrl = urlPrefix + 'featured.json';
		var featuredProducts = [];
		var products;

		var service = {
			getProducts: getProducts,
			getProduct: getProduct,
			getFeaturedProducts: getFeaturedProducts,
			getFeaturedProduct: getFeaturedProduct,
			getShops: getShops
		}
		return service;

		function getProducts() {
			return $http.get(productsUrl).then(function(response) {
				products = response.data.result;
				return products;
			});
		}

		function getShops() {
			return $http.get(shopsUrl).then(function(response) {
				return response.data.result;
			});
		}

		function getFeaturedProducts() {
			return $http.get(featuredProductsUrl).then(function(response) {
				featuredProducts = response.data.result;
				return featuredProducts;
			});
		}

		function getProduct(productGuid) {
			var promise;
			if (!products) {
				promise = getProducts();
			} else {
				promise = $q.when(products);
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
