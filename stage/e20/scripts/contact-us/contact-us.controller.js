(function() {
	'use strict';

	angular
		.module('localbiz.contact-us')
		.controller('ContactUsController', ContactUsController);

	ContactUsController.$inject = [
		'contactUsService', 'externalAppsService', '$cordovaEmailComposer', 'openHoursService'];

	/* @ngInject */
	function ContactUsController(contactUsService, externalAppsService, $cordovaEmailComposer, openHoursService) {
		var vm = angular.extend(this, {
			phoneNumber: contactUsService.phoneNumber,
			getDirections: getDirections,
			sendEmail: sendEmail,
			openFacebookPage: openFacebookPage,
			openHours: []
		});

		(function activate() {
			vm.openHours = openHoursService.getOpenHours();
		})();

		// **********************************************************************

		function getDirections() {
			externalAppsService.openMapsApp(contactUsService.officeLocation);
		}

		function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: contactUsService.email,
					subject: 'Cordova Icons',
					body: 'How are you? Nice greetings from Leipzig'
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openFacebookPage() {
			externalAppsService.openExternalUrl(contactUsService.facebookPage);
		}
	}
})();
