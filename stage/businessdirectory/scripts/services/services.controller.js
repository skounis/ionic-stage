(function() {
	'use strict';

	angular
		.module('bizdir.services')
		.controller('ServicesController', ServicesController);

	ServicesController.$inject = ['$scope', '$state', 'servicesService'];

	/* @ngInject */
	function ServicesController($scope, $state, servicesService) {
		var url = $state.params.url;

		var vm = angular.extend(this, {
			services: [],
			showServiceDetails: showServiceDetails
		});

		(function activate() {
			loadServices();
		})();
		// ******************************************************

		function loadServices() {
			servicesService.getItems(url).then(function(data) {
				vm.services = data;
			});
		}

		function showServiceDetails(serviceId) {
			$state.go('app.service', {
				url: url,
				serviceId: serviceId
			});
		}
	}
})();