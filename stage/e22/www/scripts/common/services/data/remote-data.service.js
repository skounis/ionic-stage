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
		var shopsUrl = remoteUrlPrefix + 'getShops';
		var universUrl = remoteUrlPrefix + 'getUniversPosts';
		var featuredProductsUrl = remoteUrlPrefix + 'getFeaturedProducts';

		var featuredProducts;
		var products;
		var univers;

		var service = {
			getPoints: getPoints,
			getProducts: getProducts,
			getProduct: getProduct,
			getFeaturedProducts: getFeaturedProducts,
			getFeaturedProduct: getFeaturedProduct,
			getShops: getShops,
			getUnivers: getUnivers,
			getUniver: getUniver
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

		function getShops() {
			return $http.get(shopsUrl).then(function(response) {
				var shops = [];
				_.each(response.data, function(shop) {
					shops.push({
						logo: ENV.apiEndpoint + shop["shop_logo"],
						category: shop["shop_type"],
						title: shop["shop_zone"],
						address: shop["shop_adress"],
						phone: shop["shop_tel"],
						cover: ENV.apiEndpoint + shop["shop_cover"],
						lat: shop["shop_lat"],
						long: shop["shop_long"]
					});
				});
				return shops;
			});
		}

		function getFeaturedProducts() {
			if (featuredProducts) {
				return $q.when(featuredProducts);
			}

			return $http.get(featuredProductsUrl).then(function(response) {
				featuredProducts = response.data;

				_.each(featuredProducts, function(product) {
					product.image = ENV.apiEndpoint + product.image;
				});

				return featuredProducts;
			});
		}

		function getFeaturedProduct(productId) {
			var promise;
			if (!featuredProducts) {
				promise = getFeaturedProducts();
			} else {
				promise = $q.when(featuredProducts);
			}

			return promise.then(function(products) {
				return _.find(products, function(product) {
					return product.id == productId;
				});
			});
		}

		function getUnivers() {
			if (univers) {
				return $q.when(univers);
			}
			return $http.get(universUrl).then(function(response) {
				univers = response.data;
				return univers;
			});
		}

		function getUniver(univerId) {
			var promise;
			if (!univers) {
				promise = getUnivers();
			} else {
				promise = $q.when(univers);
			}

			return promise.then(function(univers) {
				return _.find(univers, function(univer) {
					return univer.id == univerId;
				});
			});
		}
	}
})();
