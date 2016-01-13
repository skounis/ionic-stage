(function() {
	'use strict';

	angular
		.module('catalogue.login')
		.factory('loginService', loginService);

	loginService.$inject = ['$q'];

	/* @ngInject */
	function loginService($q) {
		var validCode = '12345678';

		var service = {
			validate: validate
		};
		return service;

		// ********************************************************

		function validate(code) {
			 return $q.when(code === validCode);
		}
	}
})();