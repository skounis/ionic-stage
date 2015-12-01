(function() {
	'use strict';

	angular
		.module('localbiz.services')
		.controller('ServiceController', ServiceController);

	ServiceController.$inject = ['$scope', '$stateParams', 'servicesService', 'externalAppsService'];

	/* @ngInject */
	function ServiceController($scope, $stateParams, servicesService, externalAppsService) {
		var vm = angular.extend(this, {
			service: null,
			readMore: readMore
		});

		(function activate() {
			loadService();
		})();
		// **********************************************

		function loadService() {
			var serviceId = parseInt($stateParams.serviceId);

			servicesService.get(serviceId).then(function(service) {
				vm.service = service;
			});
		}

		function readMore() {
			externalAppsService.openExternalUrl(vm.service.url);
		}
	}
})();