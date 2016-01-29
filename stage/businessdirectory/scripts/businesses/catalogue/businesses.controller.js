(function() {
	'use strict';

	angular
		.module('bizdir.businesses')
		.controller('BusinessesController', BusinessesController);

	BusinessesController.$inject = ['$state', 'businessesService'];

	/* @ngInject */
	function BusinessesController($state, businessesService) {
		var vm = angular.extend(this, {
			businesses: [],
			navigate: navigate
		});

		(function activate() {
			getBusinesses();
		})();

		// ********************************************************************

		function getBusinesses() {
			businessesService.getBusinesses()
				.then(function(businesses) {
					vm.businesses = businesses;
				});
		}

		function navigate(businessId) {
			$state.go('app.business-details', { businessId: businessId });
		}
	}
})();