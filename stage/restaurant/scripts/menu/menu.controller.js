(function() {
	'use strict';

	angular
		.module('restaurant.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['categories'];

	/* @ngInject */
	function MenuController(categories) {
		var vm = angular.extend(this, {
			categories: categories
		});
	}
})();