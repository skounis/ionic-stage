(function() {
	'use strict';

	angular
		.module('mystyle.empty')
		.controller('EmptyController', EmptyController);

	EmptyController.$inject = ['$stateParams'];

	/* @ngInject */
	function EmptyController($stateParams) {
		angular.extend(this, {
			title: $stateParams.title
		});
	}
})();