(function() {
	'use strict';

	angular
		.module('bizdir.contact-us')
		.factory('contactUsService', contactUsService);

	contactUsService.$inject = [];

	/* @ngInject */
	function contactUsService() {
		return {
			phoneNumber: '+306973216110',
			email: 'skounis@gmail.com',
			officeLocation: '37.7736854,-122.421034',
			facebookPage: 'https://www.facebook.com/ionicframework'
		};
	}
})();
