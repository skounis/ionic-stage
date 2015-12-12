(function() {
	'use strict';

	angular
		.module('catalogue.featured-products')
		.controller('FeaturedProductController', FeaturedProductController);

	FeaturedProductController.$inject = ['$stateParams', 'featuredProductsService'];

	/* @ngInject */
	function FeaturedProductController($stateParams, featuredProductsService) {
		var vm = angular.extend(this, {
			product: null
		});

		// ********************************************************************

		featuredProductsService.get($stateParams.id)
			.then(function(product) {
				console.log('Fetured product: ', product);
				vm.product = product;
			});
	}
})();
