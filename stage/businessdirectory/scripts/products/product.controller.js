(function() {
	'use strict';

	angular
		.module('bizdir.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = ['$scope', '$stateParams', 'productsService', 'externalAppsService'];

	/* @ngInject */
	function ProductController($scope, $stateParams, productsService, externalAppsService) {
		var url = $stateParams.url;
		var productId = parseInt($stateParams.productId);
		
		var vm = angular.extend(this, {
			product: null,
			buy: buy
		});


		(function activate() {
			loadProduct();
		})();
		// **********************************************

		function loadProduct() {
			productsService.getItem(url, productId)
				.then(function(product) {
					url: url,
					vm.product = product;
				});
		}

		function buy() {
			externalAppsService.openExternalUrl(vm.product.url);
		}
	}
})();