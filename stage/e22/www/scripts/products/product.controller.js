(function() {
	'use strict';

	angular
		.module('catalogue.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = [
		'$scope', '$stateParams', '$state', 'product', 'externalAppsService', 'favoritesService', 'ionicToast'];

	/* @ngInject */
	function ProductController($scope, $stateParams, $state, product, externalAppsService, favoritesService, ionicToast) {
		var categoryId = $stateParams.categoryId;

		var vm = angular.extend(this, {
			product: product,
			buy: buy,
			openPdf: openPdf,
			isInFavorites: favoritesService.isInFavorites(product.guid),
			showFavorites: showFavorites,
			toggleFavorites: toggleFavorites
		});


		(function activate() {
			 $scope.$on('$ionicView.enter', function() {
				if (vm.product) {
					vm.isInFavorites = favoritesService.isInFavorites(vm.product.guid)
				}
			});
		})();

		// **********************************************

		function showFavorites() {
			$state.go('app.favorites');
		}

		function buy() {
			externalAppsService.openExternalUrl(vm.product.url);
		}

		function openPdf() {
			externalAppsService.openPdf(vm.product.pdf);
		}

		function toggleFavorites() {
			if (vm.isInFavorites) {
				favoritesService.deleteItem(vm.product.guid);
				ionicToast.show('\'' + vm.product.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			} else {
				favoritesService.addItem({
					guid: vm.product.guid,
					categoryId: categoryId,
					thumb: vm.product.thumb,
					name: vm.product.title,
					description: vm.product.body
				});
				ionicToast.show('\'' + vm.product.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			}
			vm.isInFavorites = !vm.isInFavorites;
		}
	}
})();
