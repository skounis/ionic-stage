(function() {
	'use strict';

	angular
		.module('restaurant.contact-us')
		.controller('ContactUsController', ContactUsController);

	ContactUsController.$inject = [
		'businessInfo', 'externalAppsService', '$cordovaEmailComposer', 'openHoursService'];

	/* @ngInject */
	function ContactUsController(businessInfo, externalAppsService, $cordovaEmailComposer, openHoursService) {

		var vm = angular.extend(this, {
			storeName: businessInfo.storeName,
			address: businessInfo.address,
			desc: businessInfo.desc,
			phoneNumber: businessInfo.phoneNumber,
			getDirections: getDirections,
			sendEmail: sendEmail,
			openFacebookPage: openFacebookPage,
			openInstagramPage: openInstagramPage,
			openTwitterPage: openTwitterPage,
			openPinterestPage: openPinterestPage,
			openHours: []
		});


		(function activate() {
			vm.openHours = openHoursService.getOpenHours();
		})();

		// **********************************************************************

		function getDirections() {
			externalAppsService.openMapsApp(businessInfo.officeLocation);
		}

		function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: businessInfo.email,
					subject: 'Cordova Icons',
					body: 'How are you? Nice greetings from Leipzig'
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openFacebookPage() {
			externalAppsService.openExternalUrl(businessInfo.facebookPage);
		}

		function openInstagramPage() {
			externalAppsService.openExternalUrl(businessInfo.instagramPage);
		}

		function openTwitterPage() {
			externalAppsService.openExternalUrl(businessInfo.twitterPage);
		}

		function openPinterestPage() {
			externalAppsService.openExternalUrl(businessInfo.pinterestPage);
		}
	}
})();
