(function() {
	'use strict';

	angular
		.module('catalogue.shops')
		.controller('ShopsController', ShopsController);

	ShopsController.$inject = ['shops'];

	/* @ngInject */
	function ShopsController(shops) {
		var vm = angular.extend(this, {
			shops: shops
		});

		// *****************************************************
	}
})();