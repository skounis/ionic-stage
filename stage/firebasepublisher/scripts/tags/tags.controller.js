(function() {
	'use strict';

	angular
		.module('firebase-starter.tags')
		.controller('TagsController', TagsController);

	TagsController.$inject = ['listsService'];

	/* @ngInject */
	function TagsController(listsService) {
		var vm = angular.extend(this, {
			items: listsService.getTags()
		});

		(function activate() {
		})();

		// ********************************************************************
	}
})();