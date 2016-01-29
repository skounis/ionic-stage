(function() {
	'use strict';

	angular
		.module('restaurant.contact-us')
		.controller('ContactUsController', ContactUsController);

	ContactUsController.$inject = [
		'contactUsService', 'externalAppsService', '$cordovaEmailComposer', 'openHoursService'];

	/* @ngInject */
	function ContactUsController(contactUsService, externalAppsService, $cordovaEmailComposer, openHoursService) {
		var businessInfo;
		var vm = angular.extend(this, {
			storeName: '',
			address: '',
			desc: '',
			phoneNumber: '',
			getDirections: getDirections,
			sendEmail: sendEmail,
			openFacebookPage: openFacebookPage,
			openInstagramPage: openInstagramPage,
			openTwitterPage: openTwitterPage,
			openPinterestPage: openPinterestPage,
			openHours: openHoursService.getOpenHours()
		});

		(function activate() {
			loadBusinessInfo();
		})();

		// **********************************************************************

		function loadBusinessInfo() {
			contactUsService.getBusiness()
				.then(function(business) {
					businessInfo = business;
					vm.storeName = business.storeName;
					vm.address = business.address;
					vm.desc = business.desc;
					vm.phoneNumber = business.phoneNumber;
				});
		}

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
