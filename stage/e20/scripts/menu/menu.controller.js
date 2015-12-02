(function() {
	'use strict';

	angular
		.module('localbiz.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['externalAppsService'];

	/* @ngInject */
	function MenuController(externalAppsService) {

		var vm = angular.extend(this, {
			go: go
		});

		function go(target) {
			externalAppsService.openExternalUrl(target);
		}


	}
})();
