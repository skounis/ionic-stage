(function() {
	'use strict';

	angular
		.module('bizdir.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = ['$stateParams', 'productsService', 'externalAppsService'];

	/* @ngInject */
	function ProductController($stateParams, productsService, externalAppsService) {
		var businessId = $stateParams.businessId;
		var productId = $stateParams.productId;
		
		var vm = angular.extend(this, {
			product: null,
			buy: buy
		});


		(function activate() {
			loadProduct();
		})();
		// **********************************************

		function loadProduct() {
			productsService.getItem(businessId, productId)
				.then(function(product) {
					vm.product = product;
				});
		}

		function buy() {
			externalAppsService.openExternalUrl(vm.product.url);
		}
	}
})();