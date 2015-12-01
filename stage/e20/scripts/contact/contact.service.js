(function() {
	'use strict';

	angular
		.module('localbiz.contact')
		.factory('contactService', contactService);

	contactService.$inject = ['$cordovaEmailComposer'];

	/* @ngInject */
	function contactService() {
		var recipient = "skounis@gmail.com";
		var subject   = "Local Business - Feedback"

		var service = {
			sendEmail: sendEmail
		};
		return service;

		// ************************************************

		function sendEmail(body) {

			// Check in the $cordovaEmailComposer object can be used.
			// When the application is runing in borwser or some simulators
			// an exception is thrown
			try {
				console.log($cordovaEmailComposer.isAvailable());
			} catch (e) {
					alert('No $cordovaEmailComposer availabe!. Email composer is not working in Browser and Simulators.')
					console.log('contact.service: sendEmail: body: \n' + body);
					return;
			} finally {

			}

			return $cordovaEmailComposer.isAvailable().then(function () {
				var email = {
					to: 					recipent,
					subject: 			subject,
					body: 				body,
					isHtml: true
				};

				$cordovaEmailComposer.open(email);
			}, function (er) {
				alert(er);
			});
		}

	}

})();
