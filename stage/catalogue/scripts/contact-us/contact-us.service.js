(function() {
	'use strict';

	angular
		.module('catalogue.contact-us')
		.factory('contactUsService', contactUsService);

	contactUsService.$inject = ['dataService'];

	/* @ngInject */
	function contactUsService(dataService) {

		var service ={
			getBusiness: dataService.getBusiness
		}
		return service;
	}
})();
