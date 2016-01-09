(function() {
	'use strict';

	angular
		.module('mystyle.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['chatsAuthService'];

	/* @ngInject */
	function MenuController(chatsAuthService) {

	}
})();