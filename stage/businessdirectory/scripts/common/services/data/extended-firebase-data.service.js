(function() {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('extendedFirebaseDataService', extendedFirebaseDataService);

	extendedFirebaseDataService.$inject = ['firebaseDataService', '$ionicLoading'];

	/* @ngInject */
	function extendedFirebaseDataService(firebaseDataService, $ionicLoading) {
		var counter = 0;

		var service = {
			getBusinesses: getBusinesses,
			getCatalogs: getCatalogs,
			getCommon: getCommon,
			getBusiness: getBusiness,
			getBusinessesByCategory: getBusinessesByCategory,
			getCategories: getCategories,
			getCatalog: getCatalog,
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

		// ***********************************************************

		function getArticles(businessId) {
			return execute(function() {
				return firebaseDataService.getArticles(businessId);
			});
		}

		function getArticle(businessId, articleId) {
			return execute(function() {
				return firebaseDataService.getArticle(businessId, articleId);
			});
		}

		function getServices(businessId) {
			return execute(function() {
				return firebaseDataService.getServices(businessId);
			});
		}

		function getService(businessId, serviceId) {
			return execute(function() {
				return firebaseDataService.getService(businessId, serviceId);
			});
		}

		function getProducts(businessId) {
			return execute(function() {
				return firebaseDataService.getProducts(businessId);
			});
		}

		function getProduct(businessId, productId) {
			return execute(function() {
				return firebaseDataService.getProduct(businessId, productId);
			});
		}

		function getBusinesses() {
			return execute(function() {
				return firebaseDataService.getBusinesses();
			});
		}

		function getBusinessesByCategory(category) {
			return execute(function() {
				return firebaseDataService.getBusinessesByCategory(category);
			});
		}

		function getBusiness(businessId) {
			return execute(function() {
				return firebaseDataService.getBusiness(businessId);
			});
		}

		function getCategories() {
			return execute(function() {
				return firebaseDataService.getCategories();
			});
		}

		function getCatalog(businessId, catalogId) {
			return execute(function() {
				return firebaseDataService.getCatalog(businessId, catalogId);
			});
		}

		function getCatalogs(businessId) {
			return execute(function() {
				return firebaseDataService.getCatalogs(businessId);
			});
		}

		function getReviews(businessId) {
			return execute(function() {
				return firebaseDataService.getReviews(businessId);
			});
		}

		function addReview(review) {
			return execute(function() {
				return firebaseDataService.addReview(review);
			});
		}

		function getCommon() {
			return execute(function() {
				return firebaseDataService.getCommon();
			});
		}

		function execute(handler) {
			showSpinner();
			return handler().then(function(data) {
				hideSpinner();
				return data;
			}, function() {
				hideSpinner();
			});
		}

		function showSpinner() {
			counter = counter + 1;
			$ionicLoading.show({});
		}

		function hideSpinner() {
			counter = counter - 1;
			if (counter === 0) {
				$ionicLoading.hide({});
			}
		}
	}
})();
