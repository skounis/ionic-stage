(function() {
	'use strict';

	angular
		.module('bizdir.services')
		.controller('ServiceController', ServiceController);

	ServiceController.$inject = ['$scope', '$stateParams', 'servicesService', 'externalAppsService'];

	/* @ngInject */
	function ServiceController($scope, $stateParams, servicesService, externalAppsService) {
		var url = $stateParams.url;
		var serviceId = parseInt($stateParams.serviceId);

		var vm = angular.extend(this, {
			service: null,
			readMore: readMore
		});

		(function activate() {
			loadService();
		})();
		// **********************************************

		function loadService() {
			servicesService.getItem(url, serviceId).then(function(service) {
				vm.service = service;
			});
		}

		function readMore() {
			externalAppsService.openExternalUrl(vm.service.url);
		}
	}
})();