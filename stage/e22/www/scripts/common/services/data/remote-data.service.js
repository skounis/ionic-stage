(function () {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('remoteDataService', remoteDataService);

	remoteDataService.$inject = ['$http', '$q', '_', 'ENV'];

	/* @ngInject */
	function remoteDataService($http, $q, _, ENV) {
		var remoteUrlPrefix = ENV.apiEndpoint + 'index.php?option=com_zinoapi&task=';
		var pointsUrl = remoteUrlPrefix + 'getPointsValues';
		var productsUrl = remoteUrlPrefix + 'getCatalogItems';

		var urlPrefix = 'misc/';
		var shopsUrl = urlPrefix + 'shops.json';
		var featuredProductsUrl = urlPrefix + 'featured.json';
		var featuredProducts = [];
		var products;

		var service = {
			getPoints: getPoints,
			getProducts: getProducts,
			getProduct: getProduct,
			getFeaturedProducts: getFeaturedProducts,
			getFeaturedProduct: getFeaturedProduct,
			getShops: getShops
		}
		return service;

		function getPoints() {
			return $http.get(pointsUrl).then(function(response) {
				return response.data;
			});
		}

		function getProducts() {
			return $http.get(productsUrl).then(function(response) {
				products = response.data;
				_.each(products, function(product) {
					product.image = ENV.apiEndpoint + product.image;
				});
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
