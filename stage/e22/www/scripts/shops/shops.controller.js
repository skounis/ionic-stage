(function() {
	'use strict';

	angular
		.module('catalogue.shops')
		.controller('ShopsController', ShopsController);

	ShopsController.$inject = ['shops', 'externalAppsService'];

	/* @ngInject */
	function ShopsController(shops, externalAppsService) {
		var vm = angular.extend(this, {
			shops: shops,
			getDirections: getDirections
		});

		// *****************************************************

		function getDirections(index){
			console.log('Get Direction for item: ', index, vm.shops[index]);
			var shop = vm.shops[index];

			var coords = {
				latitude: shop.shop_lat || 0,
				longitude: shop.shop_long || 0,
			}
			externalAppsService.openMapsApp(coords);
		}
	}
})();
