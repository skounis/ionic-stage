(function() {
	'use strict';

	angular
		.module('localbiz.services')
		.controller('ServicesController', ServicesController);

	ServicesController.$inject = ['$scope', '$state', 'servicesService'];

	/* @ngInject */
	function ServicesController($scope, $state, servicesService) {
		var vm = angular.extend(this, {
			services: [],
			doRefresh: doRefresh,
			showServiceDetails: showServiceDetails
		});

		(function activate() {
			loadServices();
		})();
		// ******************************************************

		function loadServices() {
			servicesService.all(function(data) {
				vm.services = data;
			});
		}

		function doRefresh() {
			setTimeout($scope.$broadcast('scroll.refreshComplete'), 16000);
		}

		function showServiceDetails(serviceId) {
			$state.go('app.service', {
				serviceId: serviceId
			});
		}
	}
})();