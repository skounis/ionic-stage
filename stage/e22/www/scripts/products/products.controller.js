(function() {
	'use strict';

	angular
		.module('catalogue.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$state', 'products', 'points', '_', '$ionicSlideBoxDelegate'];

	/* @ngInject */
	function ProductsController($state, products, points, _, $ionicSlideBoxDelegate) {
		var vm = angular.extend(this, {
			points: points,
			cache: products.slice(0),
			products: products,
			showProductDetails: showProductDetails,
			filterByPoints: filterByPoints
		});

		(function activate() {
		})();

		// ******************************************************

		function showProductDetails(productId) {
			$state.go('app.product', {
				productId: productId
			});
		}

		function filterByPoints(index){
			var selection = vm.points[index];
			var filtered = _.filter(vm.cache,function(element){
												return element.points == selection.value
											});

			vm.products.splice(0, vm.products.length);
			for(var i in filtered){
					vm.products.push(filtered[i]);
			}

			$ionicSlideBoxDelegate.update();

		}
	}
})();
