(function() {
	'use strict';

	angular
		.module('catalogue.univers')
		.controller('UniverController', UniverController);

	UniverController.$inject = ['$stateParams', 'universService'];

	/* @ngInject */
	function UniverController($stateParams, universService) {
		var vm = angular.extend(this, {
			univer: null
		});

		// ********************************************************************

		var univerId = parseInt($stateParams.univerId);
		universService.get(univerId)
			.then(function(univer) {
				console.log('Univer: ', univer);
				vm.univer = univer;
			});
	}
})();
