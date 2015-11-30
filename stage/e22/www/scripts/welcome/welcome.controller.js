(function() {
	'use strict';

	angular
		.module('catalogue.welcome')
		.controller('WelcomeController', WelcomeController);

	WelcomeController.$inject = ['$state'];

	/* @ngInject */
	function WelcomeController($state) {
		angular.extend(this, {
			next: next
		});

		// ******************************************************

		function next() {
			$state.go('login');
		}
	}
})();
