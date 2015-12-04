(function () {
	'use strict';

	angular
			.module('catalogue.common')
			.factory('remoteDataService', remoteDataService);

	remoteDataService.$inject = ['$http', '$q', '_'];

	/* @ngInject */
	function remoteDataService($http, $q, _) {
		var productsUrl = 'http://skounis-dev.s3.amazonaws.com/mobile-apps/catalogue/cat-a.json';
		var shopsUrl = 'http://skounis-dev.s3.amazonaws.com/mobile-apps/catalogue/shops.json';
		var featuredProductsUrl = 'http://skounis-dev.s3.amazonaws.com/mobile-apps/catalogue/featured.json';
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

		function getShops() {
			return $http.get(shopsUrl).then(function(response) {
				return response.data.result;
			});
		}

		function getProducts() {
			return $http.get(productsUrl).then(function(response) {
				products = response.data.result;
				return products;
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
