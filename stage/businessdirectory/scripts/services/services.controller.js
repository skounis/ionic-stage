(function() {
	'use strict';

	angular
		.module('bizdir.services')
		.controller('ServicesController', ServicesController);

	ServicesController.$inject = ['$scope', '$state', 'servicesService'];

	/* @ngInject */
	function ServicesController($scope, $state, servicesService) {
		var businessId = $state.params.businessId;

		var vm = angular.extend(this, {
			services: [],
			showServiceDetails: showServiceDetails
		});

		(function activate() {
			loadServices();
		})();
		// ******************************************************

		function loadServices() {
			servicesService.getItems(businessId).then(function(data) {
				vm.services = data;
			});
		}

		function showServiceDetails(serviceId) {
			$state.go('app.service', {
				businessId: businessId,
				serviceId: serviceId
			});
		}
	}
})();