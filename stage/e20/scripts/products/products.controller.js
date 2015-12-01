(function() {
	'use strict';

	angular
		.module('localbiz.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', '$state', 'productsService'];

	/* @ngInject */
	function ProductsController($scope, $state, productsService) {
		var vm = angular.extend(this, {
			products: [],
			doRefresh: doRefresh,
			showProductDetails: showProductDetails
		});

		// ******************************************************

		productsService.all(function(data) {
			vm.products = data;
		});

		function doRefresh() {
			setTimeout($scope.$broadcast('scroll.refreshComplete'), 16000);
		}

		function showProductDetails(productId) {
			$state.go('app.product', {
				productId: productId
			});
		}
	}
})();