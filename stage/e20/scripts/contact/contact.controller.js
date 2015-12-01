(function() {
	'use strict';

	angular
		.module('localbiz.contact')
		.controller('ContactController', ContactController);

	ContactController.$inject = ['contactService'];

	/* @ngInject */
	function ContactController(contactService) {
		var that = this;

		var recipent

		var vm = angular.extend(this, {
			fullname: null,
			message: null,
			send: send
		});

		function send(){
			console.log('Send message to :' + that.fullname + ', ' + that.message);

			var body = that.message + '\n\n' + that.fullname;

			contactService.sendEmail(body);
		}

	}
})();
