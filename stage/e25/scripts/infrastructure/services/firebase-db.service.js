(function() {
	'use strict';

	angular
		.module('mystyle.infrastructure')
		.factory('firebaseDb', firebaseDb);

	firebaseDb.$inject = ['ENV'];

	/* @ngInject */
	function firebaseDb(ENV) {
		var db = new Firebase(ENV.firebaseUrl);
		return db;
	}
})();