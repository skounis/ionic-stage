(function() {
	'use strict';

	angular
		.module('catalogue.featured-products')
		.controller('FeaturedProductsController', FeaturedProductsController);

	FeaturedProductsController.$inject = ['$scope', '$state', 'featuredProductsService'];

	/* @ngInject */
	function FeaturedProductsController($scope, $state, featuredProductsService) {
		var vm = angular.extend(this, {
			products: [],
			navigate: navigate
		});

		(function activate() {
			loadproducts();
		})();
		// ********************************************************************

		function loadproducts() {
			featuredProductsService.all().then(function(data) {
				console.log('Fetured products: ', data);
				vm.products = data;
			});
		}

		function navigate(id) {
			$state.go('app.featured-product', { id: id });
		}
	}
})();
