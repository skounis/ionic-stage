(function() {
	'use strict';

	angular
		.module('catalogue.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state'];

	/* @ngInject */
	function HomeController($state) {
		var vm = angular.extend(this, {			
			showProducts: showProducts,
			showProductDetails: showProductDetails
		});

		(function activate() {
		})();

		// ******************************************************

		function showProductDetails(product) {
			$state.go('app.featured-product', {
				productId: product.guid
			});
		}

		function showProducts() {
			$state.go('app.products');
		}
	}
})();
