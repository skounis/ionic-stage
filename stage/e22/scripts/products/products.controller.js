(function() {
	'use strict';

	angular
		.module('catalogue.products')
		.filter('stripdecimals', function(){
			return function(input){
				return input.replace('.00', '');
			}
		})
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$state', 'products', 'points', '_', '$ionicSlideBoxDelegate'];

	/* @ngInject */
	function ProductsController($state, products, points, _, $ionicSlideBoxDelegate) {

		// _.map(points, function(element){
		// 	element.pointsFormated = element.points.replace('.00', '');
		// });

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

			// _.map(filtered, function(element){
			// 	element.pointsFormated = element.points.replace('.00', '');
			// });

			vm.products.splice(0, vm.products.length);
			for(var i in filtered){
					vm.products.push(filtered[i]);
			}

			$ionicSlideBoxDelegate.update();

		}
	}
})();
